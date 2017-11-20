export class Message {
    public content: string;
    public isFromMe: boolean;

    constructor(content: string, sendByMe: boolean) {
        this.content = content;
        this.isFromMe = sendByMe;
    }
}