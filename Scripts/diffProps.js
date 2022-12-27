export default function diffProps(el1 = document.createElement('div'), el2 = document.createElement('div')) {
    if (el1.tagName !== el2.tagName) return el2;
    let props1 = el1.getAttributeNames();
    let values = props1.map((i) => {
        return el1.getAttribute(i);
    });

    let props2 = el2.getAttributeNames()
    let values2 = props2.map((i) => {
        return el2.getAttribute(i);
    });

    for (let i = 0; i < Math.max(props1.length, props2.length); i++) {
        let key1 = props1[i];
        let key2 = props2[i];
        let value1 = values[i];
        let value2 = values2[i];

        if (!props2.includes(key1) && key1) {
            el1.removeAttribute(key1);
        }

        if (!props1.includes(key2) && key2) {
            el1.setAttribute(key2, value2);
        }

        else if (key2) {
            if (value1 !== value2) {
                el1.setAttribute(key2, value2);
            }
        }
    }
    if (el1.textContent !== el2.textContent) {
        if (el2.innerHTML.indexOf('<') !== -1) {
            el1.textContent = el2.innerHTML.slice(0, el2.innerHTML.indexOf('<'))
        }
        else {
            el1.textContent = el2.textContent;
        }
    }

    return el1;
}

