// src/app/models/wp.ts
export interface WpMediaSize { source_url: string; width?: number; height?: number; }
export interface WpEmbeddedMedia {
  source_url?: string;
  media_details?: { sizes?: Record<string, WpMediaSize> };
}

export interface TutorialListItem {
  id: number;
  slug: string;
  date: string;
  title: string;        // já em HTML “rendered”
  thumb: string | null; // URL da imagem destacada (size preferencial)
}

export interface TutorialDetail {
  id: number;
  slug: string;
  date: string;
  title: string;        // HTML
  content: string;      // HTML (rendered)
  thumb: string | null;
  scf?: Record<string, unknown>;
}

export interface WpTerm {
  id: number;
  name: string;
  slug: string;
  count: number;
}
