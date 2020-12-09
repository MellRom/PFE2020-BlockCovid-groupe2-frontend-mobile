import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { WebSocketService } from './services/webSocketService/web-socket-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'BlockCovid';
  private readonly websocketService!: WebSocketService;
  //public notification : string = ""
  constructor(
    private router: Router,
    private swPush: SwPush,
    private webSocketService: WebSocketService
  ) {
    let stompClient = this.webSocketService.connect();
    stompClient.connect({}, (frame) => {
      /*  stompClient.subscribe('/user/covid/notification', notifications => {
          console.log(notifications)
       })*/
      stompClient.subscribe('/covid/notification', (notifications) => {
        console.log(notifications.body);
        let id = localStorage.getItem('uuid-citizen');
        let setId = JSON.parse(notifications.body);
        console.log(setId);
        for (let index = 0; index < setId.length; index++) {
          console.log(setId[index]);
          console.log(id);
          if (setId[index] === id) {
            console.log('coucou');
            //  this.notification = "Vous avez été récemment en contact avec une personne malade,\nMerci de prendre les mesures necessaires"
            alert(
              'Vous avez été récemment en contact avec une personne malade,\nMerci de prendre les mesures necessaires'
            );
            //   return;
          }
        }
      });
    });
  }
  onClickHandler() {
    if (this.router.url !== '/accueil') {
      alert('Vous serez redirigé vers la page des mesures sanitaires');
      this.router.navigate(['/accueil']);
    }
  }

  ngOnInit() {}
}
