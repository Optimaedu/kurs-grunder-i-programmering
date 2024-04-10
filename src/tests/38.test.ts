import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import { generateRandomColor } from "../utils/random";
import getIfStatements from "./utils/get-if-statements";

describe('38', function() {
  const data = getStudentfileInfo();

  test('Använder endast en if-sats med else-if och else', () => {
    const statements = getIfStatements(data.ast);
    if(statements.length !== 1)
      throw new Error('Du skall endast använda en if-sats');
  });

  const input1 = 'röd';
  testOutput({
    title: 'Skriver ut rätt output för input \'röd\'',
    code: data.code,
    expected: 'Stanna',
    inputs: [
      {value: input1.toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input2 = 'gul';
  testOutput({
    title: 'Skriver ut rätt output för input \'gul\'',
    code: data.code,
    expected: 'Var beredd att stanna',
    inputs: [
      {value: input2.toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input3 = 'grön';
  testOutput({
    title: 'Skriver ut rätt output för input \'grön\'',
    code: data.code,
    expected: 'Kör',
    inputs: [
      {value: input3.toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  let input4 = '';
  while(true) {
    input4 = generateRandomColor();
    if(input4 !== 'röd' && input4 !== 'gul' && input4 !== 'grön')
        break;
  }
  testOutput({
    title: 'Skriver ut rätt output för fel input',
    code: data.code,
    expected: 'Ogiltig färg',
    inputs: [
      {value: input4.toString()}
    ],
    ignoreReadlineOutput: true
  });
  
});
