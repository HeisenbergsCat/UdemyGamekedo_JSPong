function Paddle(screenSide, length, width)
{
    this.length = length;
    this.width = width;
    this.positionX = 0;
    this.positionY = 0;
    this.color = "white"

    this.setPaddles = function() {

        if (screenSide == "left") {
            this.positionX = 10;
            this.color = "red";
        } else if (screenSide == "right") {
            this.positionX = canvas.width - this.width - 10;
            this.color = "blue"
        }
    }

    this.aiPaddleMovement = function() {
        if (this.positionY + (this.length/2) > testBall.ballY + 20) {
            this.positionY -= 7;
        } else if (this.positionY + (this.length/2) < testBall.ballY - 20){
            this.positionY += 7;
        }
    }

    this.drawPaddle = function(canvas) {
        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(this.positionX, this.positionY, this.width, this.length);
    }

}
