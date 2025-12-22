import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public get(key: string): any{
    return localStorage?localStorage.getItem(key):null;
  }
  
  public set(key: string, value: any): void{
    localStorage.setItem(key, JSON.stringify(value));
  }

  public remove(key: string): void{
    return localStorage.removeItem(key);
  }


}