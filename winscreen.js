function WinScreen() {

    this.printWinMessage = function() {
        canvasContext.fillStyle = "white";
        canvasContext.fillText(mainGameState.winMessage, 400, 250);
        canvasContext.fillText("Click to Continue", 400, 300);
    }
}
