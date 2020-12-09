import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) {}
  ngOnInit(): void {
    if (!localStorage.getItem('uuid-citizen')) {
      this.router.navigate(['/home']);
    }
  }

  returnHomeButtonMessage: string = "Revenir à la page d'accueil";
  errorMessage: string = "Quelque chose s'est mal passé";
  errorMessage1: string =
    "Il semble que votre QR code n'est pas valide.\nSi le problème persiste veuillez contacter l'équipe technique";

  homeHandler() {
    this.router.navigate(['/home']);
  }
}
