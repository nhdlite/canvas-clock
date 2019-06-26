const centerX = 150;
const centerY = 150;
const radius = 100;
const stopWatch = new StopWatch();

let speedRange = [10, 50, 100, 500, 1000, 1500, 2000];
let speedIndex = 4;
let startingDegrees = 270;

// Initialize on window.onload
let canvas;
let context;
  
function getClockHandDegrees(startingDegrees, numerator, denominator) {
    const clockHandDegrees = 360 * numerator/denominator;
    // For the inverted Cartesian coordinates
    const adjustedFromStart = startingDegrees + clockHandDegrees;
    const canvasTranslation = (adjustedFromStart) >= 360 ? adjustedFromStart - 360 : adjustedFromStart;
    return canvasTranslation;
}

function adjustSpeed(type) {
    if (type === 'up') {
        console.log('Speeding up')
        speedIndex = (speedIndex - 1 >= 0) ? --speedIndex : speedIndex;
    }

    if (type === 'down') {
        console.log('Speeding down');
        speedIndex = (speedIndex + 1 < speedRange.length) ? ++speedIndex : speedIndex;
    }
}

function drawClock() {
    const time = stopWatch.getTime();
    stopWatch.tick();
    
    const secondHand = getClockHandDegrees(startingDegrees, time.seconds, 60);
    const secondsWidth = radius * Math.cos(secondHand * (Math.PI / 180));
    const secondsHeight = radius * Math.sin(secondHand * (Math.PI / 180));
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(centerX + secondsWidth, (centerY + secondsHeight));
    context.lineWidth = 2;
    context.stroke();
    
    const minuteHand = getClockHandDegrees(startingDegrees, time.minutes, 60);
    const minutesWidth = radius * Math.cos(minuteHand * (Math.PI / 180));
    const minutesHeight = radius * Math.sin(minuteHand * (Math.PI / 180));
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(centerX + minutesWidth, (centerY + minutesHeight));
    context.lineWidth = 5;
    context.stroke();

    const hourHand = getClockHandDegrees(startingDegrees, time.hours, 12);
    const hoursWidth = radius / 2 * Math.cos(hourHand * (Math.PI / 180));
    const hoursHeight = radius / 2 * Math.sin(hourHand * (Math.PI / 180));
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(centerX + hoursWidth, (centerY + hoursHeight));
    context.lineWidth = 5;
    context.stroke();
    
    //Redraw after some length of time
    setTimeout(drawClock, speedRange[speedIndex])
}
  
window.onload = () => {
    canvas = document.querySelector('#myCanvas');
    context = canvas.getContext('2d');
    drawClock();
};