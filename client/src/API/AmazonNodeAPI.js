import axios from 'axios';

export default axios.create({
  baseURL: "http://localhost:3575/api",
});
//baseURL: "http://localhost:3575/api",
//baseURL: "https://amazon-api.vercel.app/api",