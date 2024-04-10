import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import getWhileStatements from "./utils/get-while-statements";
import getFunctionCalls from "./utils/get-function-calls";
import { runCode } from "../utils/run-code";

describe('41', function() {
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

  test('While-loopen loopar 5 gånger', () => {
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
    const result = runCode(data.code, '');
    if(result.error)
      throw new Error(result.error.short);
    if(result.context.console.log.callCount !== 5)
      throw new Error('Din while-loop loopade ' + result.context.console.log.callCount + ' ' + (result.context.console.log.callCount === 1 ? 'gång.' : 'gånger.'));
  });

  testOutput({
    code: data.code,
    expected: 'Hej på dig!\nHej på dig!\nHej på dig!\nHej på dig!\nHej på dig!'
  });
  
});
