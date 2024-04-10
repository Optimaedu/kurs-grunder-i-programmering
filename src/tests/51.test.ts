import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getFunctionDeclarations from "./utils/get-function-declarations";

describe('51', function() {
  const data = getStudentfileInfo();

  test('Deklarera en funktion med namnet `dummy`', () => {
    const declarations = getFunctionDeclarations(data.ast);
    
    if(declarations.size < 1)
      throw new Error('Du måste deklarera en funktion.');
    if(declarations.size > 1)
      throw new Error('Du skall endast deklarera en funktion.');
    
    const target = declarations.get('dummy');
    if(!target || target.length < 1) {
      const [key] = declarations.entries().next().value;
      throw new Error('Du måste deklarera en funktion med namnet `dummy`.\nDu har deklarerat en funktion med namnet `'+key+'`.');
    }

    if(target.length > 1)
      throw new Error('Du skall endast deklarera en funktion med namnet `dummy`.');
  });
  
});
