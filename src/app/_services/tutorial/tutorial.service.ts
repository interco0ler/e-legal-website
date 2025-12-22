import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { WpTerm, TutorialDetail, WpEmbeddedMedia } from '../../_interfaces/tutorials.interface';

export interface WpMedia {
  id: number;
  source_url?: string;
  media_details?: {
    sizes?: Record<string, { source_url: string; width?: number; height?: number }>;
  };
}

export interface TutorialListItem {
  id: number;
  slug: string;
  date: string;
  title: string;        // HTML já "rendered"
  thumb: string | null; // URL da imagem
}

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  public base = 'https://webdex.fyi/wp-json/wp/v2'

  constructor(
    private http: HttpClient
  ) {}

  // ---- categorias ----
  listCategories(): Observable<WpTerm[]> {
    const url = `${this.base}/tutorial_category`;
    const params = new HttpParams().set('per_page', '100').set('orderby', 'name').set('order', 'asc');
    return this.http.get<WpTerm[]>(url, { params });
  }

  getCategoryBySlug(slug: string): Observable<WpTerm | null> {
    const url = `${this.base}/tutorial_category`;
    const params = new HttpParams().set('slug', slug);
    return this.http.get<WpTerm[]>(url, { params }).pipe(map(arr => arr[0] ?? null));
  }

  public getTutorials() {
    return this.http.get<any[]>('https://webdex.fyi/wp-json/wp/v2/tutorial');
  }

  public getPostMedia(thumbID: number) {
    return this.http.get<WpMedia>(`${this.base}/media/${thumbID}`);
  }

  // ---- lista de tutoriais (sem content) ----
  listTutorials(opts: {
    page?: number;
    perPage?: number;
    categoryId?: number;
    search?: string;
    thumbOrder?: string[]; // opcional para preferir tamanhos
  } = {}): Observable<TutorialListItem[]> {
    const url = `${this.base}/tutorial`;
    let params = new HttpParams()
      .set('page', String(opts.page ?? 1))
      .set('per_page', String(opts.perPage ?? 12))
      // ⚠️ Precisamos do ID da mídia destacada
      .set('_fields', 'id,slug,date,title,featured_media');

    if (opts.categoryId) params = params.set('tutorial_category', String(opts.categoryId));
    if (opts.search) params = params.set('search', opts.search);

    const order = opts.thumbOrder ?? ['medium_large', 'large', 'medium', 'thumbnail', 'full'];

    return this.http.get<any[]>(url, { params }).pipe(
      switchMap(rows => {
        const baseItems = rows.map(r => ({
          id: r.id as number,
          slug: r.slug as string,
          date: r.date as string,
          title: (r.title?.rendered ?? '').trim(),
          featured_media: Number(r.featured_media) || 0,
          thumb: null as string | null,
        }));

        const ids = Array.from(
          new Set(baseItems.map(i => i.featured_media).filter(id => id > 0))
        );

        if (ids.length === 0) {
          // ninguém tem featured_media: devolve sem thumb
          return of(baseItems.map(({ featured_media, ...i }) => i));
        }

        // Usa SUA função getPostMedia para cada ID
        const mediaRequests = ids.map(id =>
          this.getPostMedia(id).pipe(catchError(() => of(null)))
        );

        return forkJoin(mediaRequests).pipe(
          map(mediaArray => {
            const byId = new Map<number, WpMedia>();
            for (const m of mediaArray) if (m && m.id) byId.set(m.id, m);

            return baseItems.map(({ featured_media, ...i }) => {
              if (featured_media && byId.has(featured_media)) {
                i.thumb = pickBestThumb(byId.get(featured_media)!, order);
              }
              return i;
            });
          })
        );
      })
    );
  }

  // ---- detalhe do tutorial (com content) ----
  getTutorialBySlug(
    slug: string,
    thumbOrder: string[] = ['large','medium_large','medium','thumbnail','full']
  ): Observable<TutorialDetail | null> {
    const url = `${this.base}/tutorial`;
    const params = new HttpParams()
      .set('slug', slug)
      // não precisamos de _embed aqui; só do featured_media
      .set('_fields', 'id,slug,date,title,content,featured_media');

    return this.http.get<any[]>(url, { params }).pipe(
      switchMap(arr => {
        const r = arr?.[0];
        if (!r) return of(null);

        const base: TutorialDetail = {
          id: r.id,
          slug: r.slug,
          date: r.date,
          title: (r.title?.rendered ?? '').trim(),
          content: r.content?.rendered ?? '',
          thumb: null
        };

        const fm = Number(r.featured_media) || 0;
        if (!fm) return of(base); // sem imagem destacada

        return this.getPostMedia(fm).pipe(
          map(media => ({ ...base, thumb: pickBestThumb(media, ['full']) })),
          catchError(() => of(base)) // se der erro ao buscar mídia, segue sem thumb
        );
      })
    );
  }

  // util para escolher a melhor thumb
  private pickThumb(media?: WpEmbeddedMedia, order: string[] = ['medium_large','medium','thumbnail','full']): string | null {
    const sizes = media?.media_details?.sizes;
    if (sizes) {
      for (const s of order) {
        const hit = sizes[s]?.source_url;
        if (hit) return hit;
      }
    }
    return media?.source_url ?? null;
  }
}

// Helper para escolher o melhor tamanho
function pickBestThumb(media: WpMedia, order: string[]): string | null {
  const sizes = media.media_details?.sizes;
  if (sizes) {
    for (const s of order) {
      const hit = sizes[s]?.source_url;
      if (hit) return hit;
    }
  }
  return media.source_url ?? null;
}