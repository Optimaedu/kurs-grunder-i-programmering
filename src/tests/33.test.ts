import { describe } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import { generateRandomColor } from "../utils/random";

describe('33', function() {
  const data = getStudentfileInfo();

  const input1 = 'röd';
  testOutput({
    title: 'Skriver ut rätt output för input: röd',
    code: data.code,
    expected: 'Röd är en fin färg!',
    inputs: [
      {value: input1}
    ],
    ignoreReadlineOutput: true
  });
  
  let input2 = generateRandomColor();
  while(input2 === 'röd')
    input2 = generateRandomColor();
  testOutput({
    title: 'Skriver ut rätt output för input annat än röd (test 1)',
    code: data.code,
    expected: '',
    inputs: [
      {value: input2}
    ],
    ignoreReadlineOutput: true
  });
  
  let input3 = generateRandomColor();
  while(input3 === 'röd' || input3 === input2)
    input3 = generateRandomColor();
  testOutput({
    title: 'Skriver ut rätt output för input annat än röd (test 2)',
    code: data.code,
    expected: '',
    inputs: [
      {value: input3}
    ],
    ignoreReadlineOutput: true
  });
  
});
