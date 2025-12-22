import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { SharedModule } from '../../_shared/shared.module';
import { LangComponent } from '../../components/language.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule, RouterLink, RouterLinkActive, NgIf, NgClass, LangComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  scrolled = false;
  mobileOpen = false;

  // muda o estado quando rolar a página
  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = (window.scrollY || window.pageYOffset || 0) > 16; 
  }
}
