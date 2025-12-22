import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../_shared/shared.module';
import { ChangelogService, ChangelogEntry } from '../../_services/changelog/changelog.service';

@Component({
  selector: 'app-changelog',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './changelog.component.html',
  styleUrl: './changelog.component.scss'
})
export class ChangelogComponent implements OnInit {
  changelog: ChangelogEntry[] = [];
  filteredChangelog: ChangelogEntry[] = [];
  selectedType: string = 'all';
  selectedCategory: string = 'all';

  constructor(public changelogService: ChangelogService) {}

  ngOnInit() {
    this.changelogService.getChangelog().subscribe({
      next: (data) => {
        this.changelog = data.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        this.filteredChangelog = this.changelog;
      },
      error: (err) => console.error('Error loading changelog:', err)
    });
  }

  filterByType(type: string) {
    this.selectedType = type;
    this.applyFilters();
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredChangelog = this.changelog.filter(entry => {
      const typeMatch = this.selectedType === 'all' || entry.type === this.selectedType;
      const categoryMatch = this.selectedCategory === 'all' || entry.category === this.selectedCategory;
      return typeMatch && categoryMatch;
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
