import { TestBed } from '@angular/core/testing';

import { AzureImageAnalysisService } from './azure-image-analysis.service';

describe('AzureImageAnalysisService', () => {
  let service: AzureImageAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureImageAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
