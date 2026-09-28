import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuHeaderComponent } from '../../components/side-menu-header/side-menu-header.component';
import { SideMenuOptionsComponent } from '../../components/side-menu-options/side-menu-options.component';

@Component({
  selector: 'dashboard-page',
  imports: [
    RouterOutlet,
    SideMenuHeaderComponent,
    SideMenuOptionsComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardPageComponent {}
