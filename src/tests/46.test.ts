import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import { runCode } from "../utils/run-code";
import { generateRandomNumber } from "../utils/random";
import getFunctionCalls from "./utils/get-function-calls";
import getForStatements from "./utils/getForStatements";

describe('46', function() {
  const data = getStudentfileInfo();

  test('Kalla på `console.log()` i en for-loop', () => {
    const statements = getForStatements(data.ast);
    if(statements.length < 1)
      throw new Error('Du måste använda en for-loop.');
    if(statements.length !== 1)
      throw new Error('Du skall endast använda en for-loop.');
    const statement = statements[0];
    const calls = getFunctionCalls(statement.body).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()` i for-loopen.');
    if(calls.length > 1)
      throw new Error('Du skall endast använda en `console.log()` i for-loopen.');
    const allCalls = getFunctionCalls(data.ast).get('console.log');
    if(!allCalls || allCalls.length !== 1)
      throw new Error('Du skall endast kalla på `console.log()` i for-loopen.');
  });

  test('Skriver ut rätt output för olika användarinput', () => {
    for(let i = 0; i < 3; i++) {
      const num = i * 10 + generateRandomNumber(1, 9);
      let output = '';
      for(let j = 0; j <= num; j++) {
        output += j.toString() + (j < num ? '\n' : '');
      }
      const result = runCode(data.code, '', [{
        value: num.toString()
      }]);
      if(result.error)
        throw new Error(result.error.short);
      if(result.outputWithoutReadline !== output)
        throw new Error('Ditt program genererade fel output för input: ' + num);
    }
  });

  testOutput({
    title: 'Skriver ut rätt output för användarinput: 5',
    code: data.code,
    inputs: [{value: '5'}],
    expected: '0\n1\n2\n3\n4\n5',
    ignoreReadlineOutput: true
  });
  
});
