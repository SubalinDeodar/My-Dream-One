import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent {
  title = 'my-app';
  dontShow = false;
  name:any = ''
  currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')
  constructor(private primengConfig: PrimeNGConfig, private datePipe: DatePipe, private router: Router) {
    setInterval(() => {
      this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')
    })
  }

  ngOnInit() {
      this.primengConfig.ripple = true;
      this.name = ''
  }

  updateDontShow(event: any) {
    console.log(event)
    this.dontShow = event
    if(event) {
    this.name = localStorage.getItem('name')
    this.router.navigate(['/dashboard'])
    }
  }

  ngOnChanges() {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy:MM:dd HH:mm:ss')
  }
}
