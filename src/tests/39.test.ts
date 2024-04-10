import { describe } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import { generateRandomNumber } from "../utils/random";

describe('39', function() {
  const data = getStudentfileInfo();

  const input1 = 13;
  testOutput({
    title: 'Skriver ut rätt output för ålder under 14',
    code: data.code,
    expected: 'Du får inte åka berg-och-dalbana.',
    inputs: [
      {value: input1.toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input2 = [14, 'ja'];
  testOutput({
    title: 'Skriver ut rätt output för ålder 14 och svar \'ja\'',
    code: data.code,
    expected: 'Du får åka berg-och-dalbana.',
    inputs: [
      {value: input2[0].toString()},
      {value: input2[1].toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input3 = [generateRandomNumber(15,100), 'ja'];
  testOutput({
    title: 'Skriver ut rätt output för över 14 och svar \'ja\'',
    code: data.code,
    expected: 'Du får åka berg-och-dalbana.',
    inputs: [
      {value: input3[0].toString()},
      {value: input3[1].toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input4 = [generateRandomNumber(14,15), 'nej'];
  testOutput({
    title: 'Skriver ut rätt output för annat svar än \'ja\'',
    code: data.code,
    expected: 'Det är okej att inte åka berg-och-dalbana.',
    inputs: [
      {value: input4[0].toString()},
      {value: input4[1].toString()}
    ],
    ignoreReadlineOutput: true
  });
  
});
