import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {
  constructor(private router: Router, private apiService: ApiService) {}

  titleScan: string =
    'Protégez-vous, protégez vos proches, protégez les autres !';
  warningMessage: string = 'Rappel des mesures sanitaires covid :';

  warningsString: string[] = [
    'Se laver les mains régulièrement',
    'Appliquer les distances de sécurité de 1,5m',
    'Eternuer dans le pli du coude',
    'Le port du masque obligatoire',
    'limiter vos contacts rapprochés autant que possible'
  ];

  scanhandler() {
    if (localStorage.getItem('uuid-citizen')) {
      console.log(
        "j'essaye de rentrer dans accueil avec uuuid -> redirection scan"
      );
      this.router.navigate(['/scanqr']);
    } else {
      this.router.navigate(['/signin']);
    }
  }
}
