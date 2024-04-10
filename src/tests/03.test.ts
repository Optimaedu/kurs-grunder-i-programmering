import { describe } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import testFunctionCallExpressionCount from "./utils/test-function-call-expression-count";

describe('03', function() {
  const data = getStudentfileInfo();

  testFunctionCallExpressionCount({
    ast: data.ast,
    callee: 'console.log',
    min: 1,
    max: 1
  });

  testOutput({
    code: data.code,
    expected: 'Programmering är roligt'
  });
});
