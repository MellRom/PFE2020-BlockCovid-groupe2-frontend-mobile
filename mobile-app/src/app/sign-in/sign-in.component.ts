import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  constructor(private router : Router) { }
    titleSignIn : string = "Enregistrez vous pour utiliser le QR Code !"
  ngOnInit(): void {
    
  }

  signInhandler(){
    
    // http request get id 
    // stocker quelque part 
    // if id recu reroute si pas on reste 
    this.router.navigate(['/scanqr'])
  }

  

}
