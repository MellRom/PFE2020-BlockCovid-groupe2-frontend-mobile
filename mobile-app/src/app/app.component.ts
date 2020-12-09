import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from './services/webSocketService/web-socket-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'BlockCovid';
  private readonly websocketService!: WebSocketService;
  constructor(
    private router: Router,
    private webSocketService: WebSocketService
  ) {
    let stompClient = this.webSocketService.connect();
    let id = localStorage.getItem('uuid-citizen');
    stompClient.connect({}, (frame) => {
      stompClient.subscribe(
        '/user/' + id + '/covid/notification',
        (notifications) => {
          alert(notifications.body);
        }
      );
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
