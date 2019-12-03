import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Router } from '@angular/router';
import { registeredEvents } from '../../../assets/data-store/addedEvents-mock';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('800ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('500ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.addedEvents();
  }

  /**
   * Set added event to local storage
   */
  addedEvents() {
    localStorage.setItem('addedEvents', JSON.stringify(registeredEvents));
  }
  /**
   * Route to user area
   */
  goto(event) {
    this.router.navigate([`${event}`]);
  }

}
