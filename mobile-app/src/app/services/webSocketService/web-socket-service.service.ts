import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../environments/environment';

@Injectable()
export class WebSocketService {
  private serverUrl = environment.api_url + '/socket';
  public connect() {
    let socket = new SockJS(this.serverUrl);
    let stompClient = Stomp.over(socket);
    return stompClient;
  }
}
