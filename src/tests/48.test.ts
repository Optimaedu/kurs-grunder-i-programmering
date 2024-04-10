import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import getFunctionCalls from "./utils/get-function-calls";
import getForStatements from "./utils/getForStatements";
import getWhileStatements from "./utils/get-while-statements";

describe('48', function() {
  const data = getStudentfileInfo();

  test('Kalla på `console.log()` i en loop', () => {
    const forStatements = getForStatements(data.ast);
    const whileStatements = getWhileStatements(data.ast);
    if(forStatements.length > 0 && whileStatements.length > 0)
      throw new Error('Du skall använda en while-loop eller en for-loop\nmen inte båda.');
    const statements = forStatements.length > 0 ? forStatements : whileStatements;
    if(statements.length < 1)
      throw new Error('Du måste använda en loop.');
    if(statements.length !== 1)
      throw new Error('Du skall endast använda en loop.');
    const statement = statements[0];
    const calls = getFunctionCalls(statement.body).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()` i loopen.');
    if(calls.length > 1)
      throw new Error('Du skall endast använda en `console.log()` i loopen.');
    const allCalls = getFunctionCalls(data.ast).get('console.log');
    if(!allCalls || allCalls.length !== 1)
      throw new Error('Du skall endast kalla på `console.log()` i loopen.');
  });

  testOutput({
    title: 'Skriver ut rätt output',
    code: data.code,
    expected: '2\n4\n6\n8\n10\n12\n14\n16\n18\n20',
    ignoreReadlineOutput: true
  });
  
});
