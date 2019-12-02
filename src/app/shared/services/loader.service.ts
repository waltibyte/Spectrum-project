import { Injectable } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#040404';
const backdropbgcolor = 'rgba(255, 255, 255, 1)';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  config() {
    const config = { animationType: ngxLoadingAnimationTypes.chasingDots,
      primaryColour: PrimaryRed,
      secondaryColour: SecondaryBlue,
      tertiaryColour: PrimaryRed,
      // backdropBorderRadius: '3px',
      backdropBackgroundColour: backdropbgcolor,
      fullScreenBackdrop: true
    };
    return config;
  }

  constructor() { }
}
