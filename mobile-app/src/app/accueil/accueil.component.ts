import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from 'src/app/services/api/api.service'
import {ICitizen} from 'src/models/citizen'
import {IdbService} from '../services/idb.service'

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {

  citizen: ICitizen = { 
    citizen_id: "non Disponible , Inscrivez vous !",
    sick_since: null
  }
  constructor(private router: Router, private apiService :ApiService, private indexedDBService :IdbService) {
   
  }

  titleScan: string = 'Commencez à scanner !';
  


  scanhandler() {
    if(localStorage.getItem("idCitizen")){
      this.apiService.signIn().subscribe( data =>{ 
        this.citizen = data;
        localStorage.setItem("idCitizen", this.citizen.citizen_id.toString())
        this.router.navigate(['/scanqr']);
       })
    }else{
      this.router.navigate(['/signin']);
    }
    
    
    console.log(this.citizen)
   
    
  }
}

