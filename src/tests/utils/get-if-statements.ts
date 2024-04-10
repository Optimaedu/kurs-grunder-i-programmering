import { IfStatement, Node, Statement } from "acorn";
import astTraverse from "./acorn-utils";

export default function getIfStatements(ast: Node|Node[]) {

  const statements: IfStatement[] = [];

  astTraverse(ast, node => {
    if(node.type !== 'IfStatement')
      return;
    
    const n = node as IfStatement;
    for(let i = 0; i < statements.length; i++) {
      if(isElseIf(n, statements[i]))
        return;
    }

    statements.push(n);
  });

  return statements;
}

function isElseIf(check: IfStatement, node?: Statement | null | undefined) {
  if(!node || node.type !== 'IfStatement')
    return false;
  if(check === node)
    return true;
  return isElseIf(check, node.alternate);
}
