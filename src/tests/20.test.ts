import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import astTraverse, { nodeToIdentifierName, nodeToLiteralString } from "./utils/acorn-utils";
import getFunctionCalls from "./utils/get-function-calls";
import testOutput from "./utils/test-output";
import getVariableDeclarations from "./utils/get-variable-declarations";
import getVariableAssignments from "./utils/get-variable-assignments";

describe('20', function() {
  const data = getStudentfileInfo();
  
  test('Deklarera en variabel med namnet `message`', () => {
    const declarations = getVariableDeclarations(data.ast).get('message');
    if(!declarations || declarations.length !== 1)
      throw new Error('Du måste deklarera en variabel med namnet `message`.');
  });

  test('Tilldela strängen `\'Hej världen!\'` till `message`', () => {
    const assignments = getVariableAssignments(data.ast, true).get('message');
    if(!assignments || assignments.length < 1)
      throw new Error('Du måste tilldela textsträngen `\'Hej världen!\'`\ntill variabeln.');
    let found = false;
    for(let i = 0; i < assignments.length; i++) {
      if(nodeToLiteralString(assignments[i].right) === 'Hej världen!') {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste tilldela textsträngen `\'Hej världen!\'`\ntill variabeln.');
  });

  test('Tilldela strängen `\'Programmering är roligt!\'` till `message`', () => {
    const assignments = getVariableAssignments(data.ast, true).get('message');
    if(!assignments || assignments.length < 1)
      throw new Error('Du måste tilldela textsträngen `\'Programmering är roligt!\'`\ntill variabeln.');
    let found = false;
    for(let i = 0; i < assignments.length; i++) {
      if(nodeToLiteralString(assignments[i].right) === 'Programmering är roligt!') {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste tilldela textsträngen `\'Programmering är roligt!\'`\ntill variabeln.');
  });

  test('Använd `message` och kalla på `console.log()` 2 gånger', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length !== 2)
      throw new Error('Du måste kalla på `console.log()` 2 gånger.');
    let foundCount = 0;
    for(let i = 0; i < calls.length; i++) {
      if(nodeToIdentifierName(calls[i].arguments[0]) === 'message')
        foundCount++;
    }
    if(foundCount !== 2)
      throw new Error('Du måste använda variabeln `message` som argument\nbåda gångerna som du kallar på `console.log()`.');
  });

  testOutput({
    code: data.code,
    expected: 'Hej världen!\nProgrammering är roligt!'
  });
});
