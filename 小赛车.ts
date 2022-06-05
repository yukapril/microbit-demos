// https://makecode.microbit.org/#editor

// 当前游戏运行状态
let gameStatus: boolean = false
// 小车移动速度间隔
let speed: number = 500
// 小车加速度
const acceleration: number = 10
// 成绩分数
let score: number = 0

let myCar: game.LedSprite = game.createSprite(2, 4)
let car1: game.LedSprite = game.createSprite(rnd(), 0)
car1.set(LedSpriteProperty.Brightness, 150)

/**
 * 返回 0~4 随机数
 */
function rnd(): number {
    return Math.randomRange(0, 5)
}

/**
 * 小车位置重置
 */
function resetCar(car: game.LedSprite): void {
    car.set(LedSpriteProperty.X, rnd())
    car.set(LedSpriteProperty.Y, 0)
}

/**
 * 小车向下移动
 */
function move(car: game.LedSprite): void {
    if (car.get(LedSpriteProperty.Y) === 4) {
        // 底部
        if (car.get(LedSpriteProperty.X) === myCar.get(LedSpriteProperty.X)) {
            // 与当前小车发生碰撞
            gameOver()
        } else {
            // 继续下一轮
            score += 1
            resetCar(car)
            basic.pause(speed)
            if (speed > 100) {
                speed -= acceleration
            }
        }
    }
    car.change(LedSpriteProperty.Y, 1)
}

function removeCar(car: game.LedSprite) {
    car.delete()
}


function gameOver() {
    music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once)
    gameStatus = false
    removeCar(car1)
    removeCar(myCar)
    basic.pause(500)
    basic.showLeds(`
    . . . . .
    . # . # .
    . . . . .
    . # # # .
    # . . . #
    `)
    basic.showNumber(score)
}

function init() {
    music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Forever)
    gameStatus = true
    while (gameStatus) {
        basic.pause(speed)
        move(car1)
    }
}

input.onButtonPressed(Button.A, function () {
    myCar.move(-1)
})

input.onButtonPressed(Button.B, function () {
    myCar.move(1)
})

input.onButtonPressed(Button.AB, function () {
    speed = 1000
    score = 0
    myCar = game.createSprite(2, 4)
    car1 = game.createSprite(rnd(), 0)
    init()
})

basic.forever(function () {
})

init()
