import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { nodeToIdentifierName, nodeToLiteralString } from "./utils/acorn-utils";
import testOutput from "./utils/test-output";
import getFunctionCalls from "./utils/get-function-calls";
import getVariableDeclarations from "./utils/get-variable-declarations";

describe('69', function() {
  const data = getStudentfileInfo();

  test('Ändra inte på array deklarationen', () => {
    const errMessage = 'Du skall inte ändra på den befintliga\narray deklarationen.';
    const declarations = getVariableDeclarations(data.ast).get('vowels');
    if(!declarations || declarations.length < 1)
      throw new Error(errMessage);
    if(declarations.length > 1)
      throw new Error('Du får endast deklarera en `vowels` variabel.');

    if(declarations[0].init?.type !== 'ArrayExpression')
      throw new Error(errMessage);

    const elements = declarations[0].init.elements;
    const correct = 'aeiKouyåäö?';
    for(let i = 0; i < correct.length; i++) {
      if(nodeToLiteralString(elements[i]) !== correct.charAt(i))
        throw new Error(errMessage);
    }
  });

  test('Använder array funktionen `pop()`', () => {
    const calls = getFunctionCalls(data.ast).get('vowels.pop');
    if(!calls || calls.length < 1)
      throw new Error('Du måste använda array funktionen `pop()`\npå arrayn `vowels`.');
  });

  test('Använder array funktionen `splice()`', () => {
    const calls = getFunctionCalls(data.ast).get('vowels.splice');
    if(!calls || calls.length < 1)
      throw new Error('Du måste använda array funktionen `splice()`\npå arrayn `vowels` för att ta bort \'K\' elementet.');
  });

  test('Använder arrayn funktionen `join()` i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length !== 1)
      throw new Error('Du skall kalla på `console.log()` en gång.');
    const call = calls[0];
    if(call.arguments.length !== 1)
      throw new Error('Du skall kalla på `console.log() med\nett argument.');
    const argCall = call.arguments[0];
    if(argCall.type !== 'CallExpression')
      throw new Error('Du skall använda array funktoinen `join()` när\ndu skriver ut arrayn i `console.log()`.');
    if(argCall.callee.type !== 'MemberExpression')
      throw new Error('Du skall använda array funktoinen `join()` när\ndu skriver ut arrayn i `console.log()`.');
    if(nodeToIdentifierName(argCall.callee.object) !== 'vowels')
      throw new Error('Du skall använda array funktoinen `join()` när\ndu skriver ut arrayn i `console.log()`.');
    if(nodeToIdentifierName(argCall.callee.property) !== 'join')
      throw new Error('Du skall använda array funktoinen `join()` när\ndu skriver ut arrayn i `console.log()`.');
  });

  testOutput({
    code: data.code,
    expected: 'a,e,i,o,u,y,å,ä,ö',
    ignoreReadlineOutput: true
  });
});
