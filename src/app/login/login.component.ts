import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  loggedIn: boolean = false;
  @Output() loggedInFlag = new EventEmitter<boolean>()

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  login() {
    if(this.username && this.password) {
    this.loggedIn = true
    this.loggedInFlag.emit(true)
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged In Successfully' });
    } else {
      this.loggedIn = false
      this.loggedInFlag.emit(false)
      this.messageService.add({ severity: 'error', summary: 'Warning', detail: 'Enter a valid username and password' });
    }
  }

}
