import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-virtual-slider',
  templateUrl: './virtual-slider.component.html',
  styleUrls: ['./virtual-slider.component.scss'],
})
export class VirtualSliderComponent implements OnInit {
  public monthNames = MonthNames;
  public sliderDays: SliderDay[] = []; //10 elements
  public translateX: number = -150;
  public transitionEnabled: boolean = false;
  private buttonsBlocked = false;

  public sliderMonths: SliderMonth[] = [];
  constructor() {}

  ngOnInit(): void {
    this.sliderDays = this.getStartDays();
    this.checkSliderMonths();
  }

  public moveLeft() {
    if (this.buttonsBlocked) return;
    this.buttonsBlocked = true;
    this.transitionEnabled = true;
    this.translateX = this.translateX + 150;
    this.checkSliderMonths(MoveDirectionsEnum.Left);

    setTimeout(() => {
      this.buttonsBlocked = false;
      this.transitionEnabled = false;
      this.translateX = -150;
      const firstDay = this.sliderDays[0];
      const firstDayDate = new Date(
        firstDay.year,
        firstDay.month,
        firstDay.day
      );
      firstDayDate.setDate(firstDayDate.getDate() - 1);
      this.sliderDays.unshift({
        day: firstDayDate.getDate(),
        month: firstDayDate.getMonth(),
        year: firstDayDate.getFullYear(),
      });
      this.sliderDays.splice(-1, 1);
    }, 200);
  }

  public moveRight() {
    if (this.buttonsBlocked) return;
    this.buttonsBlocked = true;
    this.transitionEnabled = true;
    this.translateX = this.translateX - 150;
    this.checkSliderMonths(MoveDirectionsEnum.Right);

    setTimeout(() => {
      this.buttonsBlocked = false;
      this.transitionEnabled = false;
      this.translateX = -150;
      const lastDay = this.sliderDays[this.sliderDays.length - 1];
      const lastDayDate = new Date(lastDay.year, lastDay.month, lastDay.day);
      lastDayDate.setDate(lastDayDate.getDate() + 1);
      this.sliderDays.push({
        day: lastDayDate.getDate(),
        month: lastDayDate.getMonth(),
        year: lastDayDate.getFullYear(),
      });
      this.sliderDays.shift();
    }, 200);
  }

  public checkSliderMonths(direction?: MoveDirectionsEnum) {
    const monthDaysSum = this.getMonthDaysSum(direction);
    this.sliderMonths = [];
    Object.entries(monthDaysSum).forEach((monthDaySumEntry) => {
      this.sliderMonths.push({
        name: this.monthNames[parseInt(monthDaySumEntry[0])],
        size: monthDaySumEntry[1],
      });
    });
  }

  private getMonthDaysSum(direction?: MoveDirectionsEnum) {
    let getAvoidCondition = (index: number) => {
      if (!direction) return index < 1 || index > 8;
      else if (direction === MoveDirectionsEnum.Left) return index > 7;
      else if (direction === MoveDirectionsEnum.Right) return index < 2;
      return true;
    };

    const monthDaysSum: SliderMonthDaysCounts = this.sliderDays.reduce(
      (sliderMonths, sliderDay, index) => {
        if (getAvoidCondition(index)) return sliderMonths;
        if (!sliderMonths[sliderDay.month]) sliderMonths[sliderDay.month] = 1;
        else sliderMonths[sliderDay.month] = sliderMonths[sliderDay.month] + 1;
        return sliderMonths;
      },
      {} as SliderMonthDaysCounts
    );

    return monthDaysSum;
  }

  public getStartDays() {
    const days: SliderDay[] = [];
    const date = new Date();
    date.setDate(date.getDate() - 4);
    for (let i = 0; i <= 9; i++) {
      days.push({
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      } as SliderDay);
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
}

interface SliderDay {
  day: number;
  month: number;
  year: number;
}

interface SliderMonth {
  name: string;
  size: number;
}

interface SliderMonthDaysCounts {
  [monthIndex: number]: number;
}

enum MoveDirectionsEnum {
  Left = 'left',
  Right = 'right',
}

const MonthNames = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];
