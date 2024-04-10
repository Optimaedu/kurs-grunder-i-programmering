import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import getWhileStatements from "./utils/get-while-statements";
import getFunctionCalls from "./utils/get-function-calls";
import { runCode } from "../utils/run-code";
import { generateRandomNumber } from "../utils/random";

describe('42', function() {
  const data = getStudentfileInfo();

  test('Använd en while-loop', () => {
    const statements = getWhileStatements(data.ast);
    if(statements.length < 1)
      throw new Error('Du måste använda en while-loop.');
    if(statements.length !== 1)
      throw new Error('Du skall endast använda en while-loop.');
  });

  test('Kalla på `console.log()` i en while-loop', () => {
    const statements = getWhileStatements(data.ast);
    if(statements.length < 1)
      throw new Error('Du måste använda en while-loop.');
    if(statements.length !== 1)
      throw new Error('Du skall endast använda en while-loop.');
    const statement = statements[0];
    const calls = getFunctionCalls(statement.body).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()` i while-loopen.');
    if(calls.length > 1)
      throw new Error('Du skall endast använda en `console.log()` i while-loopen.');
    const allCalls = getFunctionCalls(data.ast).get('console.log');
    if(!allCalls || allCalls.length !== 1)
      throw new Error('Du skall endast kalla på `console.log()` i while-loopen.');
  });

  test('Skriver ut rätt output för olika användarinput', () => {
    for(let i = 0; i < 3; i++) {
      const num = i * 10 + generateRandomNumber(1, 9);
      let output = '';
      for(let j = 0; j < num; j++) {
        output += 'Loop...' + (j < num - 1 ? '\n' : '');
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
    title: 'Skriver ut rätt output för användarinput: 3',
    code: data.code,
    inputs: [{value: '3'}],
    expected: 'Loop...\nLoop...\nLoop...',
    ignoreReadlineOutput: true
  });
  
});
