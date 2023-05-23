let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext("2d")
let total_score_dom = document.getElementById("total_score")
let theme_audio = new Audio("assets/audio/theme.mp3")
let food_audio = new Audio("assets/audio/snake-eat-food.wav")
let game_over = new Audio("assets/audio/game-over.mp3")
let apple = document.getElementById("apple")
let frame
let snake_body = []
let old_canvas
let snakex, snakey
let foodx, foody
let keypress
let dy = 25
let dx = 25
let col = 20
let row = 39
let total_score = 0
let head = document.createElement("img")
let body = document.createElement("img")
let tail = document.createElement("img")

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    snakex = (canvas.width / 2)
    snakey = (canvas.height / 2)
    game_start_screen()
})

// game start screen
game_start_screen = () => {
    ctx.font = "48px Poppins"
    ctx.fillStyle = "rgb(110, 251, 113)"
    ctx.fillText('Press Enter To Start The Game', 200, (canvas.height / 2));
}

// snake
move_snake = () => {
    ctx.putImageData(old_canvas, 0, 0)


    // respon food when snake eat it
    if (snakex == foodx && snakey == foody) {

        total_score += 1;
        total_score_dom.innerText = `${total_score}`
        food_audio.play();
        ctx.clearRect(foodx, foody, 25, 25);
        // push food data in array
        snake_body.push([foodx, foody])
        snake_food();
    }
    // draw body using food data
    for (i = 0; i < snake_body.length; i++) {
        ctx.drawImage(body, snake_body[i][0], snake_body[i][1], 25, 25)
        ctx.drawImage(tail, snake_body[(snake_body.length - 1)][0], snake_body[(snake_body.length - 1)][1], 25, 25)
    }
    // make snake body moveable with head 
    for (i = snake_body.length - 1; i > 0; i--) {
        snake_body[i] = snake_body[i - 1]
    }
    if (snake_body.length) {
        snake_body[0] = [snakex, snakey]
    }

    // draw snake head
    ctx.drawImage(head, snakex, snakey, 25, 25)
    // snake_movement
    if (keypress == "ArrowLeft") {
        snakex -= dx
        head.src = "assets/images/snake-left.png"
        body.src = "assets/images/snake-body-x.png"
        tail.src = "assets/images/snake-tail-left.png"

    } else if (keypress == "ArrowRight") {
        snakex += dx
        head.src = "assets/images/snake-right.png"
        body.src = "assets/images/snake-body-x.png"
        tail.src = "assets/images/snake-tail-right.png"

    } else if (keypress == "ArrowUp") {
        snakey -= dy
        head.src = "assets/images/snake-up.png"
        body.src = "assets/images/snake-body-y.png"
        tail.src = "assets/images/snake-tail-up.png"

    } else if (keypress == "ArrowDown") {
        snakey += dy
        head.src = "assets/images/snake-down.png"
        body.src = "assets/images/snake-body-y.png"
        tail.src = "assets/images/snake-tail-down.png"
    } else {
        snakex -= dx
    }
    check_game_out()
}


// game_over
check_game_out = () => {
    if (snakex == canvas.width || snakex == -25 || snakey == canvas.height || snakey == -25) {
        clearInterval(frame)
        theme_audio.pause()
        game_over.play()

        // game_over_screen
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.font = "48px Poppins"
        ctx.fillStyle = "rgb(110, 251, 113)"
        ctx.fillText('Game Over', ((canvas.width / 2) - 150), (canvas.height / 2));

        snakex = (canvas.width / 2)
        snakey = (canvas.height / 2)
        snake_body = []
    }

}



// snake_food
snake_food = () => {
    ctx.beginPath()
    // set food on random location
    foodx = parseInt(Math.random() * row) * 25
    foody = parseInt(Math.random() * col) * 25
    ctx.drawImage(apple, foodx, foody, 25, 25)
    old_canvas = ctx.getImageData(0, 0, canvas.width, canvas.height)
}





// refresh
main_game_screen = () => {
    // audio
    theme_audio.loop = true
    theme_audio.play()
    snake_food()
    frame = setInterval(move_snake, 100) /*--------------------------------> setInterval frame render*/

    head.src = "assets/images/snake-left.png"
    body.src = "assets/images/snake-body-x.png"
    tail.src = "assets/images/snake-tail-left.png"

}


document.addEventListener("keydown", (e) => {
    keypress = e.key
    if (e.key === "Enter") {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        main_game_screen()
    }
})