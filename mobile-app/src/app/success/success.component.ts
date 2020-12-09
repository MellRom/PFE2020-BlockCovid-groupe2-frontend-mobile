import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) {}
  ngOnInit(): void {
    if (!localStorage.getItem('uuid-citizen')) {
      this.router.navigate(['/accueil']);
    }
  }

  returnHomeButtonMessage: string = "Revenir à la page d'accueil";
  successMessage: string = 'Confirmation de votre scan';
  successMessage1: string =
    'Merci pour votre implication !\nEnsemble luttons contre la crise sanitaire !';

  homeHandler() {
    this.router.navigate(['/accueil']);
  }
}
