export default function render(Nodes = [], root = document.createElement('div')) {
    if (!Nodes.length) return root;

    for (let node of Nodes) {
        let { type, props, children } = node;
        let element = document.createElement(type);

        for (const [key, value] of Object.entries(props)) {
            element.setAttribute(key, value);
        }

        if (children.length) {
            for (let i = 0; i < children.length; i++) {
                if (typeof children[i] === 'string') {
                    element.textContent += children[i];
                }
                else {
                    render(children.slice(i), element)
                    break;
                }
            }
        }
        root.append(element)
    }
    return root;
}