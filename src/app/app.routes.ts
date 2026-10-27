import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'TechPrep',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'topic/:id',
    title: 'Topic · TechPrep',
    loadComponent: () => import('./pages/topic/topic').then((m) => m.TopicDetail),
  },
  {
    path: 'practice',
    title: 'Practice · TechPrep',
    loadComponent: () => import('./pages/practice/practice').then((m) => m.Practice),
  },
  {
    path: 'flashcards',
    title: 'Flashcards · TechPrep',
    loadComponent: () => import('./pages/flashcards/flashcards').then((m) => m.Flashcards),
  },
  {
    path: 'quiz',
    title: 'Quiz · TechPrep',
    loadComponent: () => import('./pages/quiz/quiz').then((m) => m.Quiz),
  },
  {
    path: 'mock',
    title: 'Mock Interview · TechPrep',
    loadComponent: () => import('./pages/mock/mock').then((m) => m.MockInterview),
  },
  {
    path: 'kbc',
    title: 'KBC · TechPrep',
    loadComponent: () => import('./pages/kbc/kbc').then((m) => m.Kbc),
  },
  { path: '**', redirectTo: '' },
];
