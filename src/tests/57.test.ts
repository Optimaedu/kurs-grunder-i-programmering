import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getFunctionDeclarations from "./utils/get-function-declarations";
import testOutput from "./utils/test-output";
import { runCode } from "../utils/run-code";

describe('57', function() {
  const data = getStudentfileInfo();

  test('Deklarera funktionen `isPositive` med en parameter', () => {
    const declarations = getFunctionDeclarations(data.ast);
    
    if(declarations.size < 1)
      throw new Error('Du måste deklarera en funktion.');
    if(declarations.size > 1)
      throw new Error('Du skall endast deklarera en funktion.');
    
    const target = declarations.get('isPositive');
    if(!target || target.length < 1) {
      const [key] = declarations.entries().next().value;
      throw new Error('Du måste deklarera en funktion med namnet `isPositive`.\nDu har deklarerat en funktion med namnet `'+key+'`.');
    }

    if(target.length > 1)
      throw new Error('Du skall endast deklarera en funktion med namnet `isPositive`.');

    if(target[0].params.length !== 1)
      throw new Error('Du måste deklarera `isPositive` med 1 parameter.');
  });

  test('Returnera `true` om värdet i parametern är positivt', () => {
    const regex = /console\.log\(['"`].*['"`]\)/g;

    const values = Array.from({length:20}).map(() => Math.sign(Math.random() - 0.5)*10);
    values[0] = 0;
    const code = data.code.replace(regex, '{}') + `
      ${values.map(v => `console.log(isPositive(${v}))`).join('\n')}
    `;
    
    const expected = values.map(v => v >= 0).join('\n');
    const result = runCode(code, '');

    if(result.error)
      throw new Error(result.error.short)
    if(result.outputWithoutReadline !== expected)
      throw new Error('Du måste returnera `true` ifall värdet i parametern\när större än eller likamed 0.');
  });

  testOutput({
    title: 'Skriver ut rätt output för negativa tal',
    code: data.code,
    expected: 'Talet är negativt.',
    inputs: [{value: '-1'}],
    ignoreReadlineOutput: true
  });
  
  testOutput({
    title: 'Skriver ut rätt output för talet 0',
    code: data.code,
    expected: 'Talet är positivt.',
    inputs: [{value: '0'}],
    ignoreReadlineOutput: true
  });
  
  testOutput({
    title: 'Skriver ut rätt output för positiva tal',
    code: data.code,
    expected: 'Talet är positivt.',
    inputs: [{value: '1'}],
    ignoreReadlineOutput: true
  });
});
