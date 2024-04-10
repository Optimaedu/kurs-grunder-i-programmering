import { BinaryExpression, Identifier, Literal, Node } from "acorn";

export default function astTraverse(node: Node|Node[], callback: (node: Node) => void) {
  if(!node) {
    return;
  }

  if(Array.isArray(node)) {
    for(let i = 0; i < node.length; i++) {
      astTraverse(node[i], callback);
    }
    return;
  }

  callback(node);

  // Continue with children..

  if(typeof node !== 'object')
    return;

  if(('body' in node))
    astTraverse(node.body as any, callback);
  if(('params' in node))
    astTraverse(node.params as any, callback);
  if(('expression' in node))
    astTraverse(node.expression as any, callback);
  if(('object' in node))
    astTraverse(node.object as any, callback);
  if(('argument' in node))
    astTraverse(node.argument as any, callback);
  if(('label' in node))
    astTraverse(node.label as any, callback);
  if(('consequent' in node))
    astTraverse(node.consequent as any, callback);
  if(('alternate' in node))
    astTraverse(node.alternate as any, callback);
  if(('discriminant' in node))
    astTraverse(node.discriminant as any, callback);
  if(('discriminant' in node))
    astTraverse(node.discriminant as any, callback);
  if(('cases' in node))
    astTraverse(node.cases as any, callback);
  if(('test' in node))
    astTraverse(node.test as any, callback);
  if(('block' in node))
    astTraverse(node.block as any, callback);
  if(('handler' in node))
    astTraverse(node.handler as any, callback);
  if(('finalizer' in node))
    astTraverse(node.finalizer as any, callback);
  if(('param' in node))
    astTraverse(node.param as any, callback);
  if(('init' in node))
    astTraverse(node.init as any, callback);
  if(('update' in node))
    astTraverse(node.update as any, callback);
  if(('left' in node))
    astTraverse(node.left as any, callback);
  if(('right' in node))
    astTraverse(node.right as any, callback);
  if(('declarations' in node))
    astTraverse(node.declarations as any, callback);
  if(('elements' in node))
    astTraverse(node.elements as any, callback);
  if(('properties' in node))
    astTraverse(node.properties as any, callback);
  if(('key' in node))
    astTraverse(node.key as any, callback);
  if(('value' in node))
    astTraverse(node.value as any, callback);
  if(('property' in node))
    astTraverse(node.property as any, callback);
  if(('callee' in node))
    astTraverse(node.callee as any, callback);
  if(('arguments' in node))
    astTraverse(node.arguments as any, callback);
  if(('expressions' in node))
    astTraverse(node.expressions as any, callback);
  if(('quasis' in node))
    astTraverse(node.quasis as any, callback);
  if(('quasi' in node))
    astTraverse(node.quasi as any, callback);
  if(('tag' in node))
    astTraverse(node.tag as any, callback);
  if(('superClass' in node))
    astTraverse(node.superClass as any, callback);
  if(('id' in node))
    astTraverse(node.id as any, callback);
  if(('meta' in node))
    astTraverse(node.meta as any, callback);
  if(('specifiers' in node))
    astTraverse(node.specifiers as any, callback);
  if(('source' in node))
    astTraverse(node.source as any, callback);
  if(('imported' in node))
    astTraverse(node.imported as any, callback);
  if(('local' in node))
    astTraverse(node.local as any, callback);
  if(('declaration' in node))
    astTraverse(node.declaration as any, callback);
  if(('exported' in node))
    astTraverse(node.exported as any, callback);
}

export function nodeToLiteralNumber(node: Node|null|undefined): number {
  if(!node)
    return NaN;
  if(node.type !== 'Literal')
    return NaN;
  const n = node as Literal;
  if(!n.value || typeof n.value !== 'number')
    return NaN
  return n.value;
}

export function nodeToLiteralString(node: Node|null|undefined): string|undefined {
  if(!node)
    return undefined;
  if(node.type !== 'Literal')
    return undefined;
  const n = node as Literal;
  if(!n.value || typeof n.value !== 'string')
    return undefined;
  return n.value;
}

export function nodeToIdentifierName(node: Node|null|undefined): string|undefined {
  if(!node)
    return undefined;
  if(node.type !== 'Identifier')
    return undefined;
  const n = node as Identifier;
  return n.name;
}

export function nodeToBinaryExpression(node: Node|null|undefined): BinaryExpression|undefined {
  if(!node)
    return undefined;
  if(node.type !== 'BinaryExpression')
    return undefined;
  const n = node as BinaryExpression;
  return n;
}
