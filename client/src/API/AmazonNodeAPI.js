import axios from 'axios';

export default axios.create({
  baseURL: "https://amazon-api.vercel.app/api",
});
//baseURL: "http://localhost:7535/api",