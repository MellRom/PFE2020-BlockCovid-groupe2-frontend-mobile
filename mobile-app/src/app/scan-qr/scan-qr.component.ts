import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { QrScannerComponent } from 'angular2-qrscanner';
import { Router } from '@angular/router'
@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class ScanQrComponent implements OnInit {
  uuid_citizen = localStorage.getItem("idCitizen");
  constructor(private router : Router){
  
  }
  ngOnInit(){
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

      this.qrScannerComponent.capturedQr.subscribe((result : QrScannerComponent) => {
        alert(result)
        // TODO: pop up confirmation infos qr code pour envoyer vers back end
        
        // redirection vers qr Menu -> X scan-qr
        // Ici , sign in juste pour reset le qr scan 
       
      });
      
    }
    
}
