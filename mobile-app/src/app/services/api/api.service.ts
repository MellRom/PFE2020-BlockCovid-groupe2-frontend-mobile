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
  

    covid(id_citizen) {
    return this.http.post<any>(environment.api_url + '/citizen/positive_covid', { "citizen_id": id_citizen})
  }

  signIn(){
    return this.http.get<ICitizen>(environment.api_url + '/citizen/inscription')
  }
    contact(id_citizen,id_place){
        return this.http.post<any>(environment.api_url + '/citizen/visit', { "place_id": id_place, "citizen_id": id_citizen })
    }
  
}