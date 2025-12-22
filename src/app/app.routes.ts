import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', loadComponent: () => import('./pages/about/about.component').then(c => c.AboutComponent) },
    { path: 'automation', loadComponent: () => import('./pages/automation/automation.component').then(c => c.AutomationComponent) },
    { path: 'faq', loadComponent: () => import('./pages/faq/faq.component').then(c => c.FaqComponent) },
    { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(c => c.ContactComponent) },

    { path: 'tutorials', loadComponent: () => import('./pages/tutorials/tutorials.component').then(c => c.TutorialsComponent) },
    { path: 'tutorials/:slug', loadComponent: () => import('./pages/tutorial-view/tutorial-view.component').then(c => c.TutorialViewComponent) },
    
    { path: 'blog', loadComponent: () => import('./pages/blog/blog.component').then(c => c.BlogComponent) },
    { path: 'blog/:slug', loadComponent: () => import('./pages/post/post.component').then(c => c.PostComponent) },
    
    { path: 'privacy-policy', loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(c => c.PrivacyPolicyComponent) },
    { path: 'legal-disclaimer', loadComponent: () => import('./pages/legal-disclaimer/legal-disclaimer.component').then(c => c.LegalDisclaimerComponent) },
    { path: 'changelog', loadComponent: () => import('./pages/changelog/changelog.component').then(c => c.ChangelogComponent) },
];