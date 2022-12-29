/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FbNominationsService } from './fbNominations.service';

describe('Service: FbNominations', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FbNominationsService]
    });
  });

  it('should ...', inject([FbNominationsService], (service: FbNominationsService) => {
    expect(service).toBeTruthy();
  }));
});
