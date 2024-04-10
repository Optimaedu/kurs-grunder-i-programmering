import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import testFunctionCallExpressionCount from "./utils/test-function-call-expression-count";
import getFunctionCalls from "./utils/get-function-calls";
import { nodeToBinaryExpression, nodeToLiteralNumber } from "./utils/acorn-utils";

describe('08', function() {
  const data = getStudentfileInfo();

  testFunctionCallExpressionCount({
    ast: data.ast,
    callee: 'console.log',
    min: 1,
    max: 1
  });

  test('Använd ett additionsuttryck i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    if(calls.length > 1)
      throw new Error('Du skall endast kalla på `console.log()` en gång.');
    const call = calls[0];
    if(!call.arguments || call.arguments.length < 1)
      throw new Error('Du måste kalla på `console.log()` med ett argument.');
    if(!call.arguments || call.arguments.length > 1)
      throw new Error('Du skall kalla på `console.log()` med endast ett argument.');
    const arg = call.arguments[0];
    const expression = nodeToBinaryExpression(arg);
    if(!expression || expression.operator !== '+') 
      throw new Error('Du måste kalla på `console.log()` med ett additionsuttryck\nsom argument.');
    if(Number.isNaN(nodeToLiteralNumber(expression.left)) || Number.isNaN(nodeToLiteralNumber(expression.right)))
      throw new Error('Du måste använda 2 tal i additionsuttrycket.');
  });

  testOutput({
    code: data.code,
    expected: '42'
  });
});
