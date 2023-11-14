import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AzureOpenAIService {
  private readonly subscriptionKey = '';
  private readonly endpoint = '';
  private readonly pathGenerateImages = '/openai/images/generations:submit';
  private readonly pathQueryImages = '/openai/operations/images/';
  private readonly apiVersion = '?api-version=2023-06-01-preview';

  constructor(private http: HttpClient) { }

  generateImage(prompt: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Api-Key': this.subscriptionKey
      })
    };

    const body = {
      prompt,
      n: 1,
      size: "1024x1024"
    };

    const uri = `${this.endpoint}${this.pathGenerateImages}${this.apiVersion}`;
    return this.http.post(uri, body, httpOptions).toPromise();
  }

  getGeneratedImage(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Api-Key': this.subscriptionKey
      })
    };
    const uri = `${this.endpoint}${this.pathQueryImages}${id}${this.apiVersion}`;
    return this.http.get(uri, httpOptions).toPromise();
  }

  async GetImageFromOpenAI(prompt: string): Promise<Observable<any>> {
    const postResponse: any = await this.generateImage(prompt);
    //console.log('postResponse: ', postResponse);
    await new Promise(resolve => setTimeout(resolve, 10000));
    const getResponse: any = await this.getGeneratedImage(postResponse.id);
    //console.log('getResponse: ', getResponse);
    return getResponse;
  }

  isConfigured(): boolean {
    return this.subscriptionKey.length > 0 && this.endpoint.length > 0;
  }
}
