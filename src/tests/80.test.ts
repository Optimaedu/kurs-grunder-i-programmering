import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import testOutput from "./utils/test-output";
import getFunctionCalls from "./utils/get-function-calls";
import { runCode } from "../utils/run-code";

describe('80', function() {
  const data = getStudentfileInfo();

  test('Använder max tre `console.log()` uttryck', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()` minst en gång.');
    if(calls.length > 3)
      throw new Error('Du skall endast kalla på `console.log()` max tre gånger.');
  });

  test('Kallar på `console.log() totalt 16 gånger', () => {
    const output = runCode(data.code, data.filePath);
    if(output.context?.console?.log?.callCount !== 16)
      throw new Error('Programmet skall utföra `console.log()` uttrycket\n16 gånger. Tips: Använd en loop..');
  });

  testOutput({
    code: data.code,
    expected: `Recept: Pannkakor, Svenskt\nIngredienser:\n  1. Mjöl\n  2. Mjölk\n  3. Ägg\n  4. Smör\nRecept: Caprese, Italienskt\nIngredienser:\n  1. Tomater\n  2. Mozzarella\n  3. Basilika\nRecept: Sushi, Japanskt\nIngredienser:\n  1. Sushiris\n  2. Nori\n  3. Lax`
  });
});
