/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf;

//Sample ball object
const ball = {
    x: 100,
    y: 100,
    velocityX: 5,
    velocityY: 2,
    radius: 25,
    color: "blue",
    draw()
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

//Sample brick controled by player
const playerBrick = {
    x: 250,
    y: 400,
    width: 100,
    height: 25,
    color: "red",
    draw()
    {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();
    }    
};

//Player configurations 
const player = {
    mousePosition: {
        "X" : 0,
        "Y" : 0
    },
}

const brick = {
    x : 0, 
    y : 0,
    width: 75,
    height: 25,
    color: "yellow",
    borderColor: "black",
    borderThickness: 2,
    draw()
    {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.closePath();

        ctx.lineWidth = this.borderThickness;
        ctx.strokeStyle = this.borderColor;

        ctx.fillStyle = this.color;
        
        ctx.fill();
        ctx.stroke();

    }

}

//Draw once ingame
ball.draw();
playerBrick.draw();

brick.draw();

//Canvas draw function
function draw()
{
    //Draw zone
    ClearCanvasScreen();

    ball.draw();
    playerBrick.draw();
    brick.draw();

    //Physics Zone
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    playerBrick.x = player.mousePosition["X"] - (playerBrick.width / 2) - canvas.offsetLeft

    //Colisions zone

    //Detect collision with canvas border
    if((ball.y + ball.radius) + ball.velocityY > canvas.height || (ball.y - ball.radius) + ball.velocityY < 0)
    {
        ball.velocityY = -ball.velocityY
    }

    if((ball.x + ball.radius) + ball.velocityX > canvas.width || (ball.x - ball.radius) + ball.velocityX < 0)
    {
        ball.velocityX = -ball.velocityX
    }

    //Detect if playerBrick is out ouf bounds
    
    if(player.mousePosition.X + ((playerBrick.width / 2) + canvas.offsetLeft) > canvas.width)
    {
        playerBrick.x = canvas.width - playerBrick.width
    }
    else if(player.mousePosition.X - (playerBrick.width / 2) + canvas.offsetLeft < canvas.offsetLeft)
    {
        playerBrick.x = 0
    }
    
    



    raf = window.requestAnimationFrame(draw);
}





//Resume game conditions
canvas.addEventListener("mouseover", (event) => {
    //console.log(event);
    raf = window.requestAnimationFrame(draw);
})


//Pause game conditions
canvas.addEventListener("mouseout", (event) => {
    //console.log(event);
    window.cancelAnimationFrame(raf);
})

document.addEventListener("keydown", (event) => {
    //console.log(event.key);

    if(event.key == "Escape")
    {
        window.cancelAnimationFrame(raf);
    }
})


//Move playerBrick conditions
canvas.addEventListener("mousemove", (event) =>{
    player.mousePosition.X = event.clientX;
    console.log(player.mousePosition.X);
})





function ClearCanvasScreen()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};