import { CallExpression, Identifier, MemberExpression, Node } from "acorn";
import astTraverse from "./acorn-utils";

export default function getFunctionCalls(ast: Node|Node[]) {

  const calls: Map<string, CallExpression[]> = new Map();

  astTraverse(ast, node => {
    if(node.type !== 'CallExpression')
      return;
    const call = node as CallExpression;
    const name = buildCalleeName(call.callee);

    if(!calls.has(name))
      calls.set(name, []);

    calls.get(name)?.push(call);
  });

  return calls;
}

function buildCalleeName(node: Node): string {
  if(node.type === 'Identifier')
    return (node as Identifier).name;
  if(node.type === 'MemberExpression')
    return buildCalleeName((node as MemberExpression).object) + '.' + buildCalleeName((node as MemberExpression).property);
  return '';
}
