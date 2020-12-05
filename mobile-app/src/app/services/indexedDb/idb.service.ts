import { Injectable } from '@angular/core';
import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { ICovid } from 'src/models/covid';
import { IVisit } from 'src/models/visit';

@Injectable({
  providedIn: 'root',
})
export class IdbService {
  private db!: IDBPDatabase<MyDB>;
  constructor() {
    this.connectToDb();
  }

  async connectToDb() {
    this.db = await openDB<MyDB>('myDb', 1, {
      upgrade(db) {
        db.createObjectStore('scan-visit');
        db.createObjectStore('scan-covid');
      },
    });
  }

  addVisit(visit: IVisit) {
    let visitString: string = JSON.stringify(visit);
    return this.db.put(
      'scan-visit',
      visitString,
      visit.place_id + visit.entrance_date
    );
  }

  addCovid(covid: ICovid) {
    let covidString: string = JSON.stringify(covid);
    return this.db.put('scan-covid', covidString, 'covid');
  }
}

interface MyDB extends DBSchema {
  'scan-visit': {
    key: string;
    value: string;
  };
  'scan-covid': {
    key: string;
    value: string;
  };
}
