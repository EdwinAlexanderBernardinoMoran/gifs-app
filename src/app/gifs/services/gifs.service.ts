import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey = 'y6lJHsvEGIkn7javATT8FqMNDdotCs94';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  // Inyectando Dependecia de Http
  constructor(private htpp: HttpClient) {
    this.loadLocalStore()
    console.log('Gifs Service Ready');
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStore();
  }

  // async searchTag(tag: string):Promise<void>{

    // if (tag.length === 0) return
    // this.organizeHistory(tag);

    // Alternatica 1.
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=y6lJHsvEGIkn7javATT8FqMNDdotCs94&q=valorant&limit=10')
    //   .then(res => res.json())
    //   .then(data => console.log(data))


    // Alternativa 2
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=y6lJHsvEGIkn7javATT8FqMNDdotCs94&q=valorant&limit=10');
    // const data = await resp.json();

    // this._tagsHistory.unshift(tag);


    // this.htpp.get('https://api.giphy.com/v1/gifs/search?api_key=y6lJHsvEGIkn7javATT8FqMNDdotCs94&q=valorant&limit=10')
    // console.log(this.tagsHistory);
  // }

  private saveLocalStore():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStore():void{
    // Validando si hay data
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    // Validando si hay mas de un elemento en el _tagHistory.
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string):void{
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    // Las interfaces de TypeScript no fuerzan un objeto a ser de una manera.
    this.htpp.get<SearchResponse>(`${this.serviceUrl}/search`,{params}).subscribe(res => {
      // console.log(res.data);
      this.gifList = res.data;
      console.log({gifs: this.gifList});
    })
    console.log(this.tagsHistory);
  }


  // this.htpp.get('https://api.giphy.com/v1/gifs/search?api_key=y6lJHsvEGIkn7javATT8FqMNDdotCs94&q=valorant&limit=10')
}
