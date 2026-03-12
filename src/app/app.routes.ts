import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    // Rota Principal (Home) carregada direto
    { path: '', component: HomeComponent },
    
    // Nossas páginas oficiais com Lazy Loading
    { path: 'blog', loadComponent: () => import('./pages/blog/blog.component').then(c => c.BlogComponent) },
    { path: 'comunidade', loadComponent: () => import('./pages/comunidade/comunidade.component').then(c => c.ComunidadeComponent) },
    { path: 'contato', loadComponent: () => import('./pages/contato/contato.component').then(c => c.ContatoComponent) },
    { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent) },
    { path: 'faq', loadComponent: () => import('./pages/faq/faq.component').then(c => c.FaqComponent) },
    { path: 'instituto', loadComponent: () => import('./pages/instituto/instituto.component').then(c => c.InstitutoComponent) },
];