import { AssignmentExpression, Node, VariableDeclarator } from "acorn";
import astTraverse from "./acorn-utils";

export default function getVariableAssignments(ast: Node|Node[], includeInitialAssignment: boolean = false) {

  const assignments: Map<string, AssignmentExpression[]> = new Map();

  astTraverse(ast, node => {
    if(node.type === 'VariableDeclarator' && includeInitialAssignment) {
      const declarator = node as VariableDeclarator;
      if(declarator.id.type !== 'Identifier')
        return;

      if(!declarator.init)
        return;

      const declaratorName = declarator.id.name;
      
      if(!assignments.has(declaratorName))
        assignments.set(declaratorName, []);

      assignments.get(declaratorName)!.push({
        type: 'AssignmentExpression',
        left: declarator.id,
        right: declarator.init,
        operator: '=',
        start: declarator.start,
        end: declarator.end
      });

      return;
    }

    if(node.type !== 'AssignmentExpression')
      return;
    const n = node as AssignmentExpression;
    if(n.left.type !== 'Identifier')
      return;
    
    const name = n.left.name;

    if(!assignments.has(name))
      assignments.set(name, []);

    assignments.get(name)!.push(n);
  });

  return assignments;

}
