import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  isMobile: boolean;

  constructor() {
    this.isMobile = Capacitor.getPlatform() === 'ios' || Capacitor.getPlatform() === 'android';
  }
}
