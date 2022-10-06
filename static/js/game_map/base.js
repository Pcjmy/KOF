import { AcGameObject } from '/static/js/ac_game_object/base.js';


export class GameMap extends AcGameObject {
    constructor(root) {
        super();

        this.root = root;
        this.$canvas = $('<canvas width="1280px" height="720px" tabindex=0></canvas>');
        this.ctx = this.$canvas[0].getContext('2d');
        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();
    }

    start() {

    }

    update() {
        this.render();
    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // console.log(this.ctx.canvas.width, this.ctx.canvas.height)
    }
}
