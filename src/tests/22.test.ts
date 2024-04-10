import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import astTraverse, { nodeToIdentifierName, nodeToLiteralString } from "./utils/acorn-utils";
import getFunctionCalls from "./utils/get-function-calls";
import testOutput from "./utils/test-output";
import getVariableAssignments from "./utils/get-variable-assignments";
import { getReadlineFunctionName } from "../utils/run-code";
import { generateRandomFirstName } from "../utils/random";

describe('22', function() {
  const data = getStudentfileInfo();
  const readlineFunctionName = getReadlineFunctionName(data.code);
  let targetVariableName = '';
  
  test('Kalla på `readline()` med argumentet `\'Vad heter du: \'`', () => {
    const calls = getFunctionCalls(data.ast).get(readlineFunctionName);
    if(!calls || calls.length !== 1)
      throw new Error('Du måste kalla på funktionen `readline()` en gång.');
    const call = calls[0];
    if(!call.arguments || nodeToLiteralString(call.arguments[0]) !== 'Vad heter du: ')
      throw new Error('Du måste använda textsträngen `\'Vad heter du: \'`\nsom argument då du kallar på `readline().\nObservera mellanslaget i slutet.');
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

  const name = generateRandomFirstName();
  testOutput({
    code: data.code,
    expected: 'Hej ' + name + '!',
    inputs: [{value: name}],
    ignoreReadlineOutput: true
  })
});
