import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import getWhileStatements from "./utils/get-while-statements";
import getFunctionCalls from "./utils/get-function-calls";
import { runCode } from "../utils/run-code";
import getForStatements from "./utils/getForStatements";

describe('45', function() {
  const data = getStudentfileInfo();

  test('Använd en for-loop', () => {
    const statements = getForStatements(data.ast);
    if(statements.length < 1)
      throw new Error('Du måste använda en for-loop.');
    if(statements.length !== 1)
      throw new Error('Du skall endast använda en for-loop.');
  });

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

  test('For-loopen loopar 5 gånger', () => {
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
    const result = runCode(data.code, '');
    if(result.error)
      throw new Error(result.error.short);
    if(result.context.console.log.callCount !== 5)
      throw new Error('Din for-loop loopade ' + result.context.console.log.callCount + ' ' + (result.context.console.log.callCount === 1 ? 'gång.' : 'gånger.'));
  });

  testOutput({
    code: data.code,
    expected: 'Hej världen!\nHej världen!\nHej världen!\nHej världen!\nHej världen!'
  });
  
});
