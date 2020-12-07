import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ICitizen } from 'src/models/citizen';
import { IdbService } from '../services/indexedDb/idb.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  citizen: ICitizen = {
    citizen_id: 'non Disponible , Inscrivez vous !'
  };
  constructor(private router: Router, private apiService: ApiService, private indexedDbService : IdbService) {}

  titleSignIn: string = 'Enregistrez vous pour utiliser le QR Code !';

  ngOnInit(): void {
    if (localStorage.getItem('uuid-citizen')) {
      console.log('refresh je rentre dedans ');
      this.router.navigate(['/scanqr']);
    }
  }

  signInhandler() {
    this.apiService.signIn().subscribe(
      (data) => {
        this.citizen = data;
        // utile pour push notification
        this.indexedDbService.addCitizen(this.citizen)
        localStorage.setItem(
          'uuid-citizen',
          this.citizen.citizen_id.toString()
        );
        this.router.navigate(['/scanqr']);
      },
      (error) =>
        alert('Veuillez vous connecter sur Internet pour vous inscrire')
    );
  }
}
