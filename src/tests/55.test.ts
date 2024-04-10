import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getFunctionDeclarations from "./utils/get-function-declarations";
import { nodeToIdentifierName, nodeToLiteralString } from "./utils/acorn-utils";
import getFunctionCalls from "./utils/get-function-calls";
import testOutput from "./utils/test-output";
import getReturnStatements from "./utils/get-return-statements";

describe('55', function() {
  const data = getStudentfileInfo();

  test('Deklarera en funktion med namnet `message`', () => {
    const declarations = getFunctionDeclarations(data.ast);
    
    if(declarations.size < 1)
      throw new Error('Du måste deklarera en funktion.');
    if(declarations.size > 1)
      throw new Error('Du skall endast deklarera en funktion.');
    
    const target = declarations.get('message');
    if(!target || target.length < 1) {
      const [key] = declarations.entries().next().value;
      throw new Error('Du måste deklarera en funktion med namnet `message`.\nDu har deklarerat en funktion med namnet `'+key+'`.');
    }

    if(target.length > 1)
      throw new Error('Du skall endast deklarera en funktion med namnet `message`.');
  });

  test('Returnera rätt textsträng från funktionen `message`', () => {
    const declarations = getFunctionDeclarations(data.ast).get('message');
    if(!declarations || declarations.length < 1)
      throw new Error('Du måste deklarera funktionen `message`.');
    if(declarations.length > 1)
      throw new Error('Du skall endast deklarera en funktion med namnet `message`.');
    const declaration = declarations[0];
    const returns = getReturnStatements(declaration);
    if(returns.length !== 1)
      throw new Error('Du måste returnera en textsträng från funktionen `message`.');
    const ret = returns[0];
    if(nodeToLiteralString(ret.argument) !== 'Programmering är roligt!')
      throw new Error('Du måste returnera textsträngen\n`\'Programmering är roligt!\'` från `message`.');
  });
  
  test('Kalla på `console.log()`', () => {
    const allCalls = getFunctionCalls(data.ast).get('console.log');
    if(!allCalls || allCalls.length < 1)
      throw new Error('Du måste kalla på `console.log()` en gång.');
    if(allCalls.length > 1)
      throw new Error('Du skall endast kalla på `console.log()` en gång.');

    const declarations = getFunctionDeclarations(data.ast).get('message');
    if(declarations) {
      for(let i = 0; i < declarations.length; i++) {
        const calls = getFunctionCalls(declarations[i]).get('console.log');
        if(calls)
          throw new Error('Du skall inte kalla på `console.log()` i funktionen `message`.');
      }
    }
  });

  test('Kalla på `message()` som argument i `console.log()`', () => {
    const allCalls = getFunctionCalls(data.ast).get('console.log');
    if(!allCalls || allCalls.length < 1)
      throw new Error('Du måste kalla på `console.log()` en gång.');
    if(allCalls.length > 1)
      throw new Error('Du skall endast kalla på `console.log()` en gång.');
    const call = allCalls[0];
    if(call.arguments.length !== 1)
      throw new Error('Du måste använda ett argument då du kallar på `console.log()`.');
    const arg = call.arguments[0];
    if(arg.type !== 'CallExpression')
      throw new Error('Du måste kalla på `message()` som argument i `console.log()`.');
    if(nodeToIdentifierName(arg.callee) !== 'message')
      throw new Error('Du måste kalla på `message()` som argument i `console.log()`.');
  });

  testOutput({
    code: data.code,
    expected: 'Programmering är roligt!'
  });
});
