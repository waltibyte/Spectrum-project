// tslint:disable-next-line: class-name
export class _Events {
    // tslint:disable-next-line: variable-name
    _id: any;
    organizer: string;
    company: string;
    about: string;
    scheduledFor: Date;
    duration: any;
    capacity: any;

    // tslint:disable-next-line: variable-name
    constructor(_id: any, organizer, company, about, scheduledFor: any, duration, capacity) {
        this._id = _id;
        this.organizer = organizer;
        this.company = company;
        this.about = about;
        this.scheduledFor = scheduledFor;
        this.duration = duration;
        this.capacity = capacity;
    }
}
