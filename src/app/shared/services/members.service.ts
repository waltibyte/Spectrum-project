import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap, shareReplay, catchError, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  public store$: Observable<any>;

  constructor(
    private http: HttpClient,
    public util: UtilityService
  ) { }

  /**
   * Method that uses share replay to  cache data in other to avoid multiple API call on certain data
   */
  get storeMembers(): Observable<any> {
    // Check if observable data exist in cache
    if (!this.store$) {
      const timer$ = timer(0, environment.REFRESH_INTERVAL);
      this.store$ = timer$.pipe(
        // tslint:disable-next-line: variable-name
        switchMap(_a => this.storeRequestMembers()),
        shareReplay(environment.CACHE_SIZE) // shareReplay allow sharing of a single subscription for all subscribers
      );
    }
    return this.store$;
  }

  /**
   * Method that performs the http get request and maps the response for subscription
   */
  storeRequestMembers(): Observable<any> {
    return this.http.get('./assets/data-store/store.json').pipe(
      catchError(this.util.handleError),
      map(
        (data: any) => {
          return data.members;
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        })
    );
  }

}
