import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../environments/environment';

@Injectable()
export class WebSocketService {
  private serverUrl = environment.api_url + '/socket';

  private stompClient;
  public mapEndpointSubscription: Map<string, any> = new Map();

  public connect() {
    const id = localStorage.getItem('uuid-citizen');
    // let socket = new SockJS(`http://localhost:8080/socket?token=${id}`);
    let socket = new SockJS(this.serverUrl);

    let stompClient = Stomp.over(socket);

    return stompClient;
  }
}
