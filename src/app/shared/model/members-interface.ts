export class Member {
    // tslint:disable-next-line: variable-name
    id: any;
    name: string;
    age: number;
    phone: string;
    email: string;
    company: string;

    // tslint:disable-next-line: variable-name
    constructor(id: any, name: string, age: number, phone: string, email: string, company: string) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.email = email;
        this.company = company;
    }
}
