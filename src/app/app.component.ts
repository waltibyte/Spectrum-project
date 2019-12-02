import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd, NavigationError, RouterOutlet } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'spectrumProject';
  today = new Date();
  public loading = true;
  config: any;

  constructor(private router: Router, private loaderService: LoaderService) {
    this.config = this.loaderService.config();
}

  ngOnInit() {
    /** spinner starts on init */
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.loading = false;
    }, 5000);
  }
}
