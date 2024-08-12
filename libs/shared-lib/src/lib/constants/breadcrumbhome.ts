import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
  export class breadCrumbHome {
    constructor(
        private rout:ActivatedRoute
    ){
       
    }
    link:string
    setHomeLink(link:string){
        this.link=link
    }
    getHomeLink(){
        
        console.log(this.rout.snapshot , "this.rout.snapshot");
        
        return this.link
    }
  }