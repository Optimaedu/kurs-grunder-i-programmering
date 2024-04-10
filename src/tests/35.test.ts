import { describe } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";

describe('35', function() {
  const data = getStudentfileInfo();

  const input1 = 17;
  testOutput({
    title: 'Skriver ut rätt output: under 18',
    code: data.code,
    expected: 'Du är inte myndig.',
    inputs: [
      {value: input1.toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input2 = 18;
  testOutput({
    title: 'Skriver ut rätt output: likamed 18',
    code: data.code,
    expected: 'Du är myndig.',
    inputs: [
      {value: input2.toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input3 = 19;
  testOutput({
    title: 'Skriver ut rätt output: över 18',
    code: data.code,
    expected: 'Du är myndig.',
    inputs: [
      {value: input3.toString()}
    ],
    ignoreReadlineOutput: true
  });
});
