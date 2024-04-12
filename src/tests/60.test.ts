import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getFunctionDeclarations from "./utils/get-function-declarations";
import testOutput from "./utils/test-output";
import { runCode } from "../utils/run-code";
import { generateRandomNumber } from "../utils/random";

describe('60', function() {
  const data = getStudentfileInfo();

  test('Deklarera funktionen `average`', () => {
    const declarations = getFunctionDeclarations(data.ast);
    
    if(declarations.size < 1)
      throw new Error('Du måste deklarera en funktion.');
    if(declarations.size > 1)
      throw new Error('Du skall endast deklarera en funktion.');
    
    const target = declarations.get('average');
    if(!target || target.length < 1) {
      const [key] = declarations.entries().next().value;
      throw new Error('Du måste deklarera en funktion med namnet `average`.\nDu har deklarerat en funktion med namnet `'+key+'`.');
    }

    if(target.length > 1)
      throw new Error('Du skall endast deklarera en funktion med namnet `average`.');

    if(target[0].params.length !== 3)
      throw new Error('Du måste deklarera `average` med 3 parameter.');
  });

  test('Returnera medelvärdet av parametrarna', () => {
    const regex = /console.log\(.*\)/g;
    const values = Array.from({length:10}).map(() => [generateRandomNumber(-100, 100),generateRandomNumber(-100, 100),generateRandomNumber(-100, 100)]);
    const code = data.code.replace(regex, '') + `
      ${values.map(v => `console.log(average(${v[0]},${v[1]},${v[2]}))`).join('\n')}
    `;
    const expected = values.map(v => (v[0]+v[1]+v[2])/3).join('\n');
    const result = runCode(code, '');
    if(result.error)
      throw new Error(result.error.short);
    if(result.outputWithoutReadline !== expected)
      throw new Error('Du måste returnera medelvärdet av parametrarna.');
  });

  testOutput({
    code: data.code,
    expected: '2\n30\n11',
  });
});
