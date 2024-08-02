import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { nodeToIdentifierName, nodeToLiteralNumber, nodeToLiteralString } from "./utils/acorn-utils";
import { Node, ObjectExpression, Property } from "acorn";
import getVariableAssignments from "./utils/get-variable-assignments";

describe('74', function() {
  const data = getStudentfileInfo();

  test('Objektet har egenskapen `name`', () => {
    const obj = getObjectFromVariableAssignment(data.ast);
    const prop = getProp(obj, 'name');
    if(!prop)
      throw new Error('Objektet skall ha egenskapen `name`.');
    if(nodeToLiteralString(prop.value) !== 'John Doe')
      throw new Error('Egenskapen `name` skall ha värdet \'John Doe\'.');
  });
  
  test('Objektet har egenskapen `age`', () => {
    const obj = getObjectFromVariableAssignment(data.ast);
    const prop = getProp(obj, 'age');
    if(!prop)
      throw new Error('Objektet skall ha egenskapen `age`.');
    if(nodeToLiteralNumber(prop.value) !== 72)
      throw new Error('Egenskapen `age` skall ha värdet 72.');
  });
  
  test('Objektet har egenskapen `address`', () => {
    const obj = getObjectFromVariableAssignment(data.ast);
    const prop = getProp(obj, 'address');
    if(!prop)
      throw new Error('Objektet skall ha egenskapen `address`.');

    if(prop.value.type !== 'ObjectExpression')
      throw new Error('Egenskapen `address` skall ha ett objekt som värde.');

    const address = prop.value as ObjectExpression;
    const correct = [{key: 'street', value: 'Fantasiagatan 123'}, {key: 'city', value: 'Helsingfors'}, {key: 'zip', value: '00100'}];

    for(let i = 0; i < correct.length; i++) {
      const p = getProp(address, correct[i].key);
      if(!p)
        throw new Error('Objektet `address` skall ha egenskapen `' + correct[i].key + '`.');
      if(nodeToLiteralString(p.value) !== correct[i].value)
        throw new Error('Egenskapen `' + correct[i].key + '` i objektet `address`\nskall ha värdet `\''+correct[i].value+'\'`.');
    }
  });
});

function getObjectFromVariableAssignment(node: Node|Node[]) {
  const all = getVariableAssignments(node, true);
  if(!all || all.size < 1)
    throw new Error('Du skall deklarera en variabel.');
  if(all.size > 1)
    throw new Error('Du skall deklarera endast en variabel.');

  const name = all.keys().next().value;
  const assignments = all.get(name);

  if(!assignments || assignments.length !== 1)
    throw new Error('Du skall endast tilldela ett värde en gång\ntill variabeln.');

  if(assignments[0].right.type !== 'ObjectExpression')
    throw new Error('Du skall tilldela variabeln ett objekt.');
  
  return assignments[0].right as ObjectExpression;
}

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