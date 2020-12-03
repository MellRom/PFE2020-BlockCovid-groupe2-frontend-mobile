import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message/message.service';
import {ICitizen} from '../../../models/citizen'


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  login(username, password) {
    return this.http.post<any>(environment.api_url + '/connexion', { "login": username, "password": password })
  }

  signIn(){
    return this.http.get<ICitizen>(environment.api_url + '/citizen/inscription')
  }
  
}