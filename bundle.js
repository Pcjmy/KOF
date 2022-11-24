(function (exports, base_js, kyo_js) {
    'use strict';

    class KOF {
        constructor(id) {
            // jQuery实例
            this.$kof = $('#' + id);
            // 游戏背景
            this.game_map = new base_js.GameMap(this);
            // 游戏玩家
            this.players = [
                new kyo_js.Kyo(this, {
                    id: 0,
                    x: 200,
                    y: 0,
                    width: 120,
                    height: 200,
                    color: 'blue',
                }),
                new kyo_js.Kyo(this, {
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

    exports.KOF = KOF;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, base_js, kyo_js);
