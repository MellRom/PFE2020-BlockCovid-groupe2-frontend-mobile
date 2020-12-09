import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from './services/webSocketService/web-socket-service.service';
import { PushNotificationsService } from 'ng-push-ivy';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'BlockCovid';
  _this = this;
  private readonly websocketService!: WebSocketService;
  constructor(
    private router: Router,
    private webSocketService: WebSocketService,
    private pushNotification: PushNotificationsService
  ) {
    this.pushNotification.requestPermission();
    let stompClient = this.webSocketService.connect();
    let id = localStorage.getItem('uuid-citizen');
    stompClient.connect({}, (frame) => {
      stompClient.subscribe(
        '/user/' + id + '/covid/notification',
        (notifications) => {
          this.notify(notifications.body);
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
  notify(message: string): void {
    const options = {
      body: message,
    };
    this.pushNotification.create('BlockCovid Alert', options).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
  }

  ngOnInit() {}
}
