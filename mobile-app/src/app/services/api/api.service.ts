import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  JsonpInterceptor,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICitizen } from '../../../models/citizen';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  covid(id_medecin, id_citizen, sick_since) {
    return this.http.post<any>(
      environment.api_url + '/citizen/positive_covid',
      {
        id_qrcode: id_medecin + sick_since,
        citizen_id: id_citizen,
        sick_since: sick_since,
      }
    );
  }

  signIn() {
    return this.http.get<ICitizen>(
      environment.api_url + '/citizen/inscription'
    );
  }

  contact(id_citizen, id_place, entrance_date) {
    return this.http.post<any>(environment.api_url + '/citizen/visit', {
      place: {
        place_id: id_place,
      },
      citizen: {
        citizen_id: id_citizen,
      },
      entrance_date: entrance_date,
    });
  }
}
