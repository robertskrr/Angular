import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://api.restcountries.com/countries/v5';
const token = 'rc_live_2e4b3ad521534384a2da704709886236';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    console.log(`Llegando al servidor por ${query}`);

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
        tap((countries) => this.queryCacheCapital.set(query, countries)), // Guarda en caché
        catchError((error) => {
          console.log('Error fetching ', error);
          return throwError(
            () => new Error(`No hay países con ese query: ${query}`),
          );
        }),
      );
  }

  searchByCountry(query: string) {
    const url = `${API_URL}?q=${query}`;
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    console.log(`Llegando al servidor por ${query}`);

    return this.http
      .get<RESTCountry>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map((response) =>
          CountryMapper.mapRestCountryToArray(response.data.objects),
        ),
        tap((countries) => this.queryCacheCountry.set(query, countries)),
        delay(2000),
        catchError((error) => {
          console.log('Error fetching ', error);
          return throwError(
            () => new Error(`No hay países con ese query: ${query}`),
          );
        }),
      );
  }

  searchCountryByAlphaCode(code: string) {
    const url = `${API_URL}/codes.alpha_2/${code}`;

    return this.http
      .get<RESTCountry>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map((response) =>
          CountryMapper.mapRestCountryToArray(response.data.objects),
        ),
        map((countries) => countries.at(0)),
        catchError((error) => {
          console.log('Error fetching ', error);
          return throwError(
            () => new Error(`No hay países con ese código: ${code}`),
          );
        }),
      );
  }
}
