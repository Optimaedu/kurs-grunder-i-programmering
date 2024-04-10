import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { nodeToLiteralString } from "./utils/acorn-utils";
import getFunctionCalls from "./utils/get-function-calls";
import testOutput from "./utils/test-output";
import { getReadlineFunctionName } from "../utils/run-code";
import { generateRandomFirstName, generateRandomLastName } from "../utils/random";

describe('23', function() {
  const data = getStudentfileInfo();
  const readlineFunctionName = getReadlineFunctionName(data.code);
  
  test('Kalla på `readline()` med `\'Skriv in ditt förnamn: \'`', () => {
    const calls = getFunctionCalls(data.ast).get(readlineFunctionName);
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på funktionen `readline()`.');
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const call = calls[i];
      if(call.arguments && nodeToLiteralString(call.arguments[0]) === 'Skriv in ditt förnamn: ') {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste använda textsträngen `\'Skriv in ditt förnamn: \'`\nsom argument då du kallar på `readline().\nObservera mellanslaget i slutet.');
  });
  
  test('Kalla på `readline()` med `\'Skriv in ditt efternamn: \'`', () => {
    const calls = getFunctionCalls(data.ast).get(readlineFunctionName);
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på funktionen `readline()` en gång.');
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const call = calls[i];
      if(call.arguments && nodeToLiteralString(call.arguments[0]) === 'Skriv in ditt efternamn: ') {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste använda textsträngen `\'Skriv in ditt efternamn: \'`\nsom argument då du kallar på `readline().\nObservera mellanslaget i slutet.');
  });

  const firstName = generateRandomFirstName();
  const lastName = generateRandomLastName();
  testOutput({
    code: data.code,
    expected: 'Hej ' + firstName + ' ' + lastName + '!',
    inputs: [
      {matchPrompt: 'Skriv in ditt förnamn: ', value: firstName},
      {matchPrompt: 'Skriv in ditt efternamn: ', value: lastName}
    ],
    ignoreReadlineOutput: true
  })
});
