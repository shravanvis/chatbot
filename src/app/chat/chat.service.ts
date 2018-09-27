import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import { ApiAiClient } from 'api-ai-javascript';

import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class Message{
  constructor(public content: string, public sentBy: string){}  
}


export class ChatService {

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({accessToken: this.token});

  conversation = new BehaviorSubject<Message[]>([]);

  constructor() { }

// Adds message to source
  update(msg: Message){
    this. conversation.next([msg]);
  }

// Sends and Receive messages via DialogFlow
  converse(msg: string){
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

     return this.client.textRequest(msg)
                .then(res => {
                  const speech = res.result.fulfillment.speech;
                  const botMessage = new Message(speech, 'bot');
                  this.update(botMessage)
                })
  }


}
