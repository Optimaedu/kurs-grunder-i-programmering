import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import testFunctionCallExpressionCount from "./utils/test-function-call-expression-count";
import getFunctionCalls from "./utils/get-function-calls";
import { nodeToBinaryExpression } from "./utils/acorn-utils";

describe('09', function() {
  const data = getStudentfileInfo();

  testFunctionCallExpressionCount({
    ast: data.ast,
    callee: 'console.log',
    min: 3,
    max: 3
  });

  test('Använd ett subtraktionsuttryck i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const call = calls[i];
      if(call.arguments.length !== 1)
        continue;
      const arg = call.arguments[0];
      const expression = nodeToBinaryExpression(arg);
      if(expression && expression.operator === '-' && !Number.isNaN(expression.left) && !Number.isNaN(expression.right)) {
        found = true;
        break;
      }
    }
    if(!found) {
      throw new Error('Du måste använda ett subtraktionsuttryck\nsom argument, med 2 tal.');
    }
  });

  test('Använd ett multiplikaitonsuttryck i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const call = calls[i];
      if(call.arguments.length !== 1)
        continue;
      const arg = call.arguments[0];
      const expression = nodeToBinaryExpression(arg);
      if(expression && expression.operator === '*' && !Number.isNaN(expression.left) && !Number.isNaN(expression.right)) {
        found = true;
        break;
      }
    }
    if(!found) {
      throw new Error('Du måste använda ett multiplikationsuttryck\nsom argument, med 2 tal.');
    }
  });

  test('Använd ett divisionsuttryck i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const call = calls[i];
      if(call.arguments.length !== 1)
        continue;
      const arg = call.arguments[0];
      const expression = nodeToBinaryExpression(arg);
      if(expression && expression.operator === '/' && !Number.isNaN(expression.left) && !Number.isNaN(expression.right)) {
        found = true;
        break;
      }
    }
    if(!found) {
      throw new Error('Du måste använda ett divisionsuttryck\nsom argument, med 2 tal.');
    }
  });

  testOutput({
    code: data.code,
    expected: '9\n8\n7'
  });
});
