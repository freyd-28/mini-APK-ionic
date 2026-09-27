import { Component } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { peopleOutline, pricetagsOutline, cubeOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  constructor(private auth: AuthService, private router: Router) {
    addIcons({ peopleOutline, pricetagsOutline, cubeOutline });

    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }
}
