import { Pipe, PipeTransform } from '@angular/core';

const HUMAN_MINUTE = 'minute';
const HUMAN_SECONDS = 'seconds';
enum HumanTimer {
  minute = 'minute',
  seconds = 'seconds'
}
@Pipe({
  name: 'humantimer'
})
export class HumanTimerPipe implements PipeTransform {
  seconds = 60;
  transform(value: number | any, args: any): any {
    const minute = Math.floor(value / 60);
    if (args == HUMAN_MINUTE) {
      return minute;
    }
    if(value < this.seconds){
      return value;
    }
    return  value - this.seconds ;
  }

}
