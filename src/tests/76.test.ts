import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import astTraverse, { nodeToIdentifierName, nodeToLiteralNumber, nodeToLiteralString } from "./utils/acorn-utils";
import testOutput from "./utils/test-output";
import getFunctionCalls from "./utils/get-function-calls";
import { Expression, Identifier, MemberExpression, Node, ObjectExpression, Property, SpreadElement } from "acorn";
import getVariableAssignments from "./utils/get-variable-assignments";
import getVariableDeclarations from "./utils/get-variable-declarations";

describe('76', function() {
  const data = getStudentfileInfo();

  test('Deklarera en variabel med namnet `movies`', () => {
    const declarations = getVariableDeclarations(data.ast);
    const variables = declarations.get('movies');
    if(!variables || variables.length !== 1)
      throw new Error('Du måste deklarera en variabel med namnet `movies`.');
  });
  
  test('Tilldela en array som värde till `movies`', () => {
    const assignments = getVariableAssignments(data.ast, true);
    const variables = assignments.get('movies');
    if(!variables || variables.length < 1)
      throw new Error('Du måste deklarera en variabel med namnet `movies`.');
    if(variables.length > 1)
      throw new Error('Du måste ska endast tilldela ett värde till `movies`.');
    if(variables[0].right.type !== 'ArrayExpression')
      throw new Error('Du måste tilldela `movies` en array som värde.');
  });

  test('Arrayn innehåller 3 värden', () => {
    const assignments = getVariableAssignments(data.ast, true);
    const variables = assignments.get('movies');
    if(!variables || variables.length < 1)
      throw new Error('Du måste deklarera en variabel med namnet `movies`.');
    if(variables.length > 1)
      throw new Error('Du måste ska endast tilldela ett värde till `movies`.');
    if(variables[0].right.type !== 'ArrayExpression')
      throw new Error('Du måste tilldela `movies` en array som värde.');

    const arr = variables[0].right.elements;
    if(arr.length !== 3)
      throw new Error('Arrayn skall innehålla 3 värden.\nDin array innehåller ' + arr.length + ' värden.');
  });

  test('Första värdet i arrayn har korrekta egenskaper', () => {
    const assignments = getVariableAssignments(data.ast, true);
    const variables = assignments.get('movies');
    if(!variables || variables.length < 1)
      throw new Error('Du måste deklarera en variabel med namnet `movies`.');
    if(variables.length > 1)
      throw new Error('Du måste ska endast tilldela ett värde till `movies`.');
    if(variables[0].right.type !== 'ArrayExpression')
      throw new Error('Du måste tilldela `movies` en array som värde.');

    const arr = variables[0].right.elements;
    if(arr[0]?.type !== 'ObjectExpression')
      throw new Error('Det första värdet i din array är inte ett objekt.');

    const title = getProp(arr[0], 'title');
    if(!title)
      throw new Error('Objektet måste ha egenskapen `title`.');
    const year = getProp(arr[0], 'year');
    if(!year)
      throw new Error('Objektet måste ha egenskapen `year`.');
    if(nodeToLiteralString(title.value) !== 'The Godfather')
      throw new Error('Egenskapen `title` ska ha värdet \'The Godfather\'.');
    if(nodeToLiteralNumber(year.value) !== 1972)
      throw new Error('Egenskapen `year` ska ha värdet 1972.');
  });

  test('Andra värdet i arrayn har korrekta egenskaper', () => {
    const assignments = getVariableAssignments(data.ast, true);
    const variables = assignments.get('movies');
    if(!variables || variables.length < 1)
      throw new Error('Du måste deklarera en variabel med namnet `movies`.');
    if(variables.length > 1)
      throw new Error('Du måste ska endast tilldela ett värde till `movies`.');
    if(variables[0].right.type !== 'ArrayExpression')
      throw new Error('Du måste tilldela `movies` en array som värde.');

    const arr = variables[0].right.elements;
    if(arr[1]?.type !== 'ObjectExpression')
      throw new Error('Det andra värdet i din array är inte ett objekt.');

    const title = getProp(arr[1], 'title');
    if(!title)
      throw new Error('Objektet måste ha egenskapen `title`.');
    const year = getProp(arr[1], 'year');
    if(!year)
      throw new Error('Objektet måste ha egenskapen `year`.');
    if(nodeToLiteralString(title.value) !== 'Inception')
      throw new Error('Egenskapen `title` ska ha värdet \'Inception\'.');
    if(nodeToLiteralNumber(year.value) !== 2010)
      throw new Error('Egenskapen `year` ska ha värdet 2010.');
  });

  test('Tredje värdet i arrayn har korrekta egenskaper', () => {
    const assignments = getVariableAssignments(data.ast, true);
    const variables = assignments.get('movies');
    if(!variables || variables.length < 1)
      throw new Error('Du måste deklarera en variabel med namnet `movies`.');
    if(variables.length > 1)
      throw new Error('Du måste ska endast tilldela ett värde till `movies`.');
    if(variables[0].right.type !== 'ArrayExpression')
      throw new Error('Du måste tilldela `movies` en array som värde.');

    const arr = variables[0].right.elements;
    if(arr[2]?.type !== 'ObjectExpression')
      throw new Error('Det andra värdet i din array är inte ett objekt.');

    const title = getProp(arr[2], 'title');
    if(!title)
      throw new Error('Objektet måste ha egenskapen `title`.');
    const year = getProp(arr[2], 'year');
    if(!year)
      throw new Error('Objektet måste ha egenskapen `year`.');
    if(nodeToLiteralString(title.value) !== 'The Shawshank Redemption')
      throw new Error('Egenskapen `title` ska ha värdet\n\'The Shawshank Redemption\'.');
    if(nodeToLiteralNumber(year.value) !== 1994)
      throw new Error('Egenskapen `year` ska ha värdet 1994.');
  });
});

function getProp(obj: ObjectExpression, name: string) {
  for(let i = 0; i < obj.properties.length; i++) {
    if(obj.properties[i].type !== 'Property')
      continue;

    const prop = obj.properties[i] as Property;

    if(nodeToIdentifierName(prop.key) !== name)
      continue;

    return prop;
  }
  return undefined;
}

function getObjectPropertyPath(obj: MemberExpression|Identifier): string|null|undefined {
  if(obj.type === 'Identifier')
    return nodeToIdentifierName(obj);
  
  return (
    getObjectPropertyPath(obj.object as MemberExpression|Identifier) + 
    '.' +
    getObjectPropertyPath(obj.property as MemberExpression|Identifier)
  );
}
