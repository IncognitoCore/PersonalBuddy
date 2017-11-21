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

    public query: string = "";

    constructor(public navCtrl: NavController, private http: Http) {
        this.messages = [
            new Message("Hey Kevin, stel mij al je vragen over de Efteling!", false),
        ];
    }

    public onKeyUp(pressedKey) {
        const returnKeyKeyCode = 13;
        if (pressedKey.keyCode == returnKeyKeyCode) {
            console.log("Return key pressed.");
            this.doRequest();
        }
    }

    private doRequest() {
        const currentQuery = this.query;
        this.query = "";
        console.log("Executing request for query:", currentQuery);
        this.messages.push(new Message(currentQuery, true));

        const httpOptions = {
            headers: new Headers({ 'Authorization': 'Bearer' + this.client_access_token })
        };

        //https://api.dialogflow.com/v1/query?v=20150910&contexts=shop&lang=en&query=apple&sessionId=12345&timezone=America/New_York

        const body = {
            "contexts": [
            ],
            "lang": "nl",
            "query": currentQuery,
            "sessionId": "12345",
            "timezone": "America/New_York"
        };

        this.http.post('https://api.dialogflow.com/v1/query?v=20150910', body, httpOptions)
            .subscribe(data => {

                if(data.status == 200) {
                    const result = data.json().result;
                    console.log(result);
                    if (result.action != 'input.unknown') {
                        this.messages.push(new Message(result.fulfillment.speech, false))
                    } else {
                        console.log("Ik begrijp je niet.");
                        this.messages.push(new Message("Ik begrijp je niet.", true));
                        console.log(result);
                    }
                } else {
                    console.log("Error, status code:", data.status);
                }

            });
            // .catch(error => {
            //
            //     console.log(error.status);
            //     console.log(error.error); // error message as string
            //     console.log(error.headers);
            //
            // });

    }

}
