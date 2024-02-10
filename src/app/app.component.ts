import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title:string = 'fyle-frontend-challenge';
  user:any;
  repos:any;
  show: boolean = false;
  loader: boolean = true;
  userName:string = 'johnpapa';
  url: string = `https://api.github.com/users/johnpapa/repos`;

  perPageRepository: string = "10";

  nextPage: string | null = null;
  prevPage: string | null = null;

  parseLinkHeader(linkHeader: string | null): void {
    if (!linkHeader) return;
    const links = linkHeader.split(',');
    links.forEach((link) => {
      const [url, rel] = link.split(';');
      const pageUrl = url.trim().slice(1, -1);
      if (rel.includes('next')) {
        this.nextPage = pageUrl;
      } else if (rel.includes('prev')) {
        this.prevPage = pageUrl;
      }
    });
  }

  getNextPage(): void {
    if (this.nextPage) {
      console.log('Next page: ',this.nextPage);
      this.setRepos(this.nextPage);
    }
  }

  getPrevPage(): void {
    if (this.prevPage) {
      console.log('Prev page: ',this.prevPage)
      this.setRepos(this.prevPage);
    }
  }

  updateData(item:string){
    this.userName = item
    this.setUser(item);
    this.url = `https://api.github.com/users/${item}/repos?per_page=${this.perPageRepository}`;
    this.setRepos(this.url)
  }

  perPageRepoData(perPageRepo: string){
    this.perPageRepository = perPageRepo
    this.url = `https://api.github.com/users/${this.userName}/repos?per_page=${this.perPageRepository}`;
    this.setRepos(this.url)
  }

  setRepos(url: string){
    this.loader=true;
    this.apiService.getRepos(url).subscribe((response)=>{
      this.repos = response.body || [];
      const linkHeader = response.headers.get('Link');
      this.parseLinkHeader(linkHeader);
      this.loader = false;
    });
  }

  setUser(item: string){
    this.apiService.getUser(`${item}`).subscribe((response)=>{
      this.user = response;
      this.loader = false;
      this.show = true;

    }, (error) => {
      this.show = false;
      this.loader = false;
    });
  }

  constructor(
    private apiService: ApiService
  ) 
  { }

  ngOnInit() {
    this.apiService.getUser(`${this.userName}`).subscribe((response)=>{
      this.user = response;
      this.loader=false;
    });

    this.apiService.getRepos(this.url).subscribe((response)=>{
      this.repos = response;
      this.loader=false;
    });
  }

}
