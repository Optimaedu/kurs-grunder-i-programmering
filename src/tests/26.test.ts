import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { nodeToLiteralString } from "./utils/acorn-utils";
import getFunctionCalls from "./utils/get-function-calls";
import testOutput from "./utils/test-output";
import { getReadlineFunctionName } from "../utils/run-code";
import { generateRandomNumber } from "../utils/random";

describe('26', function() {
  const data = getStudentfileInfo();
  const readlineFunctionName = getReadlineFunctionName(data.code);
  
  test('Kalla på `readline()` med argumentet `\'Ange din ålder: \'`', () => {
    const calls = getFunctionCalls(data.ast).get(readlineFunctionName);
    if(!calls || calls.length !== 1)
      throw new Error('Du måste kalla på funktionen `readline()` en gång.');
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const call = calls[i];
      if(call.arguments && nodeToLiteralString(call.arguments[0]) === 'Ange din ålder: ') {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste använda textsträngen `\'Ange din ålder: \'`\nsom argument då du kallar på `readline().\nObservera mellanslaget i slutet.');
  });

  const num = generateRandomNumber(1, 100);
  testOutput({
    code: data.code,
    expected: 'Om 10 år kommer du att vara ' + (num + 10).toString() + ' år gammal.',
    inputs: [
      {value: num.toString()}
    ],
    ignoreReadlineOutput: true,
    hint: 'Kom ihåg att konvertera användarens input till ett tal.'
  })
});
