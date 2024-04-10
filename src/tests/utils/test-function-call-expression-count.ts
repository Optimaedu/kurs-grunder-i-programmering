import { Node } from "acorn";
import getFunctionCalls from "./get-function-calls";
import { test } from "mocha";

type TestFunctionCallExpressionCountOptions = {
  title?: string,
  ast: Node|Node[],
  callee: string,
  min?: number,
  max?: number
}

export default function testFunctionCallExpressionCount(options: TestFunctionCallExpressionCountOptions) {
  test(options.title||`Kalla på funktionen \`${options.callee}()\``, () => {
    const calls = getFunctionCalls(options.ast).get(options.callee);
    const count = calls ? calls.length : 0;
    if(typeof options.min !== 'undefined' && count < options.min) {
      throw new Error(
        `Du måste kalla på \`${options.callee}()\` ${options.min} ${options.min === 1 ? 'gång' : 'gånger'}.\nDu kallade på den ${count} ${count === 1 ? 'gång' : 'gånger'}.`
      );
    }
    if(typeof options.max !== 'undefined' && count > options.max) {
      throw new Error(
        `Du skall kalla på \`${options.callee}()\` endast ${options.max} ${options.max === 1 ? 'gång' : 'gånger'}.\nDu kallade på den ${count} ${count === 1 ? 'gång' : 'gånger'}.`
        );
    }
  });
}
