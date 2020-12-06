import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { QrScannerComponent } from 'angular2-qrscanner';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { IdbService } from '../services/indexedDb/idb.service';
import { IVisit } from '../../models/visit';
import { DatePipe } from '@angular/common';
import { ICovid } from 'src/models/covid';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ScanQrComponent implements OnInit {
  pipe = new DatePipe('en-US');
  uuid_citizen = localStorage.getItem('uuid-citizen');
  isConnected = true;
  visit: IVisit = {
    place_id: '',
    name: '',
    description: '',
    citizen_id: '',
    entrance_date: '',
  };
  covid: ICovid = {
    citizen_id: '',
    medecin_id: '',
    sick_since: '',
  };
  currentDateTest!: string;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private indexedDbService: IdbService
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('uuid-citizen')) {
      alert('Enregistrez-vous !');
      this.router.navigate(['/signin']);
    }
  }
  //QR SCAN --> identify MediaDevice
  @ViewChild(QrScannerComponent) qrScannerComponent!: QrScannerComponent;
  ngAfterViewInit(): void {
    this.qrScannerComponent.getMediaDevices().then((devices) => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('front')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });

    //QR --> identify Type of Qr and send to Back
    this.qrScannerComponent.capturedQr.subscribe((result: string) => {
      alert(result);
      console.log(result);
      let results: string[] = result.split("'");
      let statut: string = results[1];
      switch (statut) {
        case 'place':
          // Initiate Date and Time for scan etablishment
          this.visit.place_id = results[3];
          this.visit.name = results[5];
          this.visit.description = results[7];
          this.visit.citizen_id = this.uuid_citizen!;
          this.currentDateTest = this.pipe.transform(
            Date.now(),
            'yyyy-MM-dd hh:mm:ss'
          )!;
          this.visit.entrance_date = this.currentDateTest!;
          console.log(this.visit);

          this.apiService
            .contact(
              this.uuid_citizen,
              this.visit.place_id,
              this.visit.entrance_date
            )
            .subscribe(
              (data) => {
                alert('Qr code boum visit');
                alert(
                  'QR code scanné le ' +
                    this.visit.entrance_date +
                    ': \nNam : ' +
                    this.visit.name +
                    '\ndescription : ' +
                    this.visit.description
                );
              },
              (error) => {
                if (this.visit.citizen_id != '') {
                  console.log('Oups');
                  alert('');
                  this.indexedDbService
                    .addVisit(this.visit)
                    .then(this.backgroundSyncScanVisit)
                    .catch(console.log);
                } else {
                  console.log('nope');
                }
              }
            );
          break;
        case 'covid':
          //parsing qr code
          console.log('je rentre covid');
          this.covid.citizen_id = this.uuid_citizen!;
          this.covid.medecin_id = results[3];
          this.covid.sick_since = results[5];
          console.log(this.covid);
          this.apiService
            .covid(this.uuid_citizen, this.covid.sick_since)
            .subscribe(
              (data) => {
                alert('le QrCode Covid est bien passé');
              },
              (error) => {
                if (this.covid.citizen_id != '') {
                  console.log(error);
                  alert('Erreur QrCode');
                  this.indexedDbService
                    .addCovid(this.covid)
                    .then(this.backgroundSyncScanCovid)
                    .catch(console.log);
                } else {
                  console.log('nope');
                }
              }
            );

          break;

        default:
          alert('Wrong QrCode');
          break;
      }
    });
  }

  backgroundSyncScanVisit() {
    navigator.serviceWorker.ready
      .then((swRegistration) => swRegistration.sync.register('scan-visit'))
      .catch(console.log);
  }

  backgroundSyncScanCovid() {
    navigator.serviceWorker.ready
      .then((swRegistration) => swRegistration.sync.register('scan-covid'))
      .catch(console.log);
  }
}
