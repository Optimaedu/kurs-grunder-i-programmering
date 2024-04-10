import vm from 'node:vm';
import sinon from 'sinon';

export type RunCodeResult = {
  code: string,
  output: string,
  outputWithoutReadline: string,
  readlineFunctionName: string,
  error?: {short: string, long: string},
  context: any
}

export type ReadlineInput = {
  matchPrompt?: string,
  value: string,
  hasBeenCalled?: boolean
}

const READLINE_REGEX_STR = `import\\s*(\\w*)\\s*from\\s*['"\`]read-console-input['"\`]`;

export function runCode(code: string, file: string, inputs: ReadlineInput[] = []): RunCodeResult {

  // 1. Init result

  const result: RunCodeResult = {
    code,
    output: '',
    outputWithoutReadline: '',
    readlineFunctionName: getReadlineFunctionName(code),
    context: null
  };

  // 2. Remove import line (because the vm is not set up to allow imports)

  const regex = new RegExp(READLINE_REGEX_STR, 'g');
  code = code.replace(regex, '');

  // 3. Create context

  let consoleLogCallCount = 0;
  let outputWithoutReadlineCallCount = 0;

  result.context = vm.createContext({
    // readline function
    [result.readlineFunctionName]: (message: string = '') => {
      let index = -1;
      for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].hasBeenCalled)
          continue;
        if(inputs[i].matchPrompt === message) {
          index = i;
          break;
        }
        if(!inputs[i].matchPrompt && index < 0) {
          index = i;
        }
      }
      consoleLogCallCount++;
      if(consoleLogCallCount > 1) result.output += '\n';
      result.output += message || '';
      if(index < 0)
        return '';
      inputs[index].hasBeenCalled = true;
      result.output += inputs[index].value;
      return inputs[index].value;
    },
    // console.log
    console: { 
      log: (...messages: string[]) => {
        consoleLogCallCount++;
        outputWithoutReadlineCallCount++;

        if(consoleLogCallCount > 1) result.output += '\n';
        if(outputWithoutReadlineCallCount > 1) result.outputWithoutReadline += '\n';
        
        messages.forEach((message, i) => {
          const str = (i > 0 ? '\t' : '') + (typeof message === 'object' ? JSON.stringify(message, undefined, 2) : message);
          result.output += str;
          result.outputWithoutReadline += str;
        });
      }
    }
  });
  
  // 4. Spy on function calls, do this to be able to
  //    check function call count in tests.

  sinon.spy(result.context.console, 'log');
  sinon.spy(result.context, result.readlineFunctionName);

  // 5. Run code

  try {
    vm.runInContext(code, result.context, {displayErrors: true, filename: file, timeout: 1000});
  }
  catch(err: any) {
    result.error = {
      short: err.toString().trim(),
      long: nicifyErrorMessage(err, file).trim()
    }
  }

  // 6. Finally return
  
  return result;
}

function nicifyErrorMessage(err: any, file: string) {

  // 1. Imports are usually okay, hoever, this course
  //    allows import of only one specific package.
  
  if(err.message && err.message.includes('Cannot use import statement outside a module')) {
    return 'I denna kurs kan du endast importera modulen `read-console-input`.\n';
  }

  // 2. Handle timeout message, occurs with infinite loops..

  if(err.message && err.message.startsWith('Script execution timed out after')) {
    return 'Skriptets utförande tog för lång tid.\nDetta kan hända om du har en loop som aldrig slutar.\n';
  }

  // 3. SyntaxErrors are displayed differently by the node vm,
  //    therefore we need to handle it separately.

  if(err.name && err.name === 'SyntaxError') {
    const splitted = err.stack.split('SyntaxError');
    let message = '';
    for(let i = 0; i < splitted.length - 1; i++) {
      message += (i > 0 ? 'SyntaxError' : '') + splitted[i];
    }
    message += err.toString() + '\n';
    return message;
  }

  // 4. Build an error message that does not contain the full stack trace.
  //    The node vm's error stack trace contains information that is not 
  //    useful for the students of this course.

  const regexSafeFileName = file.replace(/\\/g, '\\\\').replace(/\./g, '\\.');
  const regex = new RegExp('at ' + regexSafeFileName + '.*\n');
  const match = regex.exec(err.stack + '')!;
  
  if(match && match.index) {
    return err.stack.substring(0, match.index) + match[0];
  }

  // 5. For all other, just return the default error message.

  return err + '';
}

function removeCommentBlocks(code: string) {
  const blockCommentRegex = /\/\*([\s\S]|\n)*?\*\//gm;
  let blockCommentExec: RegExpExecArray|null = null;
  let i = 0;
  let result = '';
  while ((blockCommentExec = blockCommentRegex.exec(code)) !== null) {
    result += code.substring(i, blockCommentExec.index);
    i = blockCommentExec.index + blockCommentExec[0].length;
  }
  result += code.substring(i, code.length);
  return result;
}

export function getReadlineFunctionName(code: string) {
  code = removeCommentBlocks(code);
  let readlineExec: RegExpExecArray|null = null;
  const regex = new RegExp(READLINE_REGEX_STR, 'g');
  if ((readlineExec = regex.exec(code)) !== null) {
    return readlineExec[1];
  }
  return '__UNDEFINED_READLINE_' + (100 + Math.round(899 * Math.random()));
}
