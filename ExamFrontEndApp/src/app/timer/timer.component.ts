import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  minutes: number;
  seconds: number;
  displayTime:string ="30:00";
  interval: any;
  currentClass = "";
  @Output() timeup = new EventEmitter<null>();
  @Input() stopTimer = false;

  constructor() {
    this.minutes = 30;
    this.seconds = 0;
  }

  ngOnInit() {
    this.start();
  }

  start() {
    this.interval = setInterval(() => {
      let time = this.minutes * 60+ this.seconds;
      time--;
      this.minutes = Math.floor(time / 60);
      this.seconds = time % 60;

      if(this.minutes>=20){
        this.currentClass="tag is-primary is-large";
      }
      else if(this.minutes>=15){
        this.currentClass="tag is-warning is-large";
      }
      else if(this.minutes<=5){
        this.currentClass="tag is-danger is-large";
      }

      if(this.stopTimer){
        clearInterval(this.interval);
      }
      else if (time === 0) {
        clearInterval(this.interval);
        //alert('Time is up!');
        this.timeup.emit();
      }
    }, 10);
  }

  stop() {
    clearInterval(this.interval);
  }
}
