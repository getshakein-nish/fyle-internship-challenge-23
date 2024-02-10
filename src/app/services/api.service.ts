import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userName:string = 'johnpapa';
  apiUrl: string = `https://api.github.com/users/${this.userName}`;
  constructor(
    private httpClient: HttpClient
  ) { }


  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`).pipe(
      tap(response => {
        console.log('Received response:', response);
      }),
      catchError(error => {
        console.error('An error occurred:', error);
        throw error; // Re-throw the error to handle it further
      })
    );
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params
  
  getRepos(url: string) {
    return this.httpClient.get( url , { observe: 'response'}).pipe(
      tap((response) => {
        console.log('Received response:', response.body);
      }),
      catchError(error => {
        console.error('An error occurred:', error);
        throw error; // Re-throw the error to handle it further
      })
    );
  }
}

