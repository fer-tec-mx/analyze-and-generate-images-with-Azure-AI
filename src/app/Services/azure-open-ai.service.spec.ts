import { TestBed } from '@angular/core/testing';

import { AzureOpenAIService } from './azure-open-ai.service';

describe('AzureOpenAIService', () => {
  let service: AzureOpenAIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureOpenAIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
