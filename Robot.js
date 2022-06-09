class Robot {
    constructor(name, type, color, jump, blink, talk) {
        this._name = name;
        this._type = type;
        this._color = color;
        this._jump = jump;
        this._blink = blink;
        this._talk = talk;
        this._messages = [];
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get color() {
        return this._color;
    }
    get jump() {
        return this._jump;
    }
    get blink() {
        return this._blink;
    }
    get talk() {
        return this._talk;
    }
    message(msg) {
        this._messages.push(msg);
    }
    getOldestMessages() {
        return this._messages;
    }
    getNewestMessages() {
        return this._messages.slice().reverse();
    }
}
export default Robot;
