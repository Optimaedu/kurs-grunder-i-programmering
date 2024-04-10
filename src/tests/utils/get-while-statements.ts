import { Node, WhileStatement } from "acorn";
import astTraverse from "./acorn-utils";

export default function getWhileStatements(ast: Node|Node[]) {

  const statements: WhileStatement[] = [];

  astTraverse(ast, node => {
    if(node.type !== 'WhileStatement')
      return;
    
    const n = node as WhileStatement;

    statements.push(n);
  });

  return statements;
}
