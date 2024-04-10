import { Node, ForStatement } from "acorn";
import astTraverse from "./acorn-utils";

export default function getForStatements(ast: Node|Node[]) {

  const statements: ForStatement[] = [];

  astTraverse(ast, node => {
    if(node.type !== 'ForStatement')
      return;
    
    const n = node as ForStatement;

    statements.push(n);
  });

  return statements;
}
