import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getVariableDeclarations from "./utils/get-variable-declarations";
import { nodeToLiteralNumber } from "./utils/acorn-utils";

describe('13', function() {
  const data = getStudentfileInfo();

  test('Deklarera en variabel med namnet `price`', () => {
    const declarations = getVariableDeclarations(data.ast);
    const variables = declarations.get('price');
    if(!variables || variables.length !== 1)
      throw new Error('Du måste deklarera en variabel med namnet `price`.');
    const variable = variables[0];
    if(variable.kind !== 'let')
      throw new Error('Du skall använda nyckelordet `let` då du deklarerar variabeln.');
  });
  
  test('Tilldela talet `9.87` till `price` då du deklarerar den', () => {
    const declarations = getVariableDeclarations(data.ast);
    const variables = declarations.get('price');
    if(!variables || variables.length !== 1)
      throw new Error('Du måste deklarera variabeln `price`.');
    const variable = variables[0];
    if(nodeToLiteralNumber(variable.init) !== 9.87) 
      throw new Error('Du måste tilldela talet `9.87` till variabeln\npå samma gång som du deklarerar den.');
  });
});
