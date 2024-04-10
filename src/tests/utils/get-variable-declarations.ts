import { Node, VariableDeclaration, VariableDeclarator } from "acorn";
import astTraverse from "./acorn-utils";

export type VariableDeclaratorWithKind = VariableDeclarator & {
  kind: 'var'|'let'|'const'
};

export default function getVariableDeclarations(ast: Node|Node[]) {

  const variables: Map<string, VariableDeclaratorWithKind[]> = new Map();

  astTraverse(ast, node => {
    if(node.type !== 'VariableDeclaration')
      return;

    const declarations = node as VariableDeclaration;
    
    for(let i = 0; i < declarations.declarations.length; i++) {
      const declarator = declarations.declarations[i];
      if(declarator.id.type !== 'Identifier') // <- TODO: Allow more declarator id types
        return;

      const name = declarator.id.name;

      if(!variables.has(name))
        variables.set(name, []);

      variables.get(name)?.push({
        ...declarator,
        kind: declarations.kind
      }); 
    }
  });

  return variables;

}
