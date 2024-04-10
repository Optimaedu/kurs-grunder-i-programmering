import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import astTraverse, { nodeToIdentifierName } from "./utils/acorn-utils";
import getFunctionCalls from "./utils/get-function-calls";
import testOutput from "./utils/test-output";
import getVariableAssignments from "./utils/get-variable-assignments";
import { getReadlineFunctionName } from "../utils/run-code";
import { generateRandomColor, generateRandomWord } from "../utils/random";

describe('21', function() {
  const data = getStudentfileInfo();
  const readlineFunctionName = getReadlineFunctionName(data.code);
  let targetVariableName = '';
  
  test('Kalla på funktionen `readline()` en gång', () => {
    const calls = getFunctionCalls(data.ast).get(readlineFunctionName);
    if(!calls || calls.length !== 1)
      throw new Error('Du måste kalla på funktionen `readline()` en gång.');
  });
  
  test('Tilldela värdet från `readline()` till en variabel', () => {
    const variables = getVariableAssignments(data.ast, true);
    let found = false;
    for(let [key, value] of variables) {
      for(let i = 0; i < value.length; i++) {
        const calls = getFunctionCalls(value[i].right).get(readlineFunctionName);
        if(calls && calls.length > 0) {
          found = true;
          targetVariableName = key;
          break;
        }
      }
      if(found)
        break;
    }
    if(!found)
      throw new Error('Du måste deklarera en variabel och tilldela värdet\nfrån `readline()` funktionen.');
  });

  test('Använd variabeln som argument i `console.log()`', () => {
    if(targetVariableName.length < 1)
      throw new Error('Du måste deklarera en variabel och tilldela värdet\nfrån `readline()` funktionen.');

    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const call = calls[i];
      astTraverse(call.arguments, n => {
        const name = nodeToIdentifierName(n);
        if(name === targetVariableName) {
          found = true;
        }
      });
      if(found)
        break;
    }
    if(!found)
      throw new Error('Du måste använda variabeln `'+targetVariableName+'` som argument\ndå du kallar på `console.log()`.');
  });

  const message = generateRandomColor() + ' ' + generateRandomWord();
  testOutput({
    code: data.code,
    expected: message,
    inputs: [{value: message}],
    ignoreReadlineOutput: true
  })
});
