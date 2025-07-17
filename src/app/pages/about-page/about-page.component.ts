import { Component, inject } from '@angular/core';
import { IconButtonDirective } from '../../directives/icon.button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-page',
  imports: [IconButtonDirective],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
})
export class AboutPageComponent {
  private r = inject(Router);
  onBackClick() {
    this.r.navigate(['']);
  }
}
