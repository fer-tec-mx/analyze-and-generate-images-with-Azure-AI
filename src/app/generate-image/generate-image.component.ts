import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisModel } from '../Models/AnalysisModel';

@Component({
  selector: 'app-generate-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generate-image.component.html',
  styleUrl: './generate-image.component.css'
})
export class GenerateImageComponent {
  @Input() analysis!: AnalysisModel;
}
