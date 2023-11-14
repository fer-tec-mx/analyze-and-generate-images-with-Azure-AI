import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisModel } from '../Models/AnalysisModel';

@Component({
  selector: 'app-url-image',
  templateUrl: './url-image.component.html',
  styleUrls: ['./url-image.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class UrlImageComponent{
  @Input() analysis!: AnalysisModel;
}