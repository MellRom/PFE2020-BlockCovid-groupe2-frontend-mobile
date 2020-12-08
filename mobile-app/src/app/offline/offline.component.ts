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
      this.router.navigate(['/accueil']);
    }
  }

  titleScan: string =
    "Revenir à la page d'accueil";
  warningMessage: string = "Vous n'êtes pas connecté à internet";

  warning: string="Pas de stress :";
  warning2: string="Votre scan sera envoyé dès que vous vous connecterez";

  scanhandler() {
    
      this.router.navigate(['/accueil']);
    
  }
}
