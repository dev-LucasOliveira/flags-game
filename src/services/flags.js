import axios from 'axios';

const baseURL = 'https://flagcdn.com'

export function getLocales() {
  return axios.get(`${baseURL}/pt/codes.json`).then(res => res.data);
}