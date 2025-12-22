import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChangelogEntry {
  id: string;
  type: 'announcement' | 'content';
  category: 'release' | 'feature' | 'tutorial' | 'announcement' | 'update';
  titleKey: string;
  descriptionKey: string;
  author: string;
  date: string;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChangelogService {

  constructor(private http: HttpClient) { }

  getChangelog(): Observable<ChangelogEntry[]> {
    return this.http.get<ChangelogEntry[]>('/assets/data/changelog.json');
  }

  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'announcement': '📢',
      'content': '📝'
    };
    return icons[type] || '📄';
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'release': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'feature': 'bg-green-500/20 text-green-300 border-green-500/30',
      'tutorial': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'announcement': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      'update': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  }
}
