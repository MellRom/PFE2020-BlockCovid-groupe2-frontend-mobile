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
      this.router.navigate(['/accueil']);
    }
  }

  titleScan: string =
    "Revenir à la page d'accueil";
  warningMessage: string = "Quelque chose s'est mal passé";

  warning: string="Il semble que votre QR code n'est pas valide =(";
  warning2: string="Si le problème persiste veuillez contacter l'équipe technique";

  scanhandler() {
    
      this.router.navigate(['/accueil']);
    
  }
}
