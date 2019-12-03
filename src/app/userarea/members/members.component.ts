import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Member } from 'src/app/shared/model/members-interface';
import { MembersService } from 'src/app/shared/services/members.service';
import { OrderPipe } from 'ngx-order-pipe';
import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import { EventsService } from 'src/app/shared/services/events.service';
import { _Events } from 'src/app/shared/model/events-interface';
import * as _ from 'lodash';

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
    private orderPipe: OrderPipe,
    private cd: ChangeDetectorRef
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
      console.log(regEvents);

      // tslint:disable-next-line: variable-name
    //   if (regEvents.length > 0) {
    //     const a = this.allEvents.filter(d => d._id);
        
    // }
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
