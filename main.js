function StopWatch() {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.days = 0;
    
    this.tick = ()=> {
      this.seconds++;
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minutes++;
      }
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours++;
      }
      if (this.hours >= 24) {
        this.minutes = 0;
        this.days++;
      }
    }
    
    this.getTime = () => {
      return {
        seconds: this.seconds,
        minutes: this.minutes,
        hours: this.hours,
        days: this.days,
      };
    }
};
  
function getClockHandDegrees(startingDegrees, numerator, denominator) {
    const clockHandDegrees = 360 * numerator/denominator;
    // For the inverted Cartesian coordinates
    const adjustedFromStart = startingDegrees + clockHandDegrees;
    const canvasTranslation = (adjustedFromStart) >= 360 ? adjustedFromStart - 360 : adjustedFromStart;
    return canvasTranslation;
}
  
window.onload = () => {
    console.log(StopWatch);
    let canvas = document.querySelector('#myCanvas');
    let context = canvas.getContext('2d');
    const centerX = 150;
    const centerY = 150;
    const radius = 100;
    let startingDegrees = 270;
    const stopWatch = new StopWatch();
    
    // Update the clock every second
    setInterval(() => {
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
     
    }, 1000)
};