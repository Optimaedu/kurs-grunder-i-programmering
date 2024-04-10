import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getFunctionDeclarations from "./utils/get-function-declarations";
import testOutput from "./utils/test-output";
import { generateRandomNumber } from "../utils/random";
import { runCode } from "../utils/run-code";

describe('56', function() {
  const data = getStudentfileInfo();

  test('Deklarera funktionen `sum` med 2 parametrar', () => {
    const declarations = getFunctionDeclarations(data.ast);
    
    if(declarations.size < 1)
      throw new Error('Du måste deklarera en funktion.');
    if(declarations.size > 1)
      throw new Error('Du skall endast deklarera en funktion.');
    
    const target = declarations.get('sum');
    if(!target || target.length < 1) {
      const [key] = declarations.entries().next().value;
      throw new Error('Du måste deklarera en funktion med namnet `sum`.\nDu har deklarerat en funktion med namnet `'+key+'`.');
    }

    if(target.length > 1)
      throw new Error('Du skall endast deklarera en funktion med namnet `sum`.');

    if(target[0].params.length !== 2)
      throw new Error('Du måste deklarera `sum` med 2 parametrar.');
  });

  test('Returnera summan av parametrarna från funktionen `sum`', () => {
    const regex = /console.log\(.*\)/gm;
    const values = Array.from({length: 3}).map(v => [generateRandomNumber(100,999),generateRandomNumber(100,999)]);
    const code = `${data.code.replace(regex, '')}
      ${values.map(v => `console.log(sum(${v[0]},${v[1]}))`).join('\n')}
    `;
    const result = runCode(code, '');
    if(result.error)
      throw new Error(result.error.short);
    const expected = values.map(v => v[0] + v[1]).join('\n');
    if(result.output !== expected)
      throw new Error('Du måste returnera summan av parametrarna från funktionen `sum`.');
  });

  testOutput({
    code: data.code,
    expected: '8\n55\n3'
  });
});
