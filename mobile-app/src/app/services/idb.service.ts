import { Injectable } from '@angular/core';
import { DBSchema, IDBPDatabase, openDB} from "idb"
@Injectable({
  providedIn: 'root'
})
export class IdbService {
 /* private db: IDBPDatabase<MyDB>;
  constructor() {
    this.connectToDb()
  }

  async connectToDb(){
    this.db = await openDB<MyDB>('myDb', 1, {
      upgrade(db){
        db.createObjectStore('citizen-store');
      }
    })
  }

  addId(id: string){
    return this.db.put('citizen-store', id, 'idCitizen');
  }
  getId(){
    return this.db.get('citizen-store','idCitizen');
  }

}
interface MyDB extends DBSchema {
   'citizen-store':{
    key: string;
    value: string;
   }
   */
}

