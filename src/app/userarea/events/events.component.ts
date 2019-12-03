import { Component, OnInit, OnDestroy } from '@angular/core';
import { _Events } from 'src/app/shared/model/events-interface';
import { Observable } from 'rxjs/internal/Observable';
import { EventsService } from 'src/app/shared/services/events.service';
import { DatePipe } from '@angular/common';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  allEvents: _Events[];
  memberId: string;
  hasApply = false;

  constructor(
    private eventService: EventsService,
    private fDate: DatePipe,
    private util: UtilityService
  ) { }

  ngOnInit() {
    this.getAllEvents();
    this.checkIfRouterIsFromUser();
    console.log(JSON.parse(localStorage.getItem('addedEvents')));
  }

  ngOnDestroy(): void { }

  /**
   * Get all events
   */
  getAllEvents() {
    this.eventService.storeRequestEvents()
      .pipe(untilComponentDestroyed(this)).subscribe(res => {
        this.allEvents = res;
        console.log(res);
      });
  }
  /**
   * This subscribes to the uni-cast
   * observable to check if the page was routed from the member's table and then subscribes to it
   * in other to get member id
   */
  checkIfRouterIsFromUser() {
    this.util.apply$.subscribe(res => {
      if (res) {
        this.memberId = res;
        this.hasApply = true;
      } else {
        this.hasApply = false;
      }
    });
  }

  /**
   * This formats the date from the member's store
   */
  formatDate(date) {
    const newDate = date.split(' ').splice(0, 1);
    return `${this.fDate.transform(newDate, 'fullDate')} ${this.fDate.transform(newDate, 'shortTime')}`;
  }

  /**
   * This formats the duration to hours and mins
   */
  timeConvert(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}hr:${minutes}mins`;
  }

  /**
   * This adds a member to an event
   */
  joinEvent(id) {
    console.log(id);
    const joinedEvents = JSON.parse(localStorage.getItem('addedEvents'));
    joinedEvents.push({ member_id: this.memberId, event_id: id });
    const addData = joinedEvents;
    localStorage.setItem('addedEvents', JSON.stringify(addData));
    console.log(localStorage.getItem('addedEvents'));
  }

}
