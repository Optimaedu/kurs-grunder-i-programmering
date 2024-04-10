import { describe } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import { generateRandomNumber } from "../utils/random";

describe('34', function() {
  const data = getStudentfileInfo();

  const input1 = 100;
  testOutput({
    title: 'Skriver ut rätt output för input: 100',
    code: data.code,
    expected: '',
    inputs: [
      {value: input1.toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input2 = generateRandomNumber(0,99);
  testOutput({
    title: 'Skriver ut rätt output för annan input än 100 (test 1)',
    code: data.code,
    expected: 'Det angivna talet är inte 100.',
    inputs: [
      {value: input2.toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input3 = generateRandomNumber(101,200);
  testOutput({
    title: 'Skriver ut rätt output för annan input än 100 (test 2)',
    code: data.code,
    expected: 'Det angivna talet är inte 100.',
    inputs: [
      {value: input3.toString()}
    ],
    ignoreReadlineOutput: true
  });
});
