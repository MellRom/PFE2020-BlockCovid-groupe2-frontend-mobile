import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.css'],
})
export class OfflineComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) {}
  ngOnInit(): void {
    if (!localStorage.getItem('uuid-citizen')) {
      this.router.navigate(['/home']);
    }
  }

  returnHomeButtonMessage: string = "Revenir à la page d'accueil";
  offlineMessage: string = "Vous n'êtes pas connecté à internet";
  offlineMessage1: string =
    'Pas de stress :\nVotre scan sera envoyé dès que votre connexion sera revenue';

  homeHandler() {
    this.router.navigate(['/home']);
  }
}
