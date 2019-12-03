import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { _Events } from 'src/app/shared/model/events-interface';
import { Observable } from 'rxjs/internal/Observable';
import { EventsService } from 'src/app/shared/services/events.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit {
  events$: Observable<_Events[]>;

  constructor(
    private eventService: EventsService,
    private fDate: DatePipe
  ) { }

  ngOnInit() {
    this.events$ = this.eventService.storeEvents;
    this.eventService.storeRequestEvents().subscribe(res => console.log(res));
  }

  formatDate(date) {
    const newDate = date.split(' ').splice(0, 1);
    console.log(newDate);
    return `${this.fDate.transform(newDate, 'fullDate')} ${this.fDate.transform(newDate, 'shortTime')}`;
  }

  timeConvert(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}hr:${minutes}mins`;
  }
}
