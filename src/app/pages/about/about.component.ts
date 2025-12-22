import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../_shared/shared.module';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, SharedModule],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  heroImg = '/assets/about/hero.png';

  cards = [
    {
      titleKey: 'about.blocks.movement.title',
      textKey: 'about.blocks.movement.text',
      img: '/assets/about/movement.jpg',
      reverse: false
    },
    {
      titleKey: 'about.blocks.mission.title',
      textKey: 'about.blocks.mission.text',
      img: '/assets/about/mission.jpg',
      reverse: true
    },
    {
      titleKey: 'about.blocks.drivers.title',
      textKey: 'about.blocks.drivers.text',
      img: '/assets/about/drivers.jpg',
      reverse: false
    },
    {
      titleKey: 'about.blocks.vision.title',
      textKey: 'about.blocks.vision.text',
      img: '/assets/about/vision.jpg',
      reverse: true
    },
  ];

  pillars = [
    { icon: '🔍', titleKey: 'about.pillars.transparency.title', textKey: 'about.pillars.transparency.text' },
    { icon: '⚙️', titleKey: 'about.pillars.tech.title', textKey: 'about.pillars.tech.text' },
    { icon: '🧭', titleKey: 'about.pillars.decentral.title', textKey: 'about.pillars.decentral.text' },
    { icon: '🎓', titleKey: 'about.pillars.education.title', textKey: 'about.pillars.education.text' },
    { icon: '🎯', titleKey: 'about.pillars.purpose.title', textKey: 'about.pillars.purpose.text' }
  ];

  teamImg = '/assets/about/team.png';
}
