import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getFunctionDeclarations from "./utils/get-function-declarations";

describe('53', function() {
  const data = getStudentfileInfo();

  test('Deklarera en funktion med namnet `calculate`', () => {
    const declarations = getFunctionDeclarations(data.ast);
    
    if(declarations.size < 1)
      throw new Error('Du måste deklarera en funktion.');
    if(declarations.size > 1)
      throw new Error('Du skall endast deklarera en funktion.');
    
    const target = declarations.get('calculate');
    if(!target || target.length < 1) {
      const [key] = declarations.entries().next().value;
      throw new Error('Du måste deklarera en funktion med namnet `calculate`.\nDu har deklarerat en funktion med namnet `'+key+'`.');
    }

    if(target.length > 1)
      throw new Error('Du skall endast deklarera en funktion med namnet `calculate`.');
  });
  
  test('Deklarera funktionen `calculate` med 3 parametrar', () => {
    const declarations = getFunctionDeclarations(data.ast);
    
    if(declarations.size < 1)
      throw new Error('Du måste deklarera en funktion.');
    if(declarations.size > 1)
      throw new Error('Du skall endast deklarera en funktion.');
    
    const target = declarations.get('calculate');
    if(!target || target.length < 1) {
      const [key] = declarations.entries().next().value;
      throw new Error('Du måste deklarera en funktion med namnet `calculate`.\nDu har deklarerat en funktion med namnet `'+key+'`.');
    }

    if(target.length > 1)
      throw new Error('Du skall endast deklarera en funktion med namnet `calculate`.');

    if(target[0].params.length !== 3)
      throw new Error('Funktionen skall ha 3 parametrar.\nDin funktion har ' + target[0].params.length + ' ' + (target[0].params.length === 1 ? 'parameter.' : 'parametrar.'));
  });
  
});
