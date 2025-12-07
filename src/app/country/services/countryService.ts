import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../interface/country.interface';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = 'https://restcountries.com/v3.1';
  private http= inject(HttpClient);
  private _regions=['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  get regions() {
    return [...this._regions];
  }
  getCountriesByRegion(region: string): Observable<Country[]> {
    if(!region) return of([]);
    return this.http.get<Country[]>(`${this.baseUrl}/region/${region}`);
  }
  getCountryByAlphaCode(code: string): Observable<Country> {
  
    return this.http.get<Country>(`${this.baseUrl}/alpha/${code}?fields=cca3,name,borders`);
  }
  getCountryNamesByCodeArray(countryCodes: string[]): Observable<Country[]> {
    if(!countryCodes || countryCodes.length === 0) return of([]);
    const countriesRequests:Observable<Country>[]=[];
    countryCodes.forEach(code => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    });
    return combineLatest(countriesRequests);
  }
}
