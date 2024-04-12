import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getVariableDeclarations from "./utils/get-variable-declarations";
import getVariableAssignments from "./utils/get-variable-assignments";
import { ArrayExpression } from "acorn";
import { nodeToIdentifierName, nodeToLiteralNumber, nodeToLiteralString } from "./utils/acorn-utils";
import testOutput from "./utils/test-output";
import getFunctionCalls from "./utils/get-function-calls";

describe('63', function() {
  const data = getStudentfileInfo();

  test('Använder arrayn och skriver ut första elementet', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const arg = calls[i].arguments[0];
      if(arg.type !== 'MemberExpression')
        continue;
      if(nodeToIdentifierName(arg.object) !== 'colors')
        continue;
      if(nodeToLiteralNumber(arg.property) !== 0)
        continue;
      found = true;
      break;
    }

    if(!found)
      throw new Error('Du måste använda `colors` arrayn för\natt skriva ut första elementet.');
  });
  
  test('Använder arrayn och skriver ut andra elementet', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const arg = calls[i].arguments[0];
      if(arg.type !== 'MemberExpression')
        continue;
      if(nodeToIdentifierName(arg.object) !== 'colors')
        continue;
      if(nodeToLiteralNumber(arg.property) !== 1)
        continue;
      found = true;
      break;
    }

    if(!found)
      throw new Error('Du måste använda `colors` arrayn för\natt skriva ut andra elementet.');
  });

  testOutput({
    code: data.code,
    expected: 'röd\norange',
    ignoreReadlineOutput: true
  });
});
