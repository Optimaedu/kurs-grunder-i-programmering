import { describe } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import { getReadlineFunctionName } from "../utils/run-code";
import { generateRandomNumber } from "../utils/random";
import testFunctionCallExpressionCount from "./utils/test-function-call-expression-count";

describe('29', function() {
  const data = getStudentfileInfo();
  const readlineFunctionName = getReadlineFunctionName(data.code);
  
  testFunctionCallExpressionCount({ast: data.ast, callee: readlineFunctionName, min: 1, max: 1, title: 'Kalla på `readline()` 1 gång'});

  const seconds1 = generateRandomNumber(1, 119);
  const expected1 = seconds1/60;
  testOutput({
    title: 'Skriver ut rätt output (test 1)',
    code: data.code,
    expected: seconds1 + ' minuter motsvarar ' + expected1 + ' timmar.',
    inputs: [
      {value: seconds1.toString()}
    ],
    ignoreReadlineOutput: true
  })
  
  const seconds2 = generateRandomNumber(120, 1000);
  const expected2 = seconds2/60;
  testOutput({
    title: 'Skriver ut rätt output (test 2)',
    code: data.code,
    expected: seconds2 + ' minuter motsvarar ' + expected2 + ' timmar.',
    inputs: [
      {value: seconds2.toString()}
    ],
    ignoreReadlineOutput: true
  })
});
