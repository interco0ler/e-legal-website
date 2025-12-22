import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../_shared/shared.module';
import { RouterLink } from '@angular/router';
import { TutorialService, TutorialListItem } from '../../_services/tutorial/tutorial.service';

@Component({
  selector: 'app-automation',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterLink],
  templateUrl: './automation.component.html',
  styleUrl: './automation.component.scss'
})
export class AutomationComponent implements OnInit {
  tutorials: TutorialListItem[] = [];
  filteredTutorials: TutorialListItem[] = [];
  selectedFilter: string = 'all';
  categories: any[] = [];
  categoryMap: Map<string, number> = new Map();

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadTutorials();
  }

  loadCategories(): void {
    this.tutorialService.listCategories().subscribe({
      next: (cats) => {
        this.categories = cats;
        // Criar mapa slug -> id para facilitar filtros
        cats.forEach(cat => {
          this.categoryMap.set(cat.slug, cat.id);
        });
      },
      error: (err: any) => console.error('Error loading categories:', err)
    });
  }

  loadTutorials(categoryId?: number): void {
    this.tutorialService.listTutorials({ categoryId }).subscribe({
      next: (data: TutorialListItem[]) => {
        this.tutorials = data;
        this.filteredTutorials = data;
      },
      error: (err: any) => console.error('Error loading tutorials:', err)
    });
  }

  filterTutorials(filter: string): void {
    this.selectedFilter = filter;

    if (filter === 'all') {
      this.loadTutorials(); // Recarrega todos os tutoriais
    } else {
      const categoryId = this.categoryMap.get(filter.toLowerCase());
      if (categoryId) {
        this.loadTutorials(categoryId); // Carrega tutoriais filtrados por categoria
      }
    }
  }
}
