import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <!-- <input type="text" class="form-control" placeholder="Buscar gifs..." (keyup.enter)="searchTag(txtTagInput.value)" #txtTagInput> -->

    <input type="text" class="form-control" placeholder="Buscar gifs..." (keyup.enter)="searchTag()" #txtTagInput>
  `
})

export class SearchBoxComponent{

  @ViewChild('txtTagInput')

  // Non Null Operation
  // El ! significa que siempre obtendra el valor
  public tagInput!: ElementRef<HTMLInputElement>;
  constructor(private gifsService:GifsService) {}

  // searchTag(newTag: string){
  //   console.log({newTag});
  // }

  searchTag(){
    const newTag = this.tagInput.nativeElement.value
    console.log({newTag});

    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = ''
  }
}

// 1. Para mandar a llamar el servicio hay que inyectarlo atravez de el constructor
