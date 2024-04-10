import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getVariableDeclarations from "./utils/get-variable-declarations";
import {  nodeToLiteralString } from "./utils/acorn-utils";

describe('15', function() {
  const data = getStudentfileInfo();

  test('Deklarera en konstant variabel med namnet `color`', () => {
    const declarations = getVariableDeclarations(data.ast);
    const variables = declarations.get('color');
    if(!variables || variables.length !== 1)
      throw new Error('Du måste deklarera en variabel med namnet `color`.');
    if(variables[0].kind !== 'const')
      throw new Error('Du måste använda nyckelordet `const` då du\ndeklarerar variabeln.');
  });
  
  test('Tilldela korrekt värde till variabeln `color', () => {
    const declarations = getVariableDeclarations(data.ast).get('color');
    if(!declarations || declarations.length !== 1)
      throw new Error('Du måste deklarera en variabel med namnet `color`.');
    if(nodeToLiteralString(declarations[0].init) !== 'blue')
      throw new Error('Du måste tilldela värdet `\'blue\'` till variabeln.');
  });
});
