import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError as _throw, throwError, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  public myEvent$: Subject<any> = new BehaviorSubject<any>(null);
  public apply$: Subject<any> = new BehaviorSubject<any>(null);

  constructor(
  ) { }

  /**
   * This method handles errors such as network and etc with the response code logged
   */
  handleError(error?: HttpErrorResponse) {
    // console.log(error);
    let errormessage;
    if (error.error instanceof ErrorEvent) {
      console.error('Network Error', error.error.message);
      errormessage = `Network Error ${error.error.message}`;
      console.log(errormessage);
    } else {
      console.error(`Backend returned code ${error.status},` + `body was: ${JSON.stringify(error.statusText)}`);
      if (error.statusText === 'Unknown Error') {
        errormessage = 'Opps! Something went wrong. Please check your network connection and try again.';
      } else {
        errormessage = `${error.statusText || errormessage}`;
        console.log(errormessage);
      }
    }
    console.log(errormessage);
    return throwError(`${errormessage}`);
  }

}
