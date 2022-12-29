import diffProps from "./diffProps"
import reformElement from "./reformElement";
import createCopyElement from "./createCopyElement";
import { isEqual } from "./isEqual";

export default function deepDiff(node = document.createElement('div'), targetNode = document.createElement('div')) {
    
      let events = ['onclick', 'onchange'];

    if (!isEqual(node, targetNode)) {
        node.replaceWith(diffProps(node, targetNode))
    }

    if (node.children.length && targetNode.children.length) {
        node = reformElement(node, targetNode);
    }

    if (!node.children.length && targetNode.children.length) {
        for (let childNode of targetNode.children) {
            let newNode = createCopyElement(childNode);
            node.appendChild(newNode)
        }
    }

    if (!targetNode.children.length && node.children.length) {
       for (let childNode of node.children) {
            for (let event of events) {
                if (childNode[event]) {
                    let simplified = event.slice(2)
                    childNode.removeEventListener(simplified, childNode[event]);
                }
            }
            node.removeChild(childNode);
        }
    }

    return node;
}
