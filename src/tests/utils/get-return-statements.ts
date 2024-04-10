import { Node, ReturnStatement } from "acorn";
import astTraverse from "./acorn-utils";

export default function getReturnStatements(ast: Node|Node[]) {

  const statements: ReturnStatement[] = [];

  astTraverse(ast, node => {
    if(node.type !== 'ReturnStatement')
      return;
    
    const n = node as ReturnStatement;
    statements.push(n);
  });

  return statements;
}
