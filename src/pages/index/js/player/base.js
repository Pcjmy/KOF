import { AcGameObject } from '/src/pages/index/js/ac_game_object/base.js';

export class Player extends AcGameObject {
    constructor(root, info) {
        super();

        this.root = root;
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;

        // 面朝方向, 1: 右, 0: 左
        this.direction = 1;
        // 水平方向速度
        this.vx = 0;
        // 竖直方向速度
        this.vy = 0;
        // 水平移动速度
        this.speedx = 400;
        // 跳起的初始速度
        this.speedy = -1000;
        // 重力加速度
        this.gravity = 50;

        this.ctx = this.root.game_map.ctx;
        this.pressed_keys = this.root.game_map.controller.pressed_keys;
        // 0: idle, 1: 向前, 2：向后/防御, 3：跳跃, 4：攻击, 5：被打, 6：死亡
        this.status = 3;
        this.animations = new Map();
        // 帧计数器
        this.frame_current_cnt = 0;
        // 生命值
        this.hp = 100;
        // 血槽
        this.$hp = this.root.$kof.find(`.kof-head-hp-${this.id}>div`);
        this.$hp_div = this.$hp.find('div');
        // 攻击力
        this.atk = 18;
    }

    start() {

    }

    update_move() {
        this.vy += this.gravity;
        this.x += this.vx * this.timedelta / 1000;
        this.y += this.vy * this.timedelta / 1000;

        // 平地竖直方向速度减为0
        if (this.y > 450) {
            this.y = 450;
            this.vy = 0;

            if (this.status === 3) this.status = 0;
        }

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.root.game_map.$canvas.width()) {
            this.x = this.root.game_map.$canvas.width() - this.width;
        }
    }

    update_control() {
        let w, a, d, space;
        if (this.id === 0) {
            w = this.pressed_keys.has('w'); //跳跃
            a = this.pressed_keys.has('a'); //左移
            d = this.pressed_keys.has('d'); //右移
            space = this.pressed_keys.has(' '); //攻击
        } else {
            w = this.pressed_keys.has('ArrowUp');  //跳跃
            a = this.pressed_keys.has('ArrowLeft'); //左移
            d = this.pressed_keys.has('ArrowRight'); //右移
            space = this.pressed_keys.has('End'); //攻击
        }

        if (this.status === 0 || this.status === 1) {
            if (space) {
                this.status = 4;
                this.vx = 0;
                this.frame_current_cnt = 0;
            } else if (w) {
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = -this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = this.speedy;
                this.status = 3;
                this.frame_current_cnt = 0;
            } else if (d) {
                this.vx = this.speedx;
                this.status = 1;
            } else if (a) {
                this.vx = -this.speedx;
                this.status = 1;
            } else {
                this.vx = 0;
                this.status = 0;
            }
        }
    }

    update_direction() {
        if (this.status === 6) return;

        let players = this.root.players;
        if (players[0] && players[1]) {
            let me = this, you = players[1 - this.id];
            if (me.x < you.x) me.direction = 1;
            else me.direction = -1;
        }
    }

    is_attack() { // 攻击后的逻辑
        if (this.status === 6) return ;
        // 防御状态
        if (this.direction * this.vx < 0) {
            // 防御状态下被攻击, 有一定的伤害减免
            this.hp = Math.max(this.hp - (this.atk - 6), 0);
        } else {
            // 被打状态
            this.status = 5;
            // 从第0帧开始渲染
            this.frame_current_cnt = 0;
            // 更新生命值
            this.hp = Math.max(this.hp - this.atk, 0);
        }
        // 更新血槽长度
        this.$hp_div.animate({
            width: this.$hp.parent().width() * this.hp / 100
        }, 300);
        this.$hp.animate({
            width: this.$hp.parent().width() * this.hp / 100
        }, 600);

        if (this.hp <= 0) {
            this.status = 6;
            this.frame_current_cnt = 0;
            this.vx = 0;
        }
    }

    is_collision(rec1, rec2) { // 碰撞检测(判断两个矩形是否有交集)
        if (Math.max(rec1.x1, rec2.x1) > Math.min(rec1.x2, rec2.x2)) {
            return false;
        } else if (Math.max(rec1.y1, rec2.y1) > Math.min(rec1.y2, rec2.y2)) {
            return false;
        }
        return true;
    }

    update_attack() {
        if (this.status === 4 && this.frame_current_cnt === 18) {
            let me = this, you = this.root.players[1 - this.id];
            // 我方对应的矩形
            let rec1;
            // 正方向(右)
            if (this.direction > 0) {
                rec1 = {
                    x1: me.x + 120,
                    y1: me.y + 40,
                    x2: me.x + 120 + 100,
                    y2: me.y + 40 + 20,
                };
            } else {
                rec1 = {
                    x1: me.x + me.width - 120 - 100,
                    y1: me.y + 40,
                    x2: me.x + me.width - 120 - 100 + 100,
                    y2: me.y + 40 + 20,
                };
            }
            // 对手对应的矩形
            let rec2 = {
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height
            };

            if (this.is_collision(rec1, rec2)) {
                you.is_attack();
            }
        }
    }

    update() {
        // 角色死亡后一段时间会从界面上消失
        if (this.hp<=0) {
            setTimeout(() => {
                this.destroy();
            }, 3000);
        }
        // 更新状态
        this.update_control();
        // 更新位置
        this.update_move();
        // 更新方向
        this.update_direction();
        // 更新血量
        this.update_attack();
        this.render();
    }

    hitbox() { // 碰撞盒子, 用于调试
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.direction>0) {
            this.ctx.fillStyle='red';
            this.ctx.fillRect(this.x+120,this.y+40,100,20);
        } else {
            this.ctx.fillStyle='red';
            this.ctx.fillRect(this.x+this.width-120-100,this.y+40,100,20);
        }
    }

    render() {
        // 当前状态
        let status = this.status;

        if (this.status === 1 && this.direction * this.vx < 0) {
            status = 2;
        }

        let obj = this.animations.get(status);
        if (obj && obj.loaded) {
            if (this.direction > 0) {
                // 循环渲染
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                // 当前显示的图片
                let image = obj.gif.frames[k].image;
                // canvas渲染图片
                this.ctx.drawImage(image, this.x, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);
            } else {
                // 方向调整
                this.ctx.save();
                this.ctx.scale(-1, 1);
                this.ctx.translate(-this.root.game_map.$canvas.width(), 0);
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.root.game_map.$canvas.width() - this.x - this.width, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);
                this.ctx.restore();
            }
        }

        if (status === 4 || status === 5 || status === 6) {
            if (this.frame_current_cnt == obj.frame_rate * (obj.frame_cnt - 1)) {
                if (status === 6) {
                    this.frame_current_cnt--;
                } else {
                    this.status = 0;
                }
            }
        }

        this.frame_current_cnt++;
    }
}