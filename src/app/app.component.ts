import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./theme/header/header.component";
import { FooterComponent } from "./theme/footer/footer.component";
import { LangService } from './_services/lang/lang.service';
import { filter } from 'rxjs';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'site_webdex';
  
  constructor(
    private lang: LangService,
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) {
    this.lang.getSavedLang();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }
}
