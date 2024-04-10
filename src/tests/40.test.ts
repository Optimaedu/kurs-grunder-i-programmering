import { describe } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import { generateRandomNumber } from "../utils/random";

describe('40', function() {
  const data = getStudentfileInfo();

  const input1 = [generateRandomNumber(1,20), generateRandomNumber(1,20), '+'];
  testOutput({
    title: 'Skriver ut rätt output operatorn \'+\'',
    code: data.code,
    expected: (Number(input1[0]) + Number(input1[1])).toString(),
    inputs: [
      {value: input1[0].toString()},
      {value: input1[1].toString()},
      {value: input1[2].toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input2 = [generateRandomNumber(1,20), generateRandomNumber(1,20), '-'];
  testOutput({
    title: 'Skriver ut rätt output operatorn \'-\'',
    code: data.code,
    expected: (Number(input2[0]) - Number(input2[1])).toString(),
    inputs: [
      {value: input2[0].toString()},
      {value: input2[1].toString()},
      {value: input2[2].toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input3 = [generateRandomNumber(1,20), generateRandomNumber(1,20), '*'];
  testOutput({
    title: 'Skriver ut rätt output operatorn \'*\'',
    code: data.code,
    expected: (Number(input3[0]) * Number(input3[1])).toString(),
    inputs: [
      {value: input3[0].toString()},
      {value: input3[1].toString()},
      {value: input3[2].toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input4 = [generateRandomNumber(1,20), generateRandomNumber(1,20), '/'];
  testOutput({
    title: 'Skriver ut rätt output operatorn \'/\'',
    code: data.code,
    expected: (Number(input4[0]) / Number(input4[1])).toString(),
    inputs: [
      {value: input4[0].toString()},
      {value: input4[1].toString()},
      {value: input4[2].toString()}
    ],
    ignoreReadlineOutput: true
  });
  
});
