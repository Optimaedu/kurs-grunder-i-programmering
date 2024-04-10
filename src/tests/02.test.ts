import { describe } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import testFunctionCallExpressionCount from "./utils/test-function-call-expression-count";

describe('02', function() {
  const data = getStudentfileInfo();

  testFunctionCallExpressionCount({
    ast: data.ast,
    callee: 'console.log',
    min: 5,
    max: 5
  });

  testOutput({
    code: data.code,
    expected: 'Koden skrivs, rad för rad.\nFunktioner dansar i digitalt ljus.\nLoopar virvlar, algoritmer spelar.\nBitar dansar i en binär symfoni.\nProgrammet slutar, men tankarna fortsätter.'
  });
});
