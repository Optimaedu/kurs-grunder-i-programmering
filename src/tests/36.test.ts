import { describe } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import { generateRandomAnimal } from "../utils/random";

describe('36', function() {
  const data = getStudentfileInfo();

  let input1 = generateRandomAnimal();
  while(input1 === 'katt')
      input1 = generateRandomAnimal();
  testOutput({
    title: 'Skriver ut rätt output för annat än \'katt\'',
    code: data.code,
    expected: 'Varje djur har sina egna unika egenskaper!',
    inputs: [
      {value: input1.toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input2 = 'katt';
  testOutput({
    title: 'Skriver ut rätt output för \'katt\'',
    code: data.code,
    expected: 'Katter är bedårande varelser! ',
    inputs: [
      {value: input2.toString()}
    ],
    ignoreReadlineOutput: true
  });
});
