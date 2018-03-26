import {ElementRef, Injectable} from '@angular/core';

@Injectable()
export class NavigationService {
  setNavigationBarZIndexToZreo() {
    const element = document.getElementById('navigationView');
    element.style.zIndex = '0';
  }

  setNavigationBarZIndexToZreoToNormal (elementRef: ElementRef) {

  }
}
