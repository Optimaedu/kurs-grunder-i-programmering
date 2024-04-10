import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import astTraverse, { nodeToIdentifierName } from "./utils/acorn-utils";
import getFunctionCalls from "./utils/get-function-calls";
import testOutput from "./utils/test-output";

describe('18', function() {
  const data = getStudentfileInfo();

  test('Använd variabeln `name` som argument i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const call = calls[i];
      astTraverse(call.arguments, n => {
        const name = nodeToIdentifierName(n);
        if(name === 'name') {
          found = true;
        }
      });
      if(found)
        break;
    }
    if(!found)
      throw new Error('Du måste använda variabeln `name` som argument\ndå du kallar på `console.log()`.');
  });

  test('Använd variabeln `age` som argument i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const call = calls[i];
      astTraverse(call.arguments, n => {
        const name = nodeToIdentifierName(n);
        if(name === 'age') {
          found = true;
        }
      });
      if(found)
        break;
    }
    if(!found)
      throw new Error('Du måste använda variabeln `age` som argument\ndå du kallar på `console.log()`.');
  });

  testOutput({
    code: data.code,
    expected: 'Hej Selma!\nDu är 67 år gammal.'
  });
});
