import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getVariableDeclarations from "./utils/get-variable-declarations";
import getVariableAssignments from "./utils/get-variable-assignments";
import { nodeToLiteralNumber } from "./utils/acorn-utils";

describe('12', function() {
  const data = getStudentfileInfo();

  test('Deklarera en variabel med namnet `year`', () => {
    const declarations = getVariableDeclarations(data.ast);
    const variables = declarations.get('year');
    if(!variables || variables.length !== 1)
      throw new Error('Du måste deklarera en variabel med namnet `year`.');
    const variable = variables[0];
    if(variable.kind !== 'let')
      throw new Error('Du skall använda nyckelordet `let` då du deklarerar variabeln.');
  });
  
  test('Tilldela talet `1917` till variabeln `year`', () => {
    const declarations = getVariableDeclarations(data.ast);
    const variables = declarations.get('year');
    if(!variables || variables.length !== 1)
      throw new Error('Du måste deklarera variabeln `year`.');
    const variable = variables[0];
    if(variable.init) 
      throw new Error('Du skall inte tilldela värdet på samma gång som du\ndeklarerar variabeln.');
    const assignments = getVariableAssignments(data.ast);
    const targets = assignments.get('year');
    if(!targets)
      throw new Error('Du måste tilldela talet `1917` till variabeln.');
    let found = false;
    for(let i = 0; i < targets.length; i++) {
      const target = targets[i];
      if(nodeToLiteralNumber(target.right) === 1917) {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste tilldela talet `1917` till variabeln.');
  });
});
