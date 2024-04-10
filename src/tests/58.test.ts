import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getFunctionDeclarations from "./utils/get-function-declarations";
import testOutput from "./utils/test-output";
import { runCode } from "../utils/run-code";
import { generateRandomNumber } from "../utils/random";

describe('58', function() {
  const data = getStudentfileInfo();

  test('Deklarera funktionen `max` med två parameter', () => {
    const declarations = getFunctionDeclarations(data.ast);
    
    if(declarations.size < 1)
      throw new Error('Du måste deklarera en funktion.');
    if(declarations.size > 1)
      throw new Error('Du skall endast deklarera en funktion.');
    
    const target = declarations.get('max');
    if(!target || target.length < 1) {
      const [key] = declarations.entries().next().value;
      throw new Error('Du måste deklarera en funktion med namnet `max`.\nDu har deklarerat en funktion med namnet `'+key+'`.');
    }

    if(target.length > 1)
      throw new Error('Du skall endast deklarera en funktion med namnet `max`.');

    if(target[0].params.length !== 2)
      throw new Error('Du måste deklarera `max` med 2 parameter.');
  });

  test('Returnera det större av de 2 parametrarna', () => {
    const regex = /console.log\(.*\)/g;
    const values = Array.from({length:10}).map(() => [generateRandomNumber(-100, 100),generateRandomNumber(-100, 100)]);
    values[0] = [0, 0];
    const code = data.code.replace(regex, '') + `
      ${values.map(v => `console.log(max(${v[0]},${v[1]}))`).join('\n')}
    `;
    const expected = values.map(v => Math.max(v[0], v[1])).join('\n');
    const result = runCode(code, '');
    if(result.error)
      throw new Error(result.error.short);
    if(result.outputWithoutReadline !== expected)
      throw new Error('Du måste returnera den större av de två parametrarna.');
  });

  testOutput({
    code: data.code,
    expected: '8\n9',
  });
});
