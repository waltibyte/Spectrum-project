import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalMemberEvent'
})
export class TotalMemberEventPipe implements PipeTransform {

  transform(allEvents: any[], myEvents: any[], field: string): any {
    if (!allEvents || !myEvents) {
      return null;
    }
    const regEvents = myEvents.filter((regEv: any) => {
      return regEv.member_id === field;
    });
    const availableEventsIds = new Set(regEvents.map((ev: any) => ev.event_id));
    // tslint:disable-next-line: no-shadowed-variable
    const filteredEvents = allEvents.filter(({ id }) => availableEventsIds.has(id));
    return filteredEvents.length;
  }

}
