import { Player } from '/src/pages/index/js/player/base.js';
import { GIF } from '/src/pages/index/js/utils/gif.js';

export class Kyo extends Player {
    constructor(root, info) {
        super(root, info);
        this.init_animations();
    }

    init_animations() { // 初始化动画
        let outer = this;
        // 偏移量, 不同动画高度不一样, 需要一个偏移量
        let offsets = [0, -22, -22, -140, 0, 0, 0];
        for (let i = 0; i < 7; i++) {
            let gif = GIF();
            let url=require(`/src/pages/index/images/player/kyo/${i}.gif`);
            gif.load(url);
            this.animations.set(i, {
                gif: gif,
                frame_cnt: 0,  // 总图片数
                frame_rate: 5,  // 每5帧过度一次
                offset_y: offsets[i],  // y方向偏移量
                loaded: false,  // 是否加载完成
                scale: 2,  // 放大多少倍
            });

            gif.onload = function () {
                let obj = outer.animations.get(i);
                obj.frame_cnt = gif.frames.length;
                obj.loaded = true;
                
                if (i === 3) {
                    obj.frame_rate = 4;
                }
            }
        }
    }
}