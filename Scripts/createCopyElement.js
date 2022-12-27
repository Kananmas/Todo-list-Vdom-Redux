export default function createCopyElement(el = document.createElement('div')) {
    let copyEl = document.createElement(el.tagName);
    let properties = el.getAttributeNames().map((i) => {
        return [i, el.getAttribute(i)];
    })

    for (const [key, value] of properties) {
        copyEl.setAttribute(key, value);
    }

    if (el.innerHTML.indexOf('<') !== -1) { copyEl.textContent = el.innerHTML.slice(9, el.innerHTML.indexOf('<')); }
    else {
        copyEl.textContent = el.textContent
    }

    return copyEl;
}