import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import astTraverse, { nodeToIdentifierName, nodeToLiteralNumber, nodeToLiteralString } from "./utils/acorn-utils";
import testOutput from "./utils/test-output";
import getFunctionCalls from "./utils/get-function-calls";
import { Expression, Identifier, MemberExpression, ObjectExpression, Property, SpreadElement } from "acorn";
import getVariableAssignments from "./utils/get-variable-assignments";

describe('75', function() {
  const data = getStudentfileInfo();

  test('Gör inga ändringar på variabeln `person`', () => {
    const assignments = getVariableAssignments(data.ast, true).get('person');
    if(!assignments || assignments.length < 1)
      throw new Error('Du har ändrat på variabeln `person`.');
    if(assignments.length > 1)
      throw new Error('Du har ändrat på variabeln `person`.');

    const obj = assignments[0].right;
    if(obj.type !== 'ObjectExpression')
      throw new Error('Du har ändrat på variabeln `person`.');

    const name = getProp(obj, 'name');
    if(!name || nodeToLiteralString(name.value) !== 'John Doe')
      throw new Error('Du har ändrat på variabeln `person`.');
    
    const age = getProp(obj, 'age');
    if(!age || nodeToLiteralNumber(age.value) !== 72)
      throw new Error('Du har ändrat på variabeln `person`.');

    const address = getProp(obj, 'address');
    if(!address || address.value.type !== 'ObjectExpression')
      throw new Error('Du har ändrat på variabeln `person`.');

    const street = getProp(address.value, 'street');
    if(!street || nodeToLiteralString(street.value) !== 'Fantasiagatan 123')
      throw new Error('Du har ändrat på variabeln `person`.');
    
    const city = getProp(address.value, 'city');
    if(!city || nodeToLiteralString(city.value) !== 'Helsingfors')
      throw new Error('Du har ändrat på variabeln `person`.');
    
    const zip = getProp(address.value, 'zip');
    if(!zip || nodeToLiteralString(zip.value) !== '00100')
      throw new Error('Du har ändrat på variabeln `person`.');
  });
  
  test('Använder objektets `street` egenskap i console.log', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    if(calls.length > 1)
      throw new Error('Du skall endast kalla på `console.log()` en gång.');

    const call = calls[0];
    let found = false;
    for(let i = 0; i < call.arguments.length; i++) {
      if(hasPropertyInArg(call.arguments, 'person.address.street')) {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste använda objektets `street` egenskap.');
  });
  
  test('Använder objektets `city` egenskap i console.log', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    if(calls.length > 1)
      throw new Error('Du skall endast kalla på `console.log()` en gång.');

    const call = calls[0];
    let found = false;
    for(let i = 0; i < call.arguments.length; i++) {
      if(hasPropertyInArg(call.arguments, 'person.address.city')) {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste använda objektets `city` egenskap.');
  });
  
  test('Använder objektets `zip` egenskap i console.log', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    if(calls.length > 1)
      throw new Error('Du skall endast kalla på `console.log()` en gång.');

    const call = calls[0];
    let found = false;
    for(let i = 0; i < call.arguments.length; i++) {
      if(hasPropertyInArg(call.arguments, 'person.address.zip')) {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste använda objektets `zip` egenskap.');
  });
  
  testOutput({
    code: data.code,
    expected: 'Fantasiagatan 123, 00100 Helsingfors',
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

function hasPropertyInArg(args: (Expression | SpreadElement)[], objectPropertyPath: string) {
  let found = false;

  astTraverse(args, n => {
    if(n.type !== 'MemberExpression' || found)
      return;

    const obj = n as MemberExpression;
    const path = getObjectPropertyPath(obj);

    if(path == objectPropertyPath)
      found = true;
  });
  return found;
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
