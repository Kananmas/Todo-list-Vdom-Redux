export function isEqual(el1 = document.createElement('div'), el2 = document.createElement('div')) {
    if (el1.tagName !== el2.tagName) return false;
    if (!compareTextContents(el1.innerHTML, el2.innerHTML)) return false;

    let el1PropertyNames = el1.getAttributeNames();
    let el2PropertyNames = el2.getAttributeNames();

    if (el1PropertyNames.length !== el2PropertyNames.length) return false;

    let valuesOfel1 = el1PropertyNames.map((i) => {
        return el1.getAttribute(i);
    })
    let valuesOfel2 = el2PropertyNames.map((i) => {
        return el2.getAttribute(i);
    })

    for (let i = 0; i < valuesOfel1.length; i++) {
        if (!valuesOfel1.includes(valuesOfel2[i]) || !valuesOfel2.includes(valuesOfel1[i])) return false;
        if (!el1PropertyNames.includes(el2PropertyNames[i]) || !el2PropertyNames.includes(el1PropertyNames[i])) return false;
    }
    return true;
}

function compareTextContents(s1, s2) {
    let tillFirstTagS1 = s1.indexOf('<');
    let tillFirstTagS2 = s2.indexOf('<');

    let sliceS1 = tillFirstTagS1 > -1 ? s1.slice(0, tillFirstTagS1) : s1;
    let sliceS2 = tillFirstTagS2 > -1 ? s2.slice(0, tillFirstTagS2) : s2;

    return sliceS1 === sliceS2;
}