let AC_GAME_OBJECTS = [];

class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);
        this.timedelta = 0;
        this.has_call_start = false;
    }

    start() {  // 初始执行一次

    }

    update() {  // 每一帧执行一次(除了第一帧以外)

    }

    destroy() {  // 删除当前对象
        for (let item in AC_GAME_OBJECTS) {
            if (AC_GAME_OBJECTS[item] === this) {
                AC_GAME_OBJECTS.splice(item, 1);
                break;
            }
        }
    }
}


let last_timestamp;

let AC_GAME_OBJECTS_FRAME = (timestamp) => {
    for (let obj of AC_GAME_OBJECTS) {
        if (!obj.has_call_start) { // 如果start函数未执行就执行start函数
            obj.start();
            obj.has_call_start = true;
        } else { // 如果执行过start函数就执行update函数
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    // 请求动画帧
    requestAnimationFrame(AC_GAME_OBJECTS_FRAME);
}

requestAnimationFrame(AC_GAME_OBJECTS_FRAME);

export {
    AcGameObject
}
