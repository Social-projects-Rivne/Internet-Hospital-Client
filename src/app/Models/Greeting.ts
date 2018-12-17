export class Greeting {
    greeting: TextWithPositon;
    aboutSite: TextWithPositon;
    aboutUsers: TextWithPositon;
    imageUrl: string;
}

export class TextWithPositon {
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
