import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getFunctionDeclarations from "./utils/get-function-declarations";
import { nodeToIdentifierName, nodeToLiteralString } from "./utils/acorn-utils";
import getFunctionCalls from "./utils/get-function-calls";
import testOutput from "./utils/test-output";

describe('54', function() {
  const data = getStudentfileInfo();

  test('Deklarera en funktion med namnet `greet`', () => {
    const declarations = getFunctionDeclarations(data.ast);
    
    if(declarations.size < 1)
      throw new Error('Du måste deklarera en funktion.');
    if(declarations.size > 1)
      throw new Error('Du skall endast deklarera en funktion.');
    
    const target = declarations.get('greet');
    if(!target || target.length < 1) {
      const [key] = declarations.entries().next().value;
      throw new Error('Du måste deklarera en funktion med namnet `greet`.\nDu har deklarerat en funktion med namnet `'+key+'`.');
    }

    if(target.length > 1)
      throw new Error('Du skall endast deklarera en funktion med namnet `greet`.');
  });
  
  test('Deklarera funktionen `greet` med parametern `name`', () => {
    const declarations = getFunctionDeclarations(data.ast);
    
    if(declarations.size < 1)
      throw new Error('Du måste deklarera en funktion.');
    if(declarations.size > 1)
      throw new Error('Du skall endast deklarera en funktion.');
    
    const target = declarations.get('greet');
    if(!target || target.length < 1) {
      const [key] = declarations.entries().next().value;
      throw new Error('Du måste deklarera en funktion med namnet `greet`.\nDu har deklarerat en funktion med namnet `'+key+'`.');
    }

    if(target.length > 1)
      throw new Error('Du skall endast deklarera en funktion med namnet `greet`.');
    if(target[0].params.length < 1)
      throw new Error('Funktionen skall ha en parameter.');
    if(target[0].params.length > 1)
      throw new Error('Funktionen skall endast ha en parameter.');

    if(nodeToIdentifierName(target[0].params[0]) !== 'name')
      throw new Error('Parametern måste heta `name`.');
  });
  
  test('Kalla på funktionen `greet` med argumentet `\'Anna\'`', () => {
    const calls = getFunctionCalls(data.ast).get('greet');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på funktionen `greet`.');
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const call = calls[i];
      if(nodeToLiteralString(call.arguments[0]) === 'Anna') {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste kalla på `greet` med argumentet `\'Anna\'`.');
  });
  
  test('Kalla på funktionen `greet` med argumentet `\'Josef\'`', () => {
    const calls = getFunctionCalls(data.ast).get('greet');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på funktionen `greet`.');
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const call = calls[i];
      if(nodeToLiteralString(call.arguments[0]) === 'Josef') {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste kalla på `greet` med argumentet `\'Josef\'`.');
  });
  
  test('Kalla på `console.log()` i funktionen `greet`', () => {
    const declarations = getFunctionDeclarations(data.ast).get('greet');
    if(!declarations || declarations.length < 1)
      throw new Error('Du måste deklarera funktionen `greet`.');
    if(declarations.length > 1)
      throw new Error('Du skall endast deklarera en funktion med namnet `greet`.');

    const allCalls = getFunctionCalls(data.ast).get('console.log');
    if(allCalls && allCalls.length > 1)
      throw new Error('Du skall endast kalla på `console.log() en gång.');

    const calls = getFunctionCalls(declarations[0].body).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()` i funktionen `greet`.');
  });

  testOutput({
    code: data.code,
    expected: 'Hej Anna!\nHej Josef!'
  });
});
