import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import astTraverse, { nodeToIdentifierName } from "./utils/acorn-utils";
import testOutput from "./utils/test-output";
import getFunctionCalls from "./utils/get-function-calls";
import { MemberExpression, Node } from "acorn";

describe('73', function() {
  const data = getStudentfileInfo();

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

  test('Använder objektets `color` egenskap i console.log', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls)
      throw new Error('Du måste kalla på `console.log()`.');

    let found = false;
    for(let i = 0; i < calls.length; i++) {
      if(hasObjectProperty(calls[i].arguments, 'car', 'color')) {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste använda objektets `color` egenskap i console.log.');
  });
  
  testOutput({
    code: data.code,
    expected: 'Märke: Nissan\nModell: Micra\nÅr: 2021\nFärg: blå',
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
