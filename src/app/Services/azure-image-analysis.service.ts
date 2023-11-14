import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AzureImageAnalysisService {
  private readonly subscriptionKey = '';
  private readonly endpoint = '';
  private readonly pathImageAnalysis = '/computervision/imageanalysis:analyze';
  private readonly features = '?api-version=2023-02-01-preview&features=tags,read,caption,denseCaptions,smartCrops,objects,people';
  private readonly uri = this.endpoint + this.pathImageAnalysis + this.features;

  constructor(private http: HttpClient) { }

  analyzeImage(imageUrl: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': this.subscriptionKey
      })
    };

    const body = {
      url: imageUrl
    };

    return this.http.post(this.uri, body, httpOptions);
  }

  isConfigured(): boolean {
    return this.subscriptionKey.length > 0 && this.endpoint.length > 0;
  }
}