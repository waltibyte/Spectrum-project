import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { _Events } from 'src/app/shared/model/events-interface';
import { Observable } from 'rxjs/internal/Observable';
import { EventsService } from 'src/app/shared/services/events.service';
import { DatePipe } from '@angular/common';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { IdService } from 'src/app/shared/services/id.service';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  allEvents: _Events[];
  memberId: string;
  hasApply = false;
  calStatForm = new FormControl();
  loading = false;
  myEvents: any[];

  constructor(
    private eventService: EventsService,
    private fDate: DatePipe,
    private util: UtilityService,
    private idsService: IdService,
    private toastr: ToastrService
  ) { }

  /**
   * Put member ID in session on reload
   */
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    console.log('browser refreshed');

    if (!sessionStorage.getItem('memberID')) {
      this.util.apply$.subscribe(res => {
        if (res) {
          sessionStorage.setItem('memberID', res);
        }
      });
    }
  }


  ngOnInit() {
    this.getAllEvents();
    this.checkIfRouterIsFromUser();
    // console.log(JSON.parse(localStorage.getItem('addedEvents')));
  }

  ngOnDestroy() {
    sessionStorage.removeItem('memberID');
    this.util.apply$.next();
  }

  /**
   * Get all events
   */
  getAllEvents() {
    this.loading = true;
    this.eventService.storeRequestEvents()
      .pipe(untilComponentDestroyed(this)).subscribe(res => {
        this.loading = false;
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
        console.log(res);
        this.memberId = res;
        this.hasApply = true;
      } else if (sessionStorage.getItem('memberID')) {
        this.memberId = sessionStorage.getItem('memberID');
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
    const payload = {
      id: this.idsService.generate(),
      member_id: this.memberId,
      event_id: id
    };

    const payload2 = [{
      id: this.idsService.generate(),
      member_id: this.memberId,
      event_id: id
    }];
    this.eventService.storeRequestRegisteredEvents()
      .pipe(untilComponentDestroyed(this))
      .subscribe(res => {
        const myEvent = res.filter(val => val.member_id === this.memberId);
        const takenEvent = myEvent.filter(val => val.event_id === id);
        console.log(takenEvent);
        if (takenEvent.length === 0) {
          this.eventService.addEvents(payload)
            .pipe(untilComponentDestroyed(this))
            .subscribe(resData => {
              console.log(resData);
              this.toastr.success('Event', 'You have joined this event');
            });
          } else {
            this.toastr.error('Event', 'You have already joined this event');
          }
      });
  }

  setEventCalStatus(id) {
    console.log(this.calStatForm.value);
    this.eventService.updateEventCalStatus(id, this.calStatForm.value)
    .pipe(untilComponentDestroyed(this))
    .subscribe(res => {
      if (res) {
        this.toastr.success('Event', 'Updated Successfully');
      }
    });
  }
}
