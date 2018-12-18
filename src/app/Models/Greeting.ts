export class Greeting {
    greeting: TextWithPosition;
    aboutSite: TextWithPosition;
    aboutUsers: TextWithPosition;
    registerButton: ButtonPosition;
    imageUrl: string;
}

export class TextWithPosition {
    text: string;
    top: number;
    left: number;
    right: number;
    bottom: number;

    constructor(text: string, top: number, right: number, bottom: number, left: number) {
        this.bottom = bottom;
        this.left = left;
        this.top = top;
        this.right = right;
        this.text = text;
    }
}

export class ButtonPosition {
    top: number;
    left: number;
    right: number;
    bottom: number;

    constructor(top: number, right: number, bottom: number, left: number) {
        this.bottom = bottom;
        this.left = left;
        this.top = top;
        this.right = right;
    }
}
