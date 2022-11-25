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
        // {
        //     let gif = GIF();
        //     let url0=require('/src/pages/index/images/player/kyo/0.gif');
        //     gif.load(url0);
        //     this.animations.set(0, {
        //         gif: gif,
        //         frame_cnt: 0,  // 总图片数
        //         frame_rate: 5,  // 每5帧过度一次
        //         offset_y: offsets[0],  // y方向偏移量
        //         loaded: false,  // 是否加载完成
        //         scale: 2,  // 放大多少倍
        //     });
        //     gif.onload = function () {
        //         let obj = outer.animations.get(0);
        //         obj.frame_cnt = gif.frames.length;
        //         obj.loaded = true;
        //     }
        // }

        // {
        //     let gif = GIF();
        //     gif.load('/src/pages/index/images/player/kyo/1.gif');
        //     this.animations.set(1, {
        //         gif: gif,
        //         frame_cnt: 0,  // 总图片数
        //         frame_rate: 5,  // 每5帧过度一次
        //         offset_y: offsets[1],  // y方向偏移量
        //         loaded: false,  // 是否加载完成
        //         scale: 2,  // 放大多少倍
        //     });
        //     gif.onload = function () {
        //         let obj = outer.animations.get(1);
        //         obj.frame_cnt = gif.frames.length;
        //         obj.loaded = true;
        //     }
        // }

        // {
        //     let gif = GIF();
        //     gif.load('/src/pages/index/images/player/kyo/2.gif');
        //     this.animations.set(2, {
        //         gif: gif,
        //         frame_cnt: 0,  // 总图片数
        //         frame_rate: 5,  // 每5帧过度一次
        //         offset_y: offsets[2],  // y方向偏移量
        //         loaded: false,  // 是否加载完成
        //         scale: 2,  // 放大多少倍
        //     });
        //     gif.onload = function () {
        //         let obj = outer.animations.get(2);
        //         obj.frame_cnt = gif.frames.length;
        //         obj.loaded = true;
        //     }
        // }

        // {
        //     let gif = GIF();
        //     gif.load('/src/pages/index/images/player/kyo/3.gif');
        //     this.animations.set(3, {
        //         gif: gif,
        //         frame_cnt: 0,  // 总图片数
        //         frame_rate: 5,  // 每5帧过度一次
        //         offset_y: offsets[3],  // y方向偏移量
        //         loaded: false,  // 是否加载完成
        //         scale: 2,  // 放大多少倍
        //     });
        //     gif.onload = function () {
        //         let obj = outer.animations.get(3);
        //         obj.frame_cnt = gif.frames.length;
        //         obj.loaded = true;
        //         obj.frame_rate = 4;
        //     }
        // }

        // {
        //     let gif = GIF();
        //     gif.load('/src/pages/index/images/player/kyo/4.gif');
        //     this.animations.set(4, {
        //         gif: gif,
        //         frame_cnt: 0,  // 总图片数
        //         frame_rate: 5,  // 每5帧过度一次
        //         offset_y: offsets[4],  // y方向偏移量
        //         loaded: false,  // 是否加载完成
        //         scale: 2,  // 放大多少倍
        //     });
        //     gif.onload = function () {
        //         let obj = outer.animations.get(4);
        //         obj.frame_cnt = gif.frames.length;
        //         obj.loaded = true;
        //     }
        // }

        // {
        //     let gif = GIF();
        //     gif.load('/src/pages/index/images/player/kyo/5.gif');
        //     this.animations.set(5, {
        //         gif: gif,
        //         frame_cnt: 0,  // 总图片数
        //         frame_rate: 5,  // 每5帧过度一次
        //         offset_y: offsets[5],  // y方向偏移量
        //         loaded: false,  // 是否加载完成
        //         scale: 2,  // 放大多少倍
        //     });
        //     gif.onload = function () {
        //         let obj = outer.animations.get(5);
        //         obj.frame_cnt = gif.frames.length;
        //         obj.loaded = true;
        //     }
        // }

        // {
        //     let gif = GIF();
        //     gif.load('/src/pages/index/images/player/kyo/6.gif');
        //     this.animations.set(6, {
        //         gif: gif,
        //         frame_cnt: 0,  // 总图片数
        //         frame_rate: 5,  // 每5帧过度一次
        //         offset_y: offsets[6],  // y方向偏移量
        //         loaded: false,  // 是否加载完成
        //         scale: 2,  // 放大多少倍
        //     });

        //     gif.onload = function () {
        //         let obj = outer.animations.get(6);
        //         obj.frame_cnt = gif.frames.length;
        //         obj.loaded = true;
        //     }
        // }
    }
}