import { describe } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import { generateRandomNumber } from "../utils/random";

describe('31', function() {
  const data = getStudentfileInfo();

  const input1 = generateRandomNumber(1, 49);
  testOutput({
    title: 'Skriver ut rätt output (under 50)',
    code: data.code,
    expected: 'Du skrev in ett tal som är under 50.',
    inputs: [
      {value: input1.toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input2 = 50
  testOutput({
    title: 'Skriver ut rätt output (likamed 50)',
    code: data.code,
    expected: '',
    inputs: [
      {value: input2.toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input3 = generateRandomNumber(51, 100);
  testOutput({
    title: 'Skriver ut rätt output (över 50)',
    code: data.code,
    expected: '',
    inputs: [
      {value: input3.toString()}
    ],
    ignoreReadlineOutput: true
  });
});
