import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule 
      ],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from API', () => {
    const testData = { id: 1, name: 'Test Data' };
    const userName = 'johnpapa';
    service.getUser(userName).subscribe(data => {
      expect(data).toEqual(testData);
    });
    const req = httpMock.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);

  });

  it('should fetch data from API', () => {
    const testData = { id: 1, name: 'Test Data' };
    const url = `https://api.github.com/users/johnpapa/repos`;
    service.getRepos(url).subscribe(data => {
      expect(data.body).toEqual(testData);
    });
    const req = httpMock.expectOne(`${service.apiUrl}/repos`);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('should handle errors when fetching data from API', () => {
    const errorMessage = 'Server error';
    const userName = 'johnpapa';
    
    service.getUser(userName).subscribe({
      next: () => fail('Expected an error, but got a successful response'),
      error: (error) => {
        expect(error).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toEqual('GET');
    req.error(new ErrorEvent('error', { message: errorMessage }));
  });

  it('should handle errors when fetching data from API', () => {
    const errorMessage = 'Server error';
    const url = `https://api.github.com/users/johnpapa/repos`;

    service.getRepos(url).subscribe({
      next: () => fail('Expected an error, but got a successful response'),
      error: (error) => {
        expect(error).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${service.apiUrl}/repos`);
    expect(req.request.method).toEqual('GET');
    req.error(new ErrorEvent('error', { message: errorMessage }));
  });

});
