import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getVariableDeclarations from "./utils/get-variable-declarations";
import getVariableAssignments from "./utils/get-variable-assignments";
import getFunctionCalls from "./utils/get-function-calls";
import { nodeToIdentifierName } from "./utils/acorn-utils";

describe('14', function() {
  const data = getStudentfileInfo();

  test('Deklarera en variabel med namnet `message`', () => {
    const declarations = getVariableDeclarations(data.ast);
    const variables = declarations.get('message');
    if(!variables || variables.length !== 1)
      throw new Error('Du måste deklarera en variabel med namnet `message`.');
  });
  
  test('Tilldela korrekt värde till variabeln `message`', () => {
    const assignments = getVariableAssignments(data.ast, true);
    const targets = assignments.get('message');
    if(!targets)
      throw new Error('Du måste tilldela följande värde till `message`:\n\'Programmering är roligt!\'');
  });

  test('Använd variabeln `message` som argument i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    if(calls.length > 1)
      throw new Error('Du skall endast kalla på `console.log()` en gång.');
    const call = calls[0];
    if(nodeToIdentifierName(call.arguments[0]) !== 'message')
      throw new Error('Du måste använda variabeln `message` som argument\ndå du kallar på funktionen `console.log()`.');
  });
});
