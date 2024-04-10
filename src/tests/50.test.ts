import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import { runCode } from "../utils/run-code";
import { generateRandomNumber } from "../utils/random";

describe('50', function() {
  const data = getStudentfileInfo();

  test('Skriver ut rätt output för olika användarinput', () => {
    for(let i = 0; i < 3; i++) {
      const num = i * 10 + generateRandomNumber(1, 9);
      let sum = 0;
      for(let j = 1; j <= num; j++) {
        sum += j;
      }
      const result = runCode(data.code, '', [{
        value: num.toString()
      }]);
      if(result.error)
        throw new Error(result.error.short);
      if(result.outputWithoutReadline !== sum.toString())
        throw new Error('Ditt program genererade fel output för input: ' + num + '\nRätt output: ' + sum.toString()+'\nDin output: ' + result.outputWithoutReadline);
    }
  });

  testOutput({
    title: 'Skriver ut rätt output för användarinput: 5',
    code: data.code,
    inputs: [{value: '5'}],
    expected: '15',
    ignoreReadlineOutput: true
  });
  
});
