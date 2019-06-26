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