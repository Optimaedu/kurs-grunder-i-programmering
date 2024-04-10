import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { nodeToLiteralString } from "./utils/acorn-utils";
import getFunctionCalls from "./utils/get-function-calls";
import testOutput from "./utils/test-output";
import { getReadlineFunctionName } from "../utils/run-code";
import { generateRandomNumber } from "../utils/random";

describe('27', function() {
  const data = getStudentfileInfo();
  const readlineFunctionName = getReadlineFunctionName(data.code);
  
  test('Kalla på `readline()` med `\'Ange rektangelns längd: \'`', () => {
    const calls = getFunctionCalls(data.ast).get(readlineFunctionName);
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på funktionen `readline()`.');
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const call = calls[i];
      if(call.arguments && nodeToLiteralString(call.arguments[0]) === 'Ange rektangelns längd: ') {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste använda textsträngen `\'Ange rektangelns längd: \'`\nsom argument då du kallar på `readline().\nObservera mellanslaget i slutet.');
  });
  
  test('Kalla på `readline()` med `\'Ange rektangelns bredd: \'`', () => {
    const calls = getFunctionCalls(data.ast).get(readlineFunctionName);
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på funktionen `readline()`.');
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const call = calls[i];
      if(call.arguments && nodeToLiteralString(call.arguments[0]) === 'Ange rektangelns bredd: ') {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste använda textsträngen `\'Ange rektangelns bredd: \'`\nsom argument då du kallar på `readline().\nObservera mellanslaget i slutet.');
  });

  const nums = [generateRandomNumber(1, 20), generateRandomNumber(1, 20)];
  testOutput({
    code: data.code,
    expected: `Rektangelns area med längden ${nums[0]} och bredden ${nums[1]} är ${nums[0] * nums[1]}`,
    inputs: [
      {matchPrompt: 'Ange rektangelns längd: ', value: nums[0].toString()},
      {matchPrompt: 'Ange rektangelns bredd: ', value: nums[1].toString()}
    ],
    ignoreReadlineOutput: true,
  })
});
