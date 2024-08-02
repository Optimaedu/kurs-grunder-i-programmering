import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { nodeToIdentifierName, nodeToLiteralString } from "./utils/acorn-utils";
import testOutput from "./utils/test-output";
import getFunctionCalls from "./utils/get-function-calls";
import getVariableDeclarations from "./utils/get-variable-declarations";

describe('68', function() {
  const data = getStudentfileInfo();

  test('Ändrar elementet \'?\' till \'y\'', () => {
    const declarations = getVariableDeclarations(data.ast).get('vowels');
    if(!declarations || declarations.length < 1)
      throw new Error('Du måste deklarera variabeln `vowels`.');
    if(declarations.length > 1)
      throw new Error('Du skall endast deklarera `vowels` en gång.');

    const declaration = declarations[0];
    if(!declaration.init || declaration.init.type !== 'ArrayExpression')
      throw new Error('Du skall inte ändra på den befintliga\ndeklarationen av `vowels`.');
    const elements = declaration.init.elements;
    const correct = 'aeiou?åäö';
    for(let i = 0; i < correct.length; i++) {
      if(nodeToLiteralString(elements[i]) !== correct.charAt(i))
        throw new Error('Du skall inte ändra på den befintliga\ndeklarationen av `vowels`.');
    }
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
      throw new Error('aDu skall använda array funktoinen `join()` när\ndu skriver ut arrayn i `console.log()`.');
    if(nodeToIdentifierName(argCall.callee.object) !== 'vowels')
      throw new Error('bDu skall använda array funktoinen `join()` när\ndu skriver ut arrayn i `console.log()`.');
    if(nodeToIdentifierName(argCall.callee.property) !== 'join')
      throw new Error('cDu skall använda array funktoinen `join()` när\ndu skriver ut arrayn i `console.log()`.');
  });

  testOutput({
    code: data.code,
    expected: 'a,e,i,o,u,y,å,ä,ö',
    ignoreReadlineOutput: true
  });
});
