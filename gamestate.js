function GameState() {
    this.LeftPlayerScore = 0;
    this.RightPlayerScore = 0;
    this.showingWinScreen = false;
    this.winMessage = "";

    this.printScores = function() {
        canvasContext.fillStyle = "white";
        canvasContext.fillText(this.RightPlayerScore, 100,100);
        canvasContext.fillText(this.LeftPlayerScore, canvas.width - 100,100);
    }

    this.checkEnd = function() {
        if (this.LeftPlayerScore >= WINNING_SCORE || this.RightPlayerScore >= WINNING_SCORE) {
            this.showingWinScreen = true;
        }
    }

    this.printWinner = function() {
        if (this.RightPlayerScore >= WINNING_SCORE) {
            this.winMessage = "Bejbu WYGRALO!!!";
        }
        if (this.LeftPlayerScore >= WINNING_SCORE) {
            this.winMessage = "Bejbu PRZEGRALO!";
        }
    }

    this.scoreReset = function() {
        this.LeftPlayerScore = 0;
        this.RightPlayerScore = 0;
        isMouseDown = false;
    }

    this.printWinMessage = function() {
        canvasContext.fillStyle = "white";
        canvasContext.fillText(this.winMessage, 400, 250);
        this.printWinner();
        canvasContext.fillText("Click to Continue", 400, 300);
    }

}
