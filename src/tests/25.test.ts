import { describe } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import { getReadlineFunctionName } from "../utils/run-code";
import { generateRandomNumber } from "../utils/random";
import testFunctionCallExpressionCount from "./utils/test-function-call-expression-count";

describe('25', function() {
  const data = getStudentfileInfo();
  const readlineFunctionName = getReadlineFunctionName(data.code);
  
  testFunctionCallExpressionCount({ast: data.ast, callee: readlineFunctionName, min: 3, max: 3, title: 'Kalla på `readline()` 3 gånger'});

  const nums = [generateRandomNumber(1, 20),generateRandomNumber(1, 20),generateRandomNumber(1, 20)];
  testOutput({
    code: data.code,
    expected: (nums[0] + nums[1] + nums[2]).toString(),
    inputs: [
      {value: nums[0].toString()},
      {value: nums[1].toString()},
      {value: nums[2].toString()}
    ],
    ignoreReadlineOutput: true,
    hint: 'Kom ihåg att konvertera användarens input till ett tal.'
  })
});
