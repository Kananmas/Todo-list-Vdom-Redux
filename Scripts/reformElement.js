import deepDiff from "./deepDiff";
import { isEqual } from "./isEqual";
import diffProps from "./diffProps";
import createCopyElement from "./createCopyElement";

export default function reformElement(node = document.createElement('div'), targetNode = document.createElement('div')) {
    let childrenOfNode = node.children;
    let childrenOfTargetNode = targetNode.children;
    let maxLen = Math.max(childrenOfNode.length, childrenOfTargetNode.length)

    for (let i = 0; i < maxLen; i++) {
        if (!childrenOfNode[i] && childrenOfTargetNode[i]) {
            let newChild = createCopyElement(childrenOfTargetNode[i]);
            node.appendChild(newChild);
        }
        if (childrenOfTargetNode[i]) {
            if (!childrenOfTargetNode[i].children.length) {

                if (!isEqual(childrenOfNode[i], childrenOfTargetNode[i])) {
                    childrenOfNode[i] = (diffProps(childrenOfNode[i], childrenOfTargetNode[i]))
                }

            }
            if (childrenOfTargetNode[i].children.length || childrenOfNode[i].children.length) {
                childrenOfNode[i] = deepDiff(childrenOfNode[i], childrenOfTargetNode[i])
            }
        }
        else {
            if (childrenOfNode[i] && !childrenOfTargetNode[i]) {
                node.removeChild(childrenOfNode[i])
            }
        }
    }
    return node;
}
