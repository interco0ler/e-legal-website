import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../_shared/shared.module';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  socials = [
    { href: 'mailto:hello@webdex.io', label: 'E-mail', icon: 'mail' },
    { href: 'https://discord.gg/your-server', label: 'Discord', icon: 'discord' },
    { href: 'https://x.com/your-handle', label: 'X / Twitter', icon: 'x' },
    { href: 'https://instagram.com/your-handle', label: 'Instagram', icon: 'instagram' },
    { href: 'https://youtube.com/@your-channel', label: 'YouTube', icon: 'youtube' },
  ];
}
