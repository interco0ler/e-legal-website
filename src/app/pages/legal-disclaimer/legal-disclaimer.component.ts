import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../_shared/shared.module';

@Component({
  selector: 'app-legal-disclaimer',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './legal-disclaimer.component.html',
  styleUrl: './legal-disclaimer.component.scss'
})
export class LegalDisclaimerComponent {

}
