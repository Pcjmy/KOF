import { AcGameObject } from '/static/js/ac_game_object/base.js';
import { Controller } from '/static/js/controller/base.js';

export class GameMap extends AcGameObject {
    constructor(root) {
        super();

        this.root = root;
        this.$canvas = $('<canvas width="1280" height="720" tabindex=0></canvas>');
        this.ctx = this.$canvas[0].getContext('2d');
        this.root.$kof.append(this.$canvas);
        // 获得键盘焦点
        this.$canvas.focus();
        this.controller = new Controller(this.$canvas);
        this.root.$kof.append($(`<div class="kof-head">
            <div class="kof-head-hp-0"><div><div></div></div></div>
            <div class="kof-head-timer">60</div>
            <div class="kof-head-hp-1"><div><div></div></div></div>
        </div>`));

        this.time_left = 90000;  // 单局比赛时间，单位：毫秒
        this.$timer = this.root.$kof.find(".kof-head-timer");
    }

    start() {

    }

    update() {
        this.time_left -= this.timedelta;
        if (this.time_left < 0) {
            this.time_left = 0;
            let [player1, player2] = this.root.players;
            player1.vx = player2.vx = 0;
        }

        this.$timer.text(parseInt(this.time_left / 1000));

        this.render();
        let [player1, player2] = this.root.players;
        if(player1.status===6||player2.status===6||this.time_left===0) {
            this.time_left=0;
            this.controller.ban();
            this.draw();
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    draw() {
        this.root.$kof.css({
            background: "#000",
            opacity: 0.8,
        });
        this.ctx.font = "70px serif";
        this.ctx.fillStyle = "red";
        this.ctx.fillText('GAME OVER',480,270);
    }
}
