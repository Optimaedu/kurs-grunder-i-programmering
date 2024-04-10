import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getFunctionDeclarations from "./utils/get-function-declarations";
import getFunctionCalls from "./utils/get-function-calls";
import testOutput from "./utils/test-output";
import testFunctionCallExpressionCount from "./utils/test-function-call-expression-count";

describe('52', function() {
  const data = getStudentfileInfo();

  test('Deklarera en funktion med namnet `hello`', () => {
    const declarations = getFunctionDeclarations(data.ast);
    
    if(declarations.size < 1)
      throw new Error('Du måste deklarera en funktion.');
    if(declarations.size > 1)
      throw new Error('Du skall endast deklarera en funktion.');
    
    const target = declarations.get('hello');
    if(!target || target.length < 1) {
      const [key] = declarations.entries().next().value;
      throw new Error('Du måste deklarera en funktion med namnet `hello`.\nDu har deklarerat en funktion med namnet `'+key+'`.');
    }

    if(target.length > 1)
      throw new Error('Du skall endast deklarera en funktion med namnet `hello`.');
  });

  test('Kalla på `console.log()` i funktionen `hello`', () => {
    const declarations = getFunctionDeclarations(data.ast).get('hello');
    
    if(!declarations || declarations.length < 1) 
      throw new Error('Du måste deklarera en funktion med namnet `hello`.');
    if(declarations.length > 1)
      throw new Error('Du skall endast deklarera en funktion med namnet `hello`.');

    const declaration = declarations[0];
    const calls = getFunctionCalls(declaration.body).get('console.log');

    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()` i funktionen `hello`.');
    if(calls.length > 1)
      throw new Error('Du skall endast kalla på `console.log()` en gång.');
  });
  
  testFunctionCallExpressionCount({
    ast: data.ast,
    min: 3, max: 3,
    callee: 'hello',
    title: 'Kalla på funktionen `hello()` 3 gånger'
  });

  testOutput({
    code: data.code,
    expected: 'Hej världen!\nHej världen!\nHej världen!',
    ignoreReadlineOutput: true
  });
  
});
