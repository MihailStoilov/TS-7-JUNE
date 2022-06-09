class ChatManager {
    constructor() {
        this._allmessages = [];
    }
    message(msg) {
        return this._allmessages.push(msg);
    }
    showAllMessage() {
        return this._allmessages;
    }
    clearAllMessages() {
        return (this._allmessages = []);
    }
    oldMessages() {
        return this._allmessages.slice().reverse();
    }
}
export default ChatManager;
