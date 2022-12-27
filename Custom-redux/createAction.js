export default class action {
    constructor(type = '', payload = {}) {
        this.type = type;
        this.payload = payload;
    }
}