import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css'],
})
export class CovidComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) {}
  ngOnInit(): void {
    if (!localStorage.getItem('uuid-citizen')) {
      this.router.navigate(['/home']);
    }
  }

  returnHomeButtonMessage: string = "Revenir à la page d'accueil";
  covidMessage: string = 'Vous avez été infecté';
  covidMessage1: string =
    'Il semble que vous êtes positif au covid.\nVeuillez vous mettre en quarantaine au minimum 10 jours.\nForce à vous !';

  homeHandler() {
    this.router.navigate(['/home']);
  }
}
