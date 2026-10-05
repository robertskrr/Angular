import { Country } from '../interfaces/country.interface';
import { CountryRest } from '../interfaces/rest-country.interface';

export class CountryMapper {
  static mapRestCountryToCountry(country: CountryRest): Country {
    return {
      uuid: country.uuid,
      flag: country.flag.emoji,
      flagSvg: country.flag.url_svg,
      name: country.names.translations['spa'].common ?? 'No Spanish Name',
      capital: country.capitals[0]?.name ?? 'Sin capital',
      population: country.population,
    };
  }

  static mapRestCountryToArray(countries: CountryRest[]): Country[] {
    return countries.map((country) => this.mapRestCountryToCountry(country));
  }
}
