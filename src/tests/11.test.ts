import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getVariableDeclarations from "./utils/get-variable-declarations";
import getVariableAssignments from "./utils/get-variable-assignments";

describe('11', function() {
  const data = getStudentfileInfo();

  test('Deklarera en variabel med namnet `x`', () => {
    const declarations = getVariableDeclarations(data.ast);
    const variables = declarations.get('x');
    if(!variables || variables.length !== 1)
      throw new Error('Du måste deklarera en variabel med namnet `x`.');
    const variable = variables[0];
    if(variable.kind !== 'let')
      throw new Error('Du skall använda nyckelordet `let` då du deklarerar variabeln.');
  });
  
  test('Tilldela inget värde åt variabeln `x`', () => {
    const assignments = getVariableAssignments(data.ast, true);
    const targets = assignments.get('x');
    if(targets)
      throw new Error('Du skall inte tilldela något värde åt variabeln.');
  });
});
