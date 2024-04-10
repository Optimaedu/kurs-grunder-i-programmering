import chalk from "chalk";
import { diffChars } from "diff";
import { ReadlineInput, runCode } from "../../utils/run-code";
import { test } from "mocha";

type TestOutputOptions = {
  title?: string,
  code: string,
  inputs?: ReadlineInput[],
  expected: string,
  ignoreReadlineOutput?: boolean,
  hint?: string
}

export default function testOutput(options: TestOutputOptions) {
  test(options.title||'Skriver ut rätt output', () => {
    const result = runCode(options.code, '', options.inputs);
    if(result.error) {
      throw new Error(result.error.short);
    }

    const output = options.ignoreReadlineOutput
      ? result.outputWithoutReadline
      : result.output;

    if(output !== options.expected) {
      const diff = diffChars(output, options.expected);
      
      let stylizedExpected = '';
      let stylizedOutput = '';
      
      for(let i = 0; i < diff.length; i++) {
        if(!diff[i].added && !diff[i].removed) {
          stylizedExpected += chalk.white(diff[i].value);
          stylizedOutput += chalk.white(diff[i].value);
        }
        else if(diff[i].added && diff[i].value === '\n')
          stylizedExpected += ' ' + chalk.yellow('↲\n');
        else if(diff[i].added)
          stylizedExpected += chalk.bold.bgYellow.black(diff[i].value);
        else if(diff[i].removed && diff[i].value === '\n')
          stylizedOutput += chalk.red('\n\x1b[2D↱') + ' ';
        else if(diff[i].removed)
          stylizedOutput += chalk.bold.bgRed.white(diff[i].value);
      }
      
      const inputs = options.inputs?.map(v => v.value).join(', ');

      throw new Error(
        (inputs ? chalk.yellow('Input: ' + inputs) + '\n' : '') +
        chalk.bold(`Förväntad output:\n`) + 
        chalk.white(indent(stylizedExpected)) +
        chalk.bold(`\nDin output:\n`) + 
        chalk.white(indent(stylizedOutput)) + 
        (options.hint ? '\n' + chalk.italic.magenta(options.hint) : '')
      )
    }
  });
}

function indent(output: string) {
  return '  ' + output.split(/\n/g).join('\n  ');
}
