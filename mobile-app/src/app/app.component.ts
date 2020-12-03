import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  title = 'BlockCovid App';
  constructor(private router : Router) { }
  scanHandler(){
    
    // http request get id 
    // stocker quelque part 
    // if id recu reroute si pas on reste 
    this.router.navigate(['/scanqr'])
  }
}
