const unirest = require('unirest'),
      Promise = require('promise'),
      moment  = require('moment'),
      _       = require('lodash');
      

const BASEURL = 'https://hiplan.thi.de/webservice/production/index.php';

const HEADERS = {
    'User-Agent': 'Embarcadero RESTClient/1.0, Embarcadero URI Client/1.0', // "Yet Another THIApp"
    'Accept'    : 'application/json'
}

function request(data) {
    
    return new Promise(function (resolve, reject) {
        
        unirest
            .post   (BASEURL)
            .headers(HEADERS)
            .type   ("application/x-www-form-urlencoded")
            .send   (data)
            .end    (function (response) {
                
                if (response.ok) {
                    resolve(response.body);
                } else {
                    reject ("Request Failed");
                }
            });
    });
}

module.exports = {

    getSession:  function (credentials) {
        
        return request({
             service:   "session"
           , method:    "open"
           , format:    "json"
           , username:  credentials.username
           , passwd:    credentials.password
        }).then (function (res) {
            
            return new Promise(function (resolve, reject) {
                
                const data = _.get(res, 'data');
                
                if (data == 'Wrong credentials') {
                    
                    reject('Invalid Credentials');
                    
                } else {
                
              
                    if (_.isArray(data)) {
                        resolve(data[0]);
                    } else {
                        reject("Invalid Data Format");
                    }
                }
            });
        });
    },
    
    getCalendar: function (session) {

        const date = moment();

        return request({
              service:  "thiapp"
            , method:   "stpl"
            , format:   "json"
            , session:  session
            , day:      date.format("DD")
            , month:    date.format("MM")
            , year:     date.format("YYYY")
            , details:  0
        });
    }
}