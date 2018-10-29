import { TestBed, inject } from '@angular/core/testing';

import { ComponentParserService } from './content-capture.service';

describe('ComponentParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentParserService]
    });
  });

  it('should be created', inject([ComponentParserService], (service: ComponentParserService) => {
    expect(service).toBeTruthy();
  }));
});
