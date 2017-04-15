/**
 * Created by Yura on 15.04.2017.
 */
const request = require("request-promise");
const argv = require ("yargs")
    .alias("u", "username")
    .alias("s", "sort")
    .alias("d", 'direction')
    .default("username", "YuraGB/")
    .default("sort", "full_name")
    .default("direction", "asc")
    .argv;

const TOLKEN = "f60cd657da95bc8cefb7a4b38690651484f68788";
let URL = "https://api.github.com/users/";


const options = {
    uri: URL + argv.username + "repos",
    qs: {
        access_token: TOLKEN,
        sort: argv.sort,
        direction: argv.direction,
    },

    headers: {
        "User-agent": "Request-Promise"
    },

    json:true
};

request(options)
    .then(data => data.forEach(fullName => console.log(fullName.full_name)));

