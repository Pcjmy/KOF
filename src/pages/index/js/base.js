import { GameMap } from '/src/pages/index/js/game_map/base.js';
import { Kyo } from '/src/pages/index/js/player/kyo.js';

class KOF {
    constructor(id) {
        // jQuery实例
        this.$kof = $('#' + id);
        // 游戏背景
        this.game_map = new GameMap(this);
        // 游戏玩家
        this.players = [
            new Kyo(this, {
                id: 0,
                x: 200,
                y: 0,
                width: 120,
                height: 200,
                color: 'blue',
            }),
            new Kyo(this, {
                id: 1,
                x: 900,
                y: 0,
                width: 120,
                height: 200,
                color: 'red',
            }),
        ];
    }
}

let kof = new KOF('kof');

export {
    KOF
}
