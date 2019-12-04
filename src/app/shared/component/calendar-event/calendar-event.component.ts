import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  parseISO
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { UtilityService } from '../../services/utility.service';
import { _Events } from '../../model/events-interface';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss']
})
export class CalendarEventComponent implements OnInit {
  @Output() closeCalModal = new EventEmitter<any>();
  myEvents: _Events[];
  // tslint:disable-next-line: variable-name
  _myEvent = [];

  view = 'month';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  activeDayIsOpen = false;

  constructor(private util: UtilityService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.getMyEvents();
  }

  getMyEvents() {
    // tslint:disable-next-line: variable-name
    this.util.myEvent$.subscribe((res: any) => {
      if (res) {
        console.log(res);
        res.forEach(resData => {
          console.log(resData);
          resData.start = subDays(parseISO(resData.scheduledFor), 1);
          resData.title = resData.about;
          resData.color = colors.red;
          resData.allDay = true;
          resData.resizable = {
            beforeStart: true,
            afterEnd: true
          };
          resData.draggable = true;
        });
        console.log(res);
        this.events = res;
      }
    });
    console.log(this.events);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {}

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  closeModal() {
    this.closeCalModal.emit();
  }
}
