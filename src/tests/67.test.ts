import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { nodeToIdentifierName, nodeToLiteralString } from "./utils/acorn-utils";
import testOutput from "./utils/test-output";
import getFunctionCalls from "./utils/get-function-calls";
import getWhileStatements from "./utils/get-while-statements";
import getForStatements from "./utils/getForStatements";
import getVariableAssignments from "./utils/get-variable-assignments";

describe('67', function() {
  const data = getStudentfileInfo();

  test('Lägger till textsträngen `\'blå\'` i slutet av arrayn.', () => {
    const assignments = getVariableAssignments(data.ast, true).get('colors');
    if(!assignments || assignments.length < 1)
      throw new Error('Du måste ange ett värde åt variabeln `color`.');
    if(assignments.length > 1)
      throw new Error('Du skall endast ange ett värde till variabeln `color`.');
    if(assignments[0].right.type !== 'ArrayExpression')
      throw new Error('Du skall inte ändra på den befintliga\ndeklarationen av variabeln `color`.');
    if(assignments[0].right.elements.length !== 2)
      throw new Error('Du skall inte ändra på den befintliga\ndeklarationen av variabeln `color`.');
    if(nodeToLiteralString(assignments[0].right.elements[0]) !== 'röd' || nodeToLiteralString(assignments[0].right.elements[1]) !== 'grön')
      throw new Error('Du skall inte ändra på den befintliga\ndeklarationen av variabeln `color`.');
  
    const calls = getFunctionCalls(data.ast).get('colors.push');
    if(!calls || calls.length < 1)
      throw new Error('Du skall använda array funktionen `push()` för\natt lägga till elementet till array.');
    if(calls.length > 1)
      throw new Error('Du skall endast använda `push` en gång.');

    const call = calls[0];
    if(nodeToLiteralString(call.arguments[0]) !== 'blå')
      throw new Error('Du skall använda textsträngen `\'blå\'`\nsom argument till `push`.');
  });

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
    expected: 'röd\ngrön\nblå',
    ignoreReadlineOutput: true
  });
});
