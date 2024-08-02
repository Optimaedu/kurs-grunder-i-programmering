import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { nodeToIdentifierName } from "./utils/acorn-utils";
import testOutput from "./utils/test-output";
import getFunctionCalls from "./utils/get-function-calls";

describe('64', function() {
  const data = getStudentfileInfo();

  test('Använder arrayn och skriver ut dens längd', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const arg = calls[i].arguments[0];
      if(arg.type !== 'MemberExpression')
        continue;
      if(nodeToIdentifierName(arg.object) !== 'animals')
        continue;
      if(nodeToIdentifierName(arg.property) !== 'length')
        continue;
      found = true;
      break;
    }

    if(!found)
      throw new Error('Du måste använda `length` attributet på\n`animals` arrayn för att skriva ut\narrayns längd.');
  });

  testOutput({
    code: data.code,
    expected: '6',
    ignoreReadlineOutput: true
  });
});
