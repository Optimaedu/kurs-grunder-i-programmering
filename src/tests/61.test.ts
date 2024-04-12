import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getVariableDeclarations from "./utils/get-variable-declarations";
import getVariableAssignments from "./utils/get-variable-assignments";
import { ArrayExpression } from "acorn";
import { nodeToLiteralNumber } from "./utils/acorn-utils";

describe('61', function() {
  const data = getStudentfileInfo();

  test('Deklarera en variabel', () => {
    const variables = getVariableDeclarations(data.ast);
    if(variables.size < 1)
      throw new Error('Du måste deklarera en variabel.');
    if(variables.size > 1)
      throw new Error('Du skall endast deklarera en variabel.');
  });

  test('Tilldela variabeln en array', () => {
    const assignments = getVariableAssignments(data.ast, true);
    if(!assignments || assignments.size < 1)
      throw new Error('Du måste tilldela ett värde till din variabel.');
    if(assignments.size > 1)
      throw new Error('Du skall endast tilldela ett värde till din variabel.');
    const first = assignments.keys().next().value;
    const assignment = assignments.get(first)!;
    if(assignment[0].right.type !== 'ArrayExpression')
      throw new Error('Du måste tilldela variabeln en array.');
  });

  test('Arrayn innehåller 5 tal', () => {
    const assignments = getVariableAssignments(data.ast, true);
    if(!assignments || assignments.size < 1)
      throw new Error('Du måste tilldela ett värde till din variabel.');
    if(assignments.size > 1)
      throw new Error('Du skall endast tilldela ett värde till din variabel.');
    const first = assignments.keys().next().value;
    const assignment = assignments.get(first)!;
    if(assignment[0].right.type !== 'ArrayExpression')
      throw new Error('Du måste tilldela variabeln en array.');
    const arr = assignment[0].right as ArrayExpression;
    if(arr.elements.length !== 5)
      throw new Error('Arrayn måste innehålla 5 element.');
    for(let i = 0; i < arr.elements.length; i++) {
      if(Number.isNaN(nodeToLiteralNumber(arr.elements[i])))
        throw new Error('Alla element i arrayn måste vara tal.');
    }
  });
});
