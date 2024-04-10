import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getVariableDeclarations from "./utils/get-variable-declarations";
import {  nodeToBinaryExpression, nodeToIdentifierName, nodeToLiteralNumber, nodeToLiteralString } from "./utils/acorn-utils";
import getFunctionCalls from "./utils/get-function-calls";

describe('16', function() {
  const data = getStudentfileInfo();

  test('Deklarera variabeln `x` enligt uppgiftsbeskrivningen', () => {
    const declarations = getVariableDeclarations(data.ast).get('x');
    if(!declarations || declarations.length !== 1)
      throw new Error('Du måste deklarera en variabel med namnet `x`.');
    const declaration = declarations[0];
    if(declaration.kind !== 'const')
      throw new Error('Du måste använda nyckelordet `const` då du\ndeklarerar variabeln.');
    if(nodeToLiteralNumber(declaration.init) !== 14)
      throw new Error('Du måste tilldela talet `14` till variabeln.');
  });

  test('Deklarera variabeln `y` enligt uppgiftsbeskrivningen', () => {
    const declarations = getVariableDeclarations(data.ast).get('y');
    if(!declarations || declarations.length !== 1)
      throw new Error('Du måste deklarera en variabel med namnet `y`.');
    const declaration = declarations[0];
    if(declaration.kind !== 'const')
      throw new Error('Du måste använda nyckelordet `const` då du\ndeklarerar variabeln.');
    if(nodeToLiteralNumber(declaration.init) !== 6)
      throw new Error('Du måste tilldela talet `6` till variabeln.');
  });

  test('Deklarera variabeln `sum` enligt uppgiftsbeskrivningen', () => {
    const declarations = getVariableDeclarations(data.ast).get('sum');
    if(!declarations || declarations.length !== 1)
      throw new Error('Du måste deklarera en variabel med namnet `sum`.');
    const declaration = declarations[0];
    if(declaration.kind !== 'const')
      throw new Error('Du måste använda nyckelordet `const` då du\ndeklarerar variabeln.');
    const expression = nodeToBinaryExpression(declaration.init);
    const msg = 'Du måste använda ett additionsuttryck där du adderar\nvariablerna `x` och `y` då du deklarerar variabeln.';
    if(!expression || expression.operator !== '+')
      throw new Error(msg);
    
    const left = nodeToIdentifierName(expression.left);
    const right = nodeToIdentifierName(expression.right);

    if(left === 'x' && right !== 'y')
      throw new Error(msg);
    if(left === 'y' && right !== 'x')
      throw new Error(msg);
    if(right === 'x' && left !== 'y')
      throw new Error(msg);
    if(right === 'y' && left !== 'x')
      throw new Error(msg);
  });

  test('Använd variabeln `sum` som argument i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    if(calls.length > 1)
      throw new Error('Du skall endast kalla på `console.log()` en gång.');
    const call = calls[0];
    if(nodeToIdentifierName(call.arguments[0]) !== 'sum')
      throw new Error('Du måste använda variabeln `sum` som argument\ndå du kallar på funktionen `console.log()`.');
  });
});
