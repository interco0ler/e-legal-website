import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface WordPressPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  featured_image_url?: string;
  categories?: any[];
  tags?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class WordpressService {
  private apiUrl = 'https://your-wordpress-site.com/wp-json/wp/v2'; // Substitua pela URL do WordPress

  constructor(private http: HttpClient) { }

  getTutorials(): Observable<WordPressPost[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts?categories=tutorials&_embed`).pipe(
      map(posts => posts.map(post => ({
        id: post.id,
        title: post.title.rendered,
        slug: post.slug,
        content: post.content.rendered,
        excerpt: post.excerpt.rendered,
        date: post.date,
        featured_image_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
        categories: post._embedded?.['wp:term']?.[0],
        tags: post._embedded?.['wp:term']?.[1]
      })))
    );
  }

  getTutorialBySlug(slug: string): Observable<WordPressPost | undefined> {
    return this.http.get<any[]>(`${this.apiUrl}/posts?slug=${slug}&_embed`).pipe(
      map(posts => {
        if (posts.length === 0) return undefined;
        const post = posts[0];
        return {
          id: post.id,
          title: post.title.rendered,
          slug: post.slug,
          content: post.content.rendered,
          excerpt: post.excerpt.rendered,
          date: post.date,
          featured_image_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
          categories: post._embedded?.['wp:term']?.[0],
          tags: post._embedded?.['wp:term']?.[1]
        };
      })
    );
  }

  getBlogPosts(): Observable<WordPressPost[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts?categories=blog&_embed`).pipe(
      map(posts => posts.map(post => ({
        id: post.id,
        title: post.title.rendered,
        slug: post.slug,
        content: post.content.rendered,
        excerpt: post.excerpt.rendered,
        date: post.date,
        featured_image_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
        categories: post._embedded?.['wp:term']?.[0],
        tags: post._embedded?.['wp:term']?.[1]
      })))
    );
  }

  getPostBySlug(slug: string): Observable<WordPressPost | undefined> {
    return this.http.get<any[]>(`${this.apiUrl}/posts?slug=${slug}&_embed`).pipe(
      map(posts => {
        if (posts.length === 0) return undefined;
        const post = posts[0];
        return {
          id: post.id,
          title: post.title.rendered,
          slug: post.slug,
          content: post.content.rendered,
          excerpt: post.excerpt.rendered,
          date: post.date,
          featured_image_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
          categories: post._embedded?.['wp:term']?.[0],
          tags: post._embedded?.['wp:term']?.[1]
        };
      })
    );
  }
}
