import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { map, Observable } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://api.restcountries.com/countries/v5';
const token = 'rc_live_2e4b3ad521534384a2da704709886236';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http
      .get<RESTCountry>(`${API_URL}/capitals?q=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map((response) =>
          CountryMapper.mapRestCountryToArray(response.data.objects),
        ),
      );
  }
}
