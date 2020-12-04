import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { QrScannerComponent } from 'angular2-qrscanner';
import { Router } from '@angular/router'
import { ApiService } from '../services/api/api.service';
@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class ScanQrComponent implements OnInit {
  uuid_citizen = localStorage.getItem("idCitizen");
  constructor(private router : Router, private apiService : ApiService){
  
  }
  ngOnInit(){
    if(!localStorage.getItem("idCitizen")){
      alert("Enregistrez-vous !")
      this.router.navigate(['/signin']);
    }
  }

  @ViewChild(QrScannerComponent)  qrScannerComponent!: QrScannerComponent;
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

      this.qrScannerComponent.capturedQr.subscribe((result : string) => {
        //TODO : moyen plus efficace pour retirer l'information qr
        alert(result)
        console.log(result)
        let results : string[] = result.split("\'")
        let idPlace : string = results[1]
        console.log(idPlace)
        this.apiService.contact(this.uuid_citizen,idPlace).subscribe(data =>{ alert("le QrCode est bien passé") }, error =>{ console.log(error);alert("Erreur QrCode")})
      });
      
    }
    
}
