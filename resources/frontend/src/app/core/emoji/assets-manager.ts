export class AssetsManager {
    emojiSprites: any[];
    p5: any;

    constructor(p5) {
        this.p5 = p5;
    }

    loadAllAssets() {
        if (!this.emojiSprites) {
            const emojis = ['heart', 'smile', 'praise', 'perfect' , 'clap', 'star'];

            this.emojiSprites = emojis.map((emoji) =>
                this.p5.loadImage(`/assets/images/emojis/${emoji}.png`)
            );
        }
    }
}
