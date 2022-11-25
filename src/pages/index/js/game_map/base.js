import { AcGameObject } from '/src/pages/index/js/ac_game_object/base.js';
import { Controller } from '/src/pages/index/js/controller/base.js';

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

        this.time_left = 90000;  // 单局比赛时间, 单位：毫秒
        this.$timer = this.root.$kof.find(".kof-head-timer");
    }

    start() {

    }

    update() {
        // 更新剩余时间
        this.time_left -= this.timedelta;
        if (this.time_left < 0) {
            this.time_left = 0;
            let [player1, player2] = this.root.players;
            player1.vx = player2.vx = 0;
        }
        // 显示时间取整数部分
        this.$timer.text(parseInt(this.time_left / 1000));

        this.render();
        let [player1, player2] = this.root.players;
        if (player1.status===6||player2.status===6||this.time_left===0) {
            this.time_left=0;
            this.controller.ban();
            this.draw();
        }
        if (this.time_left > 85*1000) {
            this.hint();
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

    hint() {
        this.ctx.font = "45px serif";
        this.ctx.fillStyle = "aqua";
        this.ctx.fillText('玩家一 移动：W A S D  攻击：空格',300,200);
        this.ctx.fillText('玩家二 移动：↑←↓→ 攻击：1',300,270);
    }
}
