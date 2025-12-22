import { Component } from '@angular/core';
import { TutorialService } from '../../_services/tutorial/tutorial.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { SharedModule } from '../../_shared/shared.module';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-tutorial-view',
  imports: [
    SharedModule,
    DatePipe
  ],
  templateUrl: './tutorial-view.component.html',
  styleUrl: './tutorial-view.component.scss'
})
export class TutorialViewComponent {

  public loading: boolean = true;
  public data: any;

  constructor(
    private tutorial: TutorialService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.activatedRoute.params.subscribe({
      next: (params:any) => {
        if (params.slug) {
          this.fectchTutorial(params.slug);
        }
      }
    })
  }

  back() {
    this.location.back();
  }

  fectchTutorial(slug: string) {
    this.loading = true;
    this.tutorial.getTutorialBySlug(slug)
      .pipe(take(1))
      .subscribe({
        next: res => {
          console.log(res)
          this.data = res;
          this.loading = false;
        }
      })
  }

}
