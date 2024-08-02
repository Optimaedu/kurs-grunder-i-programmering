import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { nodeToIdentifierName } from "./utils/acorn-utils";
import testOutput from "./utils/test-output";
import getFunctionCalls from "./utils/get-function-calls";
import getWhileStatements from "./utils/get-while-statements";
import getForStatements from "./utils/getForStatements";

describe('66', function() {
  const data = getStudentfileInfo();

  test('Kalla på `console.log()` i en loop', () => {
    const allCalls = getFunctionCalls(data.ast).get('console.log');
    if(!allCalls || allCalls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    if(allCalls.length > 1)
      throw new Error('Du skall endast kalla på `console.log()` en gång.');
    
    const whileLoops = getWhileStatements(data.ast);
    const forLoops = getForStatements(data.ast);

    if(whileLoops.length + forLoops.length < 1)
      throw new Error('Du måste använda en loop.');
    if(whileLoops.length + forLoops.length > 1)
      throw new Error('Du skall endast använda en loop.');

    const loop = whileLoops.length > 0 ? whileLoops[0] : forLoops[0];
    const calls = getFunctionCalls(loop.body).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()` i en loop.');
  });

  test('Använder arrayn som argument i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length !== 1)
      throw new Error('Du skall kalla på `console.log()` en gång.');
    const call = calls[0];
    if(call.arguments.length !== 1)
      throw new Error('Du skall kalla på `console.log() med\nett argument.');
    if(call.arguments[0].type !== 'MemberExpression')
      throw new Error('Du måste använda arrayn som argument\ndå du kallar på `console.log()`.');
    if(nodeToIdentifierName(call.arguments[0].object) !== 'colors')
      throw new Error('Du måste använda `colors` arrayn som argument\ndå du kallar på `console.log()`.');
  });

  testOutput({
    code: data.code,
    expected: 'röd\norange\ngul\ngrön\nblå',
    ignoreReadlineOutput: true
  });
});
