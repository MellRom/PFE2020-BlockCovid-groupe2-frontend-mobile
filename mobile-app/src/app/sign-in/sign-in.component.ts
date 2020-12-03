import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from 'src/app/services/api/api.service'
import {ICitizen} from 'src/models/citizen'
import {IdbService} from '../services/idb.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {

  citizen: ICitizen = { 
    citizen_id: "non Disponible , Inscrivez vous !",
    sick_since: null
  }
  constructor(private router: Router, private apiService :ApiService, private indexedDBService :IdbService) {
   
  }

  titleSignIn: string = 'Enregistrez vous pour utiliser le QR Code !';
  

  ngOnInit(): void {
    if(localStorage.getItem("idCitizen")){
      console.log("refresh je rentre dedans ")
      console.log(localStorage.getItem("idCitizen"))
      this.router.navigate(['/scanqr']);
    }
  }

  signInhandler() {
    console.log("ok je rentre")
    this.apiService.signIn().subscribe( data =>{ 
     this.citizen = data;
     localStorage.setItem("idCitizen", this.citizen.citizen_id.toString())
     this.router.navigate(['/scanqr']);
    })
    console.log(this.citizen)
   
    
  }
}

