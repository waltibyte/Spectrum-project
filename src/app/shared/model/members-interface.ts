export class Member {
    // tslint:disable-next-line: variable-name
    _id: any;
    name: string;
    age: number;
    phone: string;
    email: string;
    company: string;

    // tslint:disable-next-line: variable-name
    constructor(_id: any, name: string, age: number, phone: string, email: string, company: string) {
        this._id = _id;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.email = email;
        this.company = company;
    }
}
