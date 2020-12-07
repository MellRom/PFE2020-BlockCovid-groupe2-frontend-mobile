import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ICitizen } from 'src/models/citizen';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {

  constructor(private router: Router, private apiService: ApiService) {}

  titleScan: string = 'Commencez à scanner !';

  

  scanhandler() { 
    if (localStorage.getItem('uuid-citizen')) {
      console.log(
        "j'essaye de rentrer dans accueil avec uuuid -> redirection scan"
      );
      this.router.navigate(['/scanqr']);
    }else{
      this.router.navigate(['/signin']);
    }
      
  }
}
