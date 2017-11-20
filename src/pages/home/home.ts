import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Message } from "../../message/message";
import { Http } from "@angular/http";
import { Headers } from '@angular/http';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public messages: [Message];
    private api_url = "https://api.dialogflow.com/v1/";
    private client_access_token = "fc780a693fc74b1c847a99bdbdcbb850";
    private developer_access_token = "0b465c64ade544deb24ccfc63a994f0d";

    constructor(public navCtrl: NavController, private http: Http) {
        this.messages = [
            new Message("Hello there!", true),
            new Message("Hi Kevin", false),
            new Message("How are you?", true),
            new Message("I am good, fine?", false)
        ];
    }

    public onKeyUp(pressedKey) {
        const returnKeyKeyCode = 13;
        if (pressedKey.keyCode == returnKeyKeyCode) {
            console.log("Return key pressed.");
            this.doRequest();
        } else {
            console.log("Another key pressed.", pressedKey.keyCode);
        }
    }

    private doRequest() {
        console.log("Executing request.");

        const httpOptions = {
            headers: new Headers({ 'Authorization': 'Bearer' + this.client_access_token })
        };

        this.http.get('https://api.dialogflow.com/v1/query?v=20150910&contexts=shop&lang=en&query=apple&sessionId=12345&timezone=America/New_York', httpOptions)
            .subscribe(data => {

                console.log(data.status);
                // console.log(data.data); // data received by server
                console.log(data.headers);

            })
            // .catch(error => {
            //
            //     console.log(error.status);
            //     console.log(error.error); // error message as string
            //     console.log(error.headers);
            //
            // });

    }

}
