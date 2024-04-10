import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import getFunctionDeclarations from "./utils/get-function-declarations";
import testOutput from "./utils/test-output";
import { runCode } from "../utils/run-code";
import { generateRandomNumber } from "../utils/random";

describe('59', function() {
  const data = getStudentfileInfo();

  test('Deklarera funktionen `celsiusToFahrenheit`', () => {
    const declarations = getFunctionDeclarations(data.ast);
    
    if(declarations.size < 1)
      throw new Error('Du måste deklarera en funktion.');
    if(declarations.size > 1)
      throw new Error('Du skall endast deklarera en funktion.');
    
    const target = declarations.get('celsiusToFahrenheit');
    if(!target || target.length < 1) {
      const [key] = declarations.entries().next().value;
      throw new Error('Du måste deklarera en funktion med namnet `celsiusToFahrenheit`.\nDu har deklarerat en funktion med namnet `'+key+'`.');
    }

    if(target.length > 1)
      throw new Error('Du skall endast deklarera en funktion med namnet `celsiusToFahrenheit`.');

    if(target[0].params.length !== 1)
      throw new Error('Du måste deklarera `celsiusToFahrenheit` med 1 parameter.');
  });

  test('Omvandla Celsius till Fahrenheit of returnera värdet', () => {
    const regex = /console.log\(.*\)/g;
    const values = Array.from({length:10}).map(() => generateRandomNumber(-100, 100));
    const code = data.code.replace(regex, '') + `
      ${values.map(v => `console.log(celsiusToFahrenheit(${v}))`).join('\n')}
    `;
    const expected = values.map(v => (v*9/5)+32).join('\n');
    const result = runCode(code, '');
    if(result.error)
      throw new Error(result.error.short);
    if(result.outputWithoutReadline !== expected)
      throw new Error('Du måste omvandla parametern (temperatur i Celsius)\noch returnera temperaturen i Fahrenheit.');
  });

  testOutput({
    code: data.code,
    expected: '68\n5',
  });
});
