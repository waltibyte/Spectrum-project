// tslint:disable-next-line: class-name
export class _Events {
    // tslint:disable-next-line: variable-name
    id: any;
    organizer: string;
    company: string;
    about: string;
    scheduledFor: Date;
    duration: any;
    capacity: any;
    hideCap?: boolean;
    showOnCalendar?: boolean;

    // tslint:disable-next-line: variable-name
    constructor(id: any, organizer, company, about, scheduledFor: any, duration, capacity, hideCap?, showOnCalendar?) {
        this.id = id;
        this.organizer = organizer;
        this.company = company;
        this.about = about;
        this.scheduledFor = scheduledFor;
        this.duration = duration;
        this.capacity = capacity;
        this.hideCap = hideCap;
        this.showOnCalendar = showOnCalendar;
    }
}
