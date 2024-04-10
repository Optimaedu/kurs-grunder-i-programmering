import { describe } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import { generateRandomNumber } from "../utils/random";

describe('32', function() {
  const data = getStudentfileInfo();

  const input1 = generateRandomNumber(0, 24);
  testOutput({
    title: 'Skriver ut rätt output (under 25)',
    code: data.code,
    expected: '',
    inputs: [
      {value: input1.toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input4 = 24.999999999999;
  testOutput({
    title: 'Skriver ut rätt output (nästan 25)',
    code: data.code,
    expected: '',
    inputs: [
      {value: input4.toString()}
    ],
    ignoreReadlineOutput: true
  });

  const input2 = 25
  testOutput({
    title: 'Skriver ut rätt output (likamed 25)',
    code: data.code,
    expected: 'Ditt tal är större än eller likamed 25.',
    inputs: [
      {value: input2.toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input3 = generateRandomNumber(26, 100);
  testOutput({
    title: 'Skriver ut rätt output (över 50)',
    code: data.code,
    expected: 'Ditt tal är större än eller likamed 25.',
    inputs: [
      {value: input3.toString()}
    ],
    ignoreReadlineOutput: true
  });
});
