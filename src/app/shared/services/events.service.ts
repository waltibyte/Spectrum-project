import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { UtilityService } from './utility.service';
import { environment } from 'src/environments/environment';
import { switchMap, shareReplay, catchError, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { _Events } from '../model/events-interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  public store$: Observable<any>;

  constructor(
    private http: HttpClient,
    public util: UtilityService
  ) { }

  /**
   * Method that uses share replay to  cache data in other to avoid multiple API call on certain data
   */
  get storeEvents(): Observable<any> {
    // Check if observable data exist in cache
    if (!this.store$) {
      const timer$ = timer(0, environment.REFRESH_INTERVAL);
      this.store$ = timer$.pipe(
        // tslint:disable-next-line: variable-name
        switchMap(_a => this.storeRequestEvents()),
        shareReplay(environment.CACHE_SIZE) // shareReplay allow sharing of a single subscription for all subscribers
      );
    }
    return this.store$;
  }

  /**
   * Method that performs the http get request and maps the response for subscription
   */
  storeRequestEvents(): Observable<any> {
    const PATH = '/api/events';
    return this.http.get(PATH).pipe(
      catchError(this.util.handleError),
      map(
        (data: any) => {
          return data;
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        })
    );
  }

  /**
   * Method that gets all the registered events
   */
  storeRequestRegisteredEvents(): Observable<any> {
    const PATH = '/api/registeredEvents';
    return this.http.get(PATH).pipe(
      catchError(this.util.handleError),
      map(
        (data: any) => {
          return data;
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        })
    );
  }

  /**
   * Method that add chosen event
   */
  addEvents(reqBody): Observable<any> {
    const PATH = '/api/registeredEvents';
    return this.http.post(PATH, reqBody)
    .pipe(
      catchError(this.util.handleError),
      map(
        (data: any) => {
          return data;
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        })
    );
  }

  updateEventCalStatus(id, status): Observable<any> {
    const PATH = `/api/events/${id}`;
    return this.http.patch(PATH, { showOnCalendar: status})
    .pipe(
      catchError(this.util.handleError),
      map(
        (data: any) => {
          return data;
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        })
    );
  }

}
