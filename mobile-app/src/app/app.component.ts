import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit {
  title = 'BlockCovid';
  private readonly publicKey =
    'BPM_jitU2Z-wBH_54yBJSep0iEYHf3cRV5LsmQonY_ad0Rinc9qo-DpUMYvY0UGeR91Es-Lpl8L-KHZ2PJVMV1o';
  constructor(private router : Router, private swPush: SwPush) { }

  ngOnInit() {
    this.askSubscrition();
    
  }
  askSubscrition() {
    this.swPush.requestSubscription({
      serverPublicKey: this.publicKey
  })
  .then(sub => {
    console.log("notification subscripption ", JSON.stringify(sub))
  })
  .catch(err => console.error("Could not subscribe to notifications", err));
  }
  
  
}
