import { describe } from "mocha";
import { StudentFileInfo, getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import { generateRandomNumber } from "../utils/random";

describe('30', function() {
  const data = getStudentfileInfo();
  
  generateTest(data, 1, -4, -4);
  generateTest(data, 2, 68, 68);
  generateTest(data, 3, 1, 67);
});

function generateTest(data: StudentFileInfo, id: number, min: number, max: number) {
  const fahrenheit = generateRandomNumber(min, max);
  const celsius = (fahrenheit - 32) * 5/9;
  testOutput({
    title: 'Skriver ut rätt output (test '+id+')',
    code: data.code,
    expected: fahrenheit + ' grader Fahrenheit är '+celsius+' grader Celsius.',
    inputs: [
      {value: fahrenheit.toString()}
    ],
    ignoreReadlineOutput: true
  })
}
