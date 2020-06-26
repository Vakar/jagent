const { BAD_REQUEST } = require("../constants/httpCodes");
const fetch = require("node-fetch");

const VACANCY_SEARCH_URL = "https://api.rabota.ua/vacancy/search";
const VACANCY_URL = "https://api.rabota.ua/vacancy";
const CITIES_URL = "https://api.rabota.ua/autocomplete/city";

exports.search = async (req, res) => {
  try {
    const { ukrainian, keyWords, cityId } = req.query;
    const params = { ukrainian, keyWords, cityId };
    const requestParams = new URLSearchParams(params).toString();
    const url = `${VACANCY_SEARCH_URL}?${requestParams}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.documents);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

exports.vacancyPageUrl = async (req, res) => {
  const { id } = req.query;
  try {
    const vacancyApiUrl = `${VACANCY_URL}?id=${id}`;
    const response = await fetch(vacancyApiUrl);
    const data = await response.json();
    const companyId = data.notebookId;
    const vacancyPageUrl = `https://rabota.ua/company${companyId}/vacancy${id}`;
    res.json({ url: vacancyPageUrl });
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};

exports.cities = async (req, res) => {
  try {
    const response = await fetch(CITIES_URL);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(BAD_REQUEST);
    res.json(err);
  }
};
