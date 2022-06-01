// https://github.com/lukePeavey/quotable
import axios from "axios";

export default axios.create({
    baseURL : 'https://api.quotable.io'
});