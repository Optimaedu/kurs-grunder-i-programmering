import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getVariableDeclarations from "./utils/get-variable-declarations";
import astTraverse, { nodeToIdentifierName, nodeToLiteralString } from "./utils/acorn-utils";
import getVariableAssignments from "./utils/get-variable-assignments";
import getFunctionCalls from "./utils/get-function-calls";
import testOutput from "./utils/test-output";

describe('17', function() {
  const data = getStudentfileInfo();

  test('Deklarera en variabel med namnet `name`', () => {
    const declarations = getVariableDeclarations(data.ast).get('name');
    if(!declarations || declarations.length < 1)
      throw new Error('Du måste deklarera en variabel med namnet `name`.');
  });

  test('Tilldela värdet `\'Jane\'` till variabeln `name`', () => {
    const assignemnts = getVariableAssignments(data.ast, true).get('name');
    if(!assignemnts)
      throw new Error('Du måste tilldela textsträngen `\'Jane\'` till variabeln.');
    let found = false;
    for(let i = 0; i < assignemnts.length; i++) {
      if(nodeToLiteralString(assignemnts[i].right) === 'Jane') {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste tilldela textsträngen `\'Jane\'` till variabeln.');
  });

  test('Använd variabeln `name` som argument i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length !== 1)
      throw new Error('Du måste kalla på `console.log()` en gång.');
    const call = calls[0];
    let found = false;
    astTraverse(call.arguments, n => {
      const name = nodeToIdentifierName(n);
      if(name === 'name') {
        found = true;
      }
    });
    if(!found)
      throw new Error('Du måste använda variabeln `name` som argument\ndå du kallar på `console.log()`.');
  });

  testOutput({
    code: data.code,
    expected: 'Hej Jane!'
  });
});
