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
      this.router.navigate(['/accueil']);
    }
  }

  titleScan: string =
    "Revenir à la page d'accueil";
  warningMessage: string = "Vous avez été infecté";

  warning: string="Il semble que vous soyez infecté ";
  warning2: string="Veuillez vous quarantiner chez vous pendant une semaine minimum.";

  scanhandler() {
    
      this.router.navigate(['/accueil']);
    
  }
}
