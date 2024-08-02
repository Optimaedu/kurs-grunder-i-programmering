import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import astTraverse, { nodeToIdentifierName, nodeToLiteralNumber, nodeToLiteralString } from "./utils/acorn-utils";
import getVariableAssignments from "./utils/get-variable-assignments";
import testOutput from "./utils/test-output";
import getFunctionCalls from "./utils/get-function-calls";
import { MemberExpression, Node } from "acorn";

describe('72', function() {
  const data = getStudentfileInfo();

  test('Gör inga ändringar på variabeln `car`', () => {
    const assignments = getVariableAssignments(data.ast, true).get('car');
    if(!assignments || assignments.length < 1)
      throw new Error('Du måste deklarera en variabel med namnet car.');
    if(assignments.length > 1)
      throw new Error('Du skall endast deklarera en `car` variabel.');
    const assignment = assignments[0];
    if(assignment.right.type !== 'ObjectExpression')
      throw new Error('Du måste tilldela ett objekt till variabeln.');
    
    const make = assignment.right.properties.find(p => p.type === 'Property' && nodeToIdentifierName(p.key) === 'make');
    if(!make || make?.type !== 'Property')
      throw new Error('Objektet måste ha en egenskap med namnet `make`.');
    if(nodeToLiteralString(make.value) !== 'Nissan')
      throw new Error('Egenskapen `make` måste ha värdet \'Nissan\'.');
    
    const model = assignment.right.properties.find(p => p.type === 'Property' && nodeToIdentifierName(p.key) === 'model');
    if(!model || model?.type !== 'Property')
      throw new Error('Objektet måste ha en egenskap med namnet `model`.');
    if(nodeToLiteralString(model.value) !== 'Micra')
      throw new Error('Egenskapen `model` måste ha värdet \'Micra\'.');
    
    const year = assignment.right.properties.find(p => p.type === 'Property' && nodeToIdentifierName(p.key) === 'year');
    if(!year || year?.type !== 'Property')
      throw new Error('Objektet måste ha en egenskap med namnet `year`.');
    if(nodeToLiteralNumber(year.value) !== 2020)
      throw new Error('Egenskapen `year` måste ha värdet 2020.');
  });

  test('Använder objektets `make` egenskap i console.log', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls)
      throw new Error('Du måste kalla på `console.log()`.');

    let found = false;
    for(let i = 0; i < calls.length; i++) {
      if(hasObjectProperty(calls[i].arguments, 'car', 'make')) {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste använda objektets `make` egenskap i console.log.');
  });

  test('Använder objektets `model` egenskap i console.log', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls)
      throw new Error('Du måste kalla på `console.log()`.');

    let found = false;
    for(let i = 0; i < calls.length; i++) {
      if(hasObjectProperty(calls[i].arguments, 'car', 'model')) {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste använda objektets `model` egenskap i console.log.');
  });

  test('Använder objektets `year` egenskap i console.log', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls)
      throw new Error('Du måste kalla på `console.log()`.');

    let found = false;
    for(let i = 0; i < calls.length; i++) {
      if(hasObjectProperty(calls[i].arguments, 'car', 'year')) {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste använda objektets `year` egenskap i console.log.');
  });
  
  testOutput({
    code: data.code,
    expected: 'Märke: Nissan\nModell: Micra\nÅr: 2020',
  });
});

function hasObjectProperty(node: Node|Node[], objectName: string, propertyName: string) {
  let found = false;
  astTraverse(node, n => {
    if(found || n.type !== 'MemberExpression')
      return;

    const obj = n as MemberExpression;
    if(nodeToIdentifierName(obj.object) !== objectName)
      return;
    if(nodeToIdentifierName(obj.property) !== propertyName)
      return;

    found = true;
  });
  return found;
}
