import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import astTraverse, { nodeToIdentifierName, nodeToLiteralNumber, nodeToLiteralString } from "./utils/acorn-utils";
import testOutput from "./utils/test-output";
import getFunctionCalls from "./utils/get-function-calls";
import { Expression, Identifier, Literal, MemberExpression, Node, ObjectExpression, Property, SpreadElement } from "acorn";
import getVariableAssignments from "./utils/get-variable-assignments";
import getVariableDeclarations from "./utils/get-variable-declarations";
import { runCode } from "../utils/run-code";

describe('78', function() {
  const data = getStudentfileInfo();

  test('Använder max två `console.log()` uttryck', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()` minst en gång.');
    if(calls.length > 2)
      throw new Error('Du skall endast kalla på `console.log()` max två gånger.');
  });

  test('Kallar på `console.log() 5 gånger med en loop', () => {
    const output = runCode(data.code, data.filePath);
    if(output.context?.console?.log?.callCount !== 5)
      throw new Error('Programmet skall utföra `console.log()` uttrycket\n5 gånger. Tips: Använd en loop..');
  });

  test('Använder `name`-egenskapen i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');

    let found = false;
    for(let j = 0; j < calls.length; j++) {
      const call = calls[0];
      for(let i = 0; i < call.arguments.length; i++) {
        if(hasPropertyInArg(call.arguments, '(\\w+\\.[\\w\\d]+\\.name)|(\\w+\\.name)')) {
          found = true;
          break;
        }
      }
      if(found)
        break;
    }
    if(!found)
      throw new Error('Du måste använda `name`-egenskapen av objekt\nur `students`-arrayn i console.log.');
  });

  testOutput({
    code: data.code,
    expected: `Alice, underkänd\nBob, godkänd\nCharlie, underkänd\nDiana, godkänd\nEve, godkänd`
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
