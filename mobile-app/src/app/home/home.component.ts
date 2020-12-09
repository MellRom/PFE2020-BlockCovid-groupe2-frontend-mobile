import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router, private apiService: ApiService) {}

  HomeButtonMessage: string =
    'Protégez-vous, protégez vos proches, protégez les autres !';
  preventionMessage: string = 'Rappel des mesures sanitaires covid :';

  preventionsString: string[] = [
    'Se laver les mains régulièrement',
    'Appliquer les distances de sécurité de 1,5m',
    'Eternuer dans le pli du coude',
    'Le port du masque obligatoire',
    'limiter vos contacts rapprochés autant que possible',
  ];

  homeHandler() {
    if (localStorage.getItem('uuid-citizen')) {
      this.router.navigate(['/scanqr']);
    } else {
      this.router.navigate(['/signin']);
    }
  }
}
