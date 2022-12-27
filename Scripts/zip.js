export default function zip(a1 = [], a2 = []) {
    let result = [];
    for (let i = 0; i < Math.max(a1.length, a2.length); i++) {
        result.push([a1[i], a2[i]]);
    }
    return result;
}