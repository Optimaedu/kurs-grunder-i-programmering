import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import astTraverse, { nodeToIdentifierName, nodeToLiteralString } from "./utils/acorn-utils";
import getFunctionCalls from "./utils/get-function-calls";
import testOutput from "./utils/test-output";
import getVariableDeclarations from "./utils/get-variable-declarations";
import getVariableAssignments from "./utils/get-variable-assignments";

describe('19', function() {
  const data = getStudentfileInfo();
  
  test('Deklarera variabeln `firstName` enligt uppgiftsbeskrivningen', () => {
    const declarations = getVariableDeclarations(data.ast).get('firstName');
    if(!declarations || declarations.length !== 1)
      throw new Error('Du måste deklarera en variabel med namnet `firstName`.');
    const assignments = getVariableAssignments(data.ast, true).get('firstName');
    if(!assignments || assignments.length < 1)
      throw new Error('Du måste tilldela textsträngen `\'Alan\'` till variabeln.');
    let found = false;
    for(let i = 0; i < assignments.length; i++) {
      if(nodeToLiteralString(assignments[i].right) === 'Alan') {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste tilldela textsträngen `\'Alan\'` till variabeln.');
  });
  
  test('Deklarera variabeln `lastName` enligt uppgiftsbeskrivningen', () => {
    const declarations = getVariableDeclarations(data.ast).get('lastName');
    if(!declarations || declarations.length !== 1)
      throw new Error('Du måste deklarera en variabel med namnet `lastName`.');
    const assignments = getVariableAssignments(data.ast, true).get('lastName');
    if(!assignments || assignments.length < 1)
      throw new Error('Du måste tilldela textsträngen `\'Turing\'` till variabeln.');
    let found = false;
    for(let i = 0; i < assignments.length; i++) {
      if(nodeToLiteralString(assignments[i].right) === 'Turing') {
        found = true;
        break;
      }
    }
    if(!found)
      throw new Error('Du måste tilldela textsträngen `\'Turing\'` till variabeln.');
  });
  
  test('Deklarera variabeln `fullName` enligt uppgiftsbeskrivningen', () => {
    const declarations = getVariableDeclarations(data.ast).get('fullName');
    if(!declarations || declarations.length !== 1)
      throw new Error('Du måste deklarera en variabel med namnet `fullName`.');
    const assignments = getVariableAssignments(data.ast, true).get('fullName');
    if(!assignments || assignments.length < 1)
      throw new Error('Du måste konkatenera variablerna `firstName` och\n`lastName` då du tilldelar värdet till variabeln.');
    let firstFound = false;
    let lastFound = false;
    for(let i = 0; i < assignments.length; i++) {
      astTraverse(assignments[i].right, n => {
        const name = nodeToIdentifierName(n);
        if(name === 'firstName') {
          firstFound = true;
        }
        else if(name === 'lastName') {
          lastFound = true;
        }
      });
    }
    if(!firstFound || !lastFound)
      throw new Error('Du måste konkatenera variablerna `firstName` och\n`lastName` då du tilldelar värdet till variabeln.');
  });

  test('Använd variabeln `fullName` som argument i `console.log()`', () => {
    const calls = getFunctionCalls(data.ast).get('console.log');
    if(!calls || calls.length < 1)
      throw new Error('Du måste kalla på `console.log()`.');
    
    let found = false;
    for(let i = 0; i < calls.length; i++) {
      const call = calls[i];
      astTraverse(call.arguments, n => {
        const name = nodeToIdentifierName(n);
        if(name === 'fullName') {
          found = true;
        }
      });
      if(found)
        break;
    }
    if(!found)
      throw new Error('Du måste använda variabeln `fullName` som argument\ndå du kallar på `console.log()`.');
  });

  testOutput({
    code: data.code,
    expected: 'Alan Turing'
  });
});
