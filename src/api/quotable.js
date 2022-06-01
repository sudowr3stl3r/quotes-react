// https://github.com/lukePeavey/quotable
import axios from "axios";

export default axios.create({
    baseURL : 'http://api.quotable.io'
});