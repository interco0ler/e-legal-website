import { Component } from '@angular/core';
import { SharedModule } from '../../_shared/shared.module';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TutorialCarouselComponent } from '../../components/tutorial-carousel/tutorial-carousel.component';
import { TutorialService } from '../../_services/tutorial/tutorial.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, NgFor, RouterLink, TutorialCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  stats = {
    tvl: '$2M',
    openOps: '2.000',
    performance: 'XX,X%'
  };

  /* tutorials = [
    { titleKey: 'home.tutorials.items.addGas', img: '/assets/tutorials/add-gas.png', link: '/tutorials/add-gas' },
    { titleKey: 'home.tutorials.items.addGas2', img: '/assets/tutorials/add-gas-2.png', link: '/tutorials/add-gas-2' },
    { titleKey: 'home.tutorials.items.addGas3', img: '/assets/tutorials/add-gas-3.png', link: '/tutorials/add-gas-3' }
  ]; */

  advantages = [
    { titleKey: 'home.advantages.sec', descKey: 'home.advantages.secDesc', icon: 'assets/home/carbon_ibm-security-services.svg' },
    { titleKey: 'home.advantages.rt', descKey: 'home.advantages.rtDesc', icon: 'assets/home/gg_timer.svg' },
    { titleKey: 'home.advantages.global', descKey: 'home.advantages.globalDesc', icon: 'assets/home/solar_global-outline.svg' }
  ];


  public tutorials: any;

  constructor(
    private tutorial: TutorialService
  ) {
    this.getList()
  }

  getList() {
    this.tutorial.listTutorials().pipe(take(1)).subscribe({
      next: res => {
        console.log(res)
        this.tutorials = res;
      }
    })
  }
}
