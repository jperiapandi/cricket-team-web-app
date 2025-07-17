import { Route, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

export const HomePageRoute: Route = {
  path: '',
  component: HomePageComponent,
};

export const AboutPageRoute: Route = {
  path: 'about',
  component: AboutPageComponent,
};
export const routes: Routes = [HomePageRoute, AboutPageRoute];
