import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import { generateRandomNumber } from "../utils/random";
import getIfStatements from "./utils/get-if-statements";

describe('37', function() {
  const data = getStudentfileInfo();

  test('Använder en if, else if och else', () => {
    const statements = getIfStatements(data.ast);
    if(statements.length !== 1)
      throw new Error('Du skall endast använda en if-sats');
    if(!statements[0].alternate || statements[0].alternate.type !== 'IfStatement')
      throw new Error('Du måste använda en else-if-sats');
    if(!statements[0].alternate.alternate)
      throw new Error('Du måste använda en else-sats');
    if( statements[0].alternate.alternate.type === 'IfStatement')
      throw new Error('Du skall endast använda en else-if-sats');
  });

  const input1 = generateRandomNumber(-10, -1);
  testOutput({
    title: 'Skriver ut rätt output negativa tal',
    code: data.code,
    expected: 'Talet är negativt.',
    inputs: [
      {value: input1.toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input2 = generateRandomNumber(1, 10);
  testOutput({
    title: 'Skriver ut rätt output positiva tal',
    code: data.code,
    expected: 'Talet är positivt.',
    inputs: [
      {value: input2.toString()}
    ],
    ignoreReadlineOutput: true
  });
  
  const input3 = 0;
  testOutput({
    title: 'Skriver ut rätt output talet 0',
    code: data.code,
    expected: 'Talet är 0.',
    inputs: [
      {value: input3.toString()}
    ],
    ignoreReadlineOutput: true
  });
});
