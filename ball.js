function Ball(radius)
{
    this.ballX = 100;
    this.ballY = 100;
    this.radius = radius;
    this.speedX = 15;
    this.speedY = 6;

    this.setup = function() {
        this.ballX = canvas.width/2;
        this.ballY = canvas.height/2;
    }

    this.drawBall = function() {
        canvasContext.fillStyle = "white";
        canvasContext.beginPath();
        canvasContext.arc(this.ballX, this.ballY, this.radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    }

    this.updatePosition = function() {
        this.ballX += this.speedX;
        this.ballY += this.speedY;
    }

    this.reset = function() {

        this.ballX = canvas.width/2;
        this.ballY = canvas.height/2;

        this.speedX = -this.speedX;
        this.speedY = -this.speedY;
    }

    this.boundsCheck = function() {
        if (this.ballX + this.radius > canvas.width) {
            mainGameState.RightPlayerScore ++;
            mainGameState.checkEnd();
            this.reset();
        }
        if (this.ballY + this.radius > canvas.height) {
            this.speedY = -this.speedY;
        }
        if (this.ballX < 0) {
            mainGameState.LeftPlayerScore ++;
            mainGameState.checkEnd();
            this.reset();
        }
        if (this.ballY < 0) {
            this.speedY = -this.speedY;
        }
    }

    this.collisionCheckR = function(collisionObject) {
        if (this.ballX + 10 > collisionObject.positionX
            && this.ballY > collisionObject.positionY
            && this.ballY< collisionObject.positionY  + collisionObject.length)
        {
            this.speedX = -this.speedX;

            var deltaY = this.ballY - (collisionObject.positionY + (collisionObject.length/2));
            this.speedY = deltaY * 0.4;
        }
    }

    this.collisionCheckL = function(collisionObject) {
        if (this.ballX - 10 < collisionObject.positionX + collisionObject.width
            && this.ballY > collisionObject.positionY
            && this.ballY < collisionObject.positionY  + collisionObject.length)
        {
            this.speedX = -this.speedX;

            var deltaY = this.ballY - (collisionObject.positionY + (collisionObject.length/2));
            this.speedY = deltaY * 0.4;
        }
    }

}
