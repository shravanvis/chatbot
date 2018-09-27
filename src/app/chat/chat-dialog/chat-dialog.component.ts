import { ChatService, Message } from './../chat.service';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/scan';
import { scan } from 'rxjs/operators';


@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;

  constructor(public chat: ChatService, ) { }

  ngOnInit(){
    // appends to array after each such message is added to feedstore
    this.messages = this.chat.conversation.asObservable()
        .scan( (acc, val) => acc.concat(val) )
  }   

  sendMessages(){
    this.chat.converse(this.formValue);
    this.formValue = '';
  }
}
