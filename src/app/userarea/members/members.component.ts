import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Member } from 'src/app/shared/model/members-interface';
import { MembersService } from 'src/app/shared/services/members.service';
import { OrderPipe } from 'ngx-order-pipe';
import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import { EventsService } from 'src/app/shared/services/events.service';
import { _Events } from 'src/app/shared/model/events-interface';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, AfterViewInit, OnDestroy {
  allMembers: Member[];
  allEvents: _Events[];
  order = 'name';
  reverse = false;
  @ViewChild('calModal', { static: false }) calModal;
  @ViewChild('calendarModal', { static: false }) calendarModal;

  constructor(
    private memberService: MembersService,
    private eventService: EventsService,
    private util: UtilityService,
    private orderPipe: OrderPipe
  ) { }

  ngOnInit() {
    this.getAllMembers();
    this.getAllEvent();
  }

  ngAfterViewInit() {
    document.querySelector('body').appendChild(this.calModal.nativeElement);
  }

  ngOnDestroy(): void {}

  getAllMembers() {
    this.memberService.storeMembers
    .pipe(untilComponentDestroyed(this))
    .subscribe(res => {
      this.allMembers = res;
    });
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  removeMember(member: any) {
    this.allMembers.splice(this.allMembers.indexOf(member), 1);
  }

  openCalModal(id) {
    this.getRegisteredEvent(id);
    this.calendarModal.show();
  }

  closeCalendarModal(res) {
    this.calendarModal.hide();
  }

  getRegisteredEvent(id) {
    this.eventService.storeRequestRegisteredEvents()
    .pipe(untilComponentDestroyed(this))
    .subscribe(res => {
      const regEvents = res.filter(regEv => {
        return regEv.member_id === id;
      });
      const availableEventsIds = new Set(regEvents.map(ev => ev.event_id));
      const filteredEvents = this.allEvents.filter(({_id}) => availableEventsIds.has(_id));
      this.util.myEvent$.next(filteredEvents);
      // console.log(filteredEvents);
    });
  }

  getAllEvent() {
    this.eventService.storeRequestEvents()
    .pipe(untilComponentDestroyed(this))
    .subscribe(res => {
      this.allEvents = res;
    });
  }
}
