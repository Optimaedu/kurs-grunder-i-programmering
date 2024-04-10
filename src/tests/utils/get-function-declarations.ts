import { FunctionDeclaration, Node } from "acorn";
import astTraverse from "./acorn-utils";

export default function getFunctionDeclarations(ast: Node|Node[]) {

  const functions: Map<string, FunctionDeclaration[]> = new Map();

  astTraverse(ast, node => {
    if(node.type !== 'FunctionDeclaration')
      return;
    
    const n = node as FunctionDeclaration;
    
    if(!n.id || n.id.type !== 'Identifier')
      return;

    const name = n.id.name;

    if(!functions.has(name))
      functions.set(name, []);

    functions.get(name)!.push(n);
  });

  return functions;
}
