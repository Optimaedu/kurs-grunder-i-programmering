import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { nodeToIdentifierName, nodeToLiteralNumber, nodeToLiteralString } from "./utils/acorn-utils";
import getVariableDeclarations from "./utils/get-variable-declarations";
import getVariableAssignments from "./utils/get-variable-assignments";

describe('71', function() {
  const data = getStudentfileInfo();

  test('Deklarera en variabel med namnet `car`', () => {
    const declarations = getVariableDeclarations(data.ast).get('car');
    if(!declarations || declarations.length < 1)
      throw new Error('Du måste deklarera en variabel med namnet car.');
    if(declarations.length > 1)
      throw new Error('Du skall endast deklarera en `car` variabel.');
  });
  
  test('Tilldela ett objekt till variabeln `car`', () => {
    const assignments = getVariableAssignments(data.ast, true).get('car');
    if(!assignments || assignments.length < 1)
      throw new Error('Du måste deklarera en variabel med namnet car.');
    if(assignments.length > 1)
      throw new Error('Du skall endast deklarera en `car` variabel.');
    const assignment = assignments[0];
    if(assignment.right.type !== 'ObjectExpression')
      throw new Error('Du måste tilldela ett objekt till variabeln.');
  });
  
  test('Objektet har egenskapen `make`', () => {
    const assignments = getVariableAssignments(data.ast, true).get('car');
    if(!assignments || assignments.length < 1)
      throw new Error('Du måste deklarera en variabel med namnet car.');
    if(assignments.length > 1)
      throw new Error('Du skall endast deklarera en `car` variabel.');
    const assignment = assignments[0];
    if(assignment.right.type !== 'ObjectExpression')
      throw new Error('Du måste tilldela ett objekt till variabeln.');
    const property = assignment.right.properties.find(p => p.type === 'Property' && nodeToIdentifierName(p.key) === 'make');
    if(!property || property?.type !== 'Property')
      throw new Error('Objektet måste ha en egenskap med namnet `make`.');
    if(nodeToLiteralString(property.value) !== 'Nissan')
      throw new Error('Egenskapen `make` måste ha värdet \'Nissan\'.');
  });
  
  test('Objektet har egenskapen `model`', () => {
    const assignments = getVariableAssignments(data.ast, true).get('car');
    if(!assignments || assignments.length < 1)
      throw new Error('Du måste deklarera en variabel med namnet car.');
    if(assignments.length > 1)
      throw new Error('Du skall endast deklarera en `car` variabel.');
    const assignment = assignments[0];
    if(assignment.right.type !== 'ObjectExpression')
      throw new Error('Du måste tilldela ett objekt till variabeln.');
    const property = assignment.right.properties.find(p => p.type === 'Property' && nodeToIdentifierName(p.key) === 'model');
    if(!property || property?.type !== 'Property')
      throw new Error('Objektet måste ha en egenskap med namnet `model`.');
    if(nodeToLiteralString(property.value) !== 'Micra')
      throw new Error('Egenskapen `model` måste ha värdet \'Micra\'.');
  });
  
  test('Objektet har egenskapen `year`', () => {
    const assignments = getVariableAssignments(data.ast, true).get('car');
    if(!assignments || assignments.length < 1)
      throw new Error('Du måste deklarera en variabel med namnet car.');
    if(assignments.length > 1)
      throw new Error('Du skall endast deklarera en `car` variabel.');
    const assignment = assignments[0];
    if(assignment.right.type !== 'ObjectExpression')
      throw new Error('Du måste tilldela ett objekt till variabeln.');
    const property = assignment.right.properties.find(p => p.type === 'Property' && nodeToIdentifierName(p.key) === 'year');
    if(!property || property?.type !== 'Property')
      throw new Error('Objektet måste ha en egenskap med namnet `year`.');
    if(nodeToLiteralNumber(property.value) !== 2020)
      throw new Error('Egenskapen `year` måste ha värdet 2020.');
  });
});
