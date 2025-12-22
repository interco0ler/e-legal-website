import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../_shared/shared.module';

interface FaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
  open?: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink, SharedModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqs: FaqItem[] = [
    { id: 'q1', questionKey: 'faq.questions.q1.question', answerKey: 'faq.questions.q1.answer', open: false },
    { id: 'q2', questionKey: 'faq.questions.q2.question', answerKey: 'faq.questions.q2.answer', open: false },
    { id: 'q3', questionKey: 'faq.questions.q3.question', answerKey: 'faq.questions.q3.answer', open: false },
    { id: 'q4', questionKey: 'faq.questions.q4.question', answerKey: 'faq.questions.q4.answer', open: false },
    { id: 'q5', questionKey: 'faq.questions.q5.question', answerKey: 'faq.questions.q5.answer', open: false },
    { id: 'q6', questionKey: 'faq.questions.q6.question', answerKey: 'faq.questions.q6.answer', open: false },
    { id: 'q7', questionKey: 'faq.questions.q7.question', answerKey: 'faq.questions.q7.answer', open: false },
    { id: 'q8', questionKey: 'faq.questions.q8.question', answerKey: 'faq.questions.q8.answer', open: false },
    { id: 'q9', questionKey: 'faq.questions.q9.question', answerKey: 'faq.questions.q9.answer', open: false },
    { id: 'q10', questionKey: 'faq.questions.q10.question', answerKey: 'faq.questions.q10.answer', open: false },
  ];

  toggleFaq(faq: FaqItem) {
    faq.open = !faq.open;
  }
}
