import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import testFunctionCallExpressionCount from "./utils/test-function-call-expression-count";
import getFunctionCalls from "./utils/get-function-calls";
import { nodeToBinaryExpression, nodeToLiteralString } from "./utils/acorn-utils";

describe('10', function() {
  const data = getStudentfileInfo();

  testFunctionCallExpressionCount({
    ast: data.ast,
    callee: 'console.log',
    min: 1,
    max: 1
  });

  test('Konkatenera 2 textsträngar i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    if(calls.length > 1)
      throw new Error('Du skall endast kalla på `console.log()` en gång.');
    const call = calls[0];
    if(call.arguments.length !== 1)
      throw new Error('Du måste använda ett argument i `console.log()`.');
    const arg = call.arguments[0];
    const expression = nodeToBinaryExpression(arg);
    if(!expression || expression.operator !== '+' || !nodeToLiteralString(expression.left) || !nodeToLiteralString(expression.right))
      throw new Error('Du måste ange ett additionsuttryck med 2 textsträngar\nsom argument.');
  });

  testOutput({
    code: data.code,
    expected: 'Programutveckling'
  });
});
