import SearchParams from "./searchParams";

export default class SearchParamsBuilder {
  withCountry(country) {
    this.country = country;
    return this;
  }
  withCityName(cityName) {
    this.cityName = cityName;
    return this;
  }
  withKeyWords(keyWords) {
    this.keyWords = keyWords;
    return this;
  }
  build() {
    if (!("country" in this)) {
      throw new Error("country is missing");
    }
    if (!("cityName" in this)) {
      throw new Error("city name id is missing");
    }
    if (!("keyWords" in this)) {
      throw new Error("key words is missing");
    }
    return new SearchParams(this.country, this.cityName, this.keyWords);
  }
}
