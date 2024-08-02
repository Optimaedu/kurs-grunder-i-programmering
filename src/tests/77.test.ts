import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import astTraverse, { nodeToIdentifierName, nodeToLiteralNumber, nodeToLiteralString } from "./utils/acorn-utils";
import testOutput from "./utils/test-output";
import getFunctionCalls from "./utils/get-function-calls";
import { Expression, Identifier, Literal, MemberExpression, Node, ObjectExpression, Property, SpreadElement } from "acorn";
import getVariableAssignments from "./utils/get-variable-assignments";
import getVariableDeclarations from "./utils/get-variable-declarations";
import { runCode } from "../utils/run-code";

describe('77', function() {
  const data = getStudentfileInfo();

  test('Använder ett `console.log()` uttryck', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()` en gång.');
    if(calls.length > 1)
      throw new Error('Du skall endast kalla på `console.log()` en gång.');
  });

  test('Kallar på `console.log() 3 gånger med en loop', () => {
    const output = runCode(data.code, data.filePath);
    if(output.context?.console?.log?.callCount !== 3)
      throw new Error('Programmet skall utföra `console.log()` uttrycket\n3 gånger. Tips: Använd en loop..');
  });

  test('Använder `name`-egenskapen i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    if(calls.length > 1)
      throw new Error('Du skall endast kalla på `console.log()` en gång.');

    const call = calls[0];
    let found = false;
    for(let i = 0; i < call.arguments.length; i++) {
      if(hasPropertyInArg(call.arguments, '(\\w+\\.[\\w\\d]+\\.country)|(\\w+\\.country)')) {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste använda `name`-egenskapen av objekt\nur `cities`-arrayn i console.log.');
  });

  test('Använder `country`-egenskapen i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    if(calls.length > 1)
      throw new Error('Du skall endast kalla på `console.log()` en gång.');

    const call = calls[0];
    let found = false;
    for(let i = 0; i < call.arguments.length; i++) {
      if(hasPropertyInArg(call.arguments, '(\\w+\\.[\\w\\d]+\\.country)|(\\w+\\.country)')) {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste använda `country`-egenskapen av objekt\nur `cities`-arrayn i console.log.');
  });

  test('Använder `population`-egenskapen i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    if(calls.length > 1)
      throw new Error('Du skall endast kalla på `console.log()` en gång.');

    const call = calls[0];
    let found = false;
    for(let i = 0; i < call.arguments.length; i++) {
      if(hasPropertyInArg(call.arguments, '(\\w+\\.[\\w\\d]+\\.population)|(\\w+\\.population)')) {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste använda `population`-egenskapen av objekt\nur `cities`-arrayn i console.log.');
  });

  testOutput({
    code: data.code,
    expected: `Helsingfors, Finland, Folkmängd: 658457\nStockholm, Sverige, Folkmängd: 975551\nOslo, Norge, Folkmängd: 709037`
  })
});

function hasPropertyInArg(args: (Expression | SpreadElement)[], objectPropertyPathRegex: string) {
  let found = false;
  const regex = new RegExp(objectPropertyPathRegex, 'gm');

  astTraverse(args, n => {
    if(n.type !== 'MemberExpression' || found)
      return;

    const obj = n as MemberExpression;
    const path = getObjectPropertyPath(obj);

    if(regex.test(path + ''))
      found = true;
  });
  return found;
}

function getObjectPropertyPath(obj: MemberExpression|Identifier|Literal): string|number|null|undefined {
  if(obj.type === 'Identifier')
    return nodeToIdentifierName(obj);
  else if(obj.type === 'Literal')
    return obj.raw;
  
  return (
    getObjectPropertyPath(obj.object as MemberExpression|Identifier) + 
    '.' +
    getObjectPropertyPath(obj.property as MemberExpression|Identifier)
  );
}
