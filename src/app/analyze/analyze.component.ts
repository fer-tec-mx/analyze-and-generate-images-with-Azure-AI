import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UrlImageComponent } from '../url-image/url-image.component'; 
import { GenerateImageComponent } from "../generate-image/generate-image.component"; 
import { AnalysisModel } from '../Models/AnalysisModel';
import { SearchResultModel, SearchResultValues } from '../Models/SearchResultModel';
import { AzureImageAnalysisService } from '../Services/azure-image-analysis.service';
import { AzureOpenAIService } from '../Services/azure-open-ai.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-analyze',
  standalone: true,
  imports: [CommonModule, HttpClientModule, UrlImageComponent, GenerateImageComponent],
  templateUrl: './analyze.component.html',
  styleUrl: './analyze.component.css'
})
export class AnalyzeComponent implements OnInit {

  analysis: AnalysisModel = {};
  mode: SearchResultModel = { Active: SearchResultValues.Nothing };
  isLoading = false;
  isConfigured = false;

  constructor(private azureImageAnalysisService: AzureImageAnalysisService, private azureOpenAIService: AzureOpenAIService) { }

  ngOnInit(): void {
    this.isConfigured = this.azureImageAnalysisService.isConfigured() && this.azureOpenAIService.isConfigured();
  }

  analyzeImage(prompt: string): void {
    if (prompt) {
      this.isLoading = true;
      this.azureImageAnalysisService.analyzeImage(prompt).subscribe(
        data => {
          this.analysis = {
            ImageUrl: prompt,
            Response: data
          }
          //console.log('Data:', data);
          this.mode.Active = SearchResultValues.Analysis;
        },
        error => {
          console.error('Error:', error);
          this.mode.Active = SearchResultValues.Nothing;
        }
      );
      this.isLoading = false;
    }
  }

  async generateImage(prompt: string): Promise<void> {    
    if (prompt) {
      this.isLoading = true;
      try {
        const data: any = await this.azureOpenAIService.GetImageFromOpenAI(prompt);
        //console.log('Data:', data);
        this.analysis = {
          ImageUrl: data.result.data[0].url,
          Response: data
        }
        this.mode.Active = SearchResultValues.Generate;
      }
      catch(error){
        console.error('Error:', error);
        this.mode.Active = SearchResultValues.Nothing;
      }
      this.isLoading = false;
    }
  }
}
