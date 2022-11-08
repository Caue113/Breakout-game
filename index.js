import { GameObject }  from "./GameObject";


let myObj = new GameObject();

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf;




const collisionCircle = {
    x : 0,
    y : 0,
    radius : 0,
    color: "#ff00ff",
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();

        ctx.fillStyle = "#ff00ff";
        ctx.fill();
    }
}

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
    },
    getCenterX(){ return this.x + this.width / 2 },
    getCenterY(){ return this.y + this.height / 2}
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

    },
    detectColision()
    {
        ball.x 
    }

}

//Draw once ingame
ball.draw();
playerBrick.draw();

brick.draw();

collisionCircle.draw();

//Canvas draw function
function draw()
{
    //Draw zone
    ClearCanvasScreen();

    ball.draw();
    playerBrick.draw();
    brick.draw();

    collisionCircle.draw();

    //Physics Zone
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    playerBrick.x = player.mousePosition["X"] - (playerBrick.width / 2) - canvas.offsetLeft
    
    
    
    //Colisions zone
    
    ballColision();

    //Debug Collisions
    collisionCircle.x = playerBrick.getCenterX();
    collisionCircle.y = playerBrick.getCenterY();
    collisionCircle.radius = 30;

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
    
    console.log(vectorDistance());



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
})


function ClearCanvasScreen()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};


function ballColision()
{
    //TEMP VARIABLE, MUST BE SET IN GAME CONFIGURATIONS
    let minCollRange = 20;

    if (vectorDistance() < minCollRange)
    {
        console.log("BALL COLLISION");
    }
}








/**
 *  COLLISIONS LOGIC
 * 
 * To keep a predictable and prevent lots of math calculatinons, this is the flow
 * of how collidable objects should organize and react.
 * 
 * 
 * 
 * [Collidable Object]
 * 
 * 1 - Create a pulse calculating the distance with all objects in game. (No Sqrt needed)
 * 2 - Based on its speed, create a list *possible* next frame collisions. The list contain all objects close enough
 * 3 -  Iterate each object in the list for the distance (sqrt)
 * 4 - If an object passed the minimium threshold, a collision has been detected.
 * 4.1 - Extra step --> create another list of objects, this time we get the target and the contact point (collision position) 
 * 5. If the object is physical, do all physics math. Else, end here. 
 */




/**
 * MATH FUNCTIONS TO WITH LINEAR ALGEBRA, GEOMETRY AND  PHYSICS 
*/

/**
 * Calculates the distance between two positions
 * @param {number} a Position of point A
 * @param {number} b Position of point B
 * @returns numeric positive distance
 */
function distance(a, b)
{
    return Math.abs(a - b);
}

function vectorDistance()
{
    let a = distance(ball.x, playerBrick.getCenterX());
    let b = distance(ball.y, playerBrick.getCenterY());

    return Math.sqrt((a**2) + (b**2));
}