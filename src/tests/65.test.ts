import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { nodeToIdentifierName, nodeToLiteralNumber } from "./utils/acorn-utils";
import testOutput from "./utils/test-output";
import getFunctionCalls from "./utils/get-function-calls";

describe('65', function() {
  const data = getStudentfileInfo();

  test('Använder arrayn och skriver ut sista elementet', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const arg = calls[i].arguments[0];
      if(arg.type !== 'MemberExpression')
        continue;
      if(nodeToIdentifierName(arg.object) !== 'fruits')
        continue;
      if(nodeToLiteralNumber(arg.property) === 3) {
        found = true;
        break;
      }
      if(arg.property.type === 'BinaryExpression') {
        if(arg.property.left.type !== 'MemberExpression')
          continue;
        if(nodeToIdentifierName(arg.property.left.object) !== 'fruits')
          continue;
        if(nodeToIdentifierName(arg.property.left.property) !== 'length')
          continue;
        if(arg.property.operator !== '-')
          continue;
        if(nodeToLiteralNumber(arg.property.right) !== 1)
          continue;

        found = true;
        break;
      }
    }

    if(!found)
      throw new Error('Du måste använda `fruits` arrayn för\natt skriva ut sista elementet.');
  });

  testOutput({
    code: data.code,
    expected: 'jordgubbe',
    ignoreReadlineOutput: true
  });
});
