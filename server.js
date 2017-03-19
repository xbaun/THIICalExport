const express = require('express'),
      app     = express(),
      server  = require('http').Server(app),
      io      = require('socket.io')(server),
      _       = require('lodash'),
      Promise = require('promise'),
      moment  = require('moment'),
      ical    = require('ical-generator'),
      unirest = require('unirest');

server.listen(process.env.PORT, process.env.IP);
app   .use(express.static('public'));

io.on('connection', function(socket) {
   
   socket.on('generate-ical', function(login) {
       
       console.log(`generate ical for: ${login.username}`);
       
       THIApiClient.getSession(login).then((session) => {
          
          THIApiClient.getCalendar(session).then((data) => {
             
             var cal = ical({domain: `example.com`, name: `Calendar for ${login.username}`});
             
             var events = data.data[3];
             
             if (!_.isEmpty(events)) {
                events.forEach((event) => {
                   
                   cal.createEvent({
                      start      : moment(`${event.datum} ${event.von}`).toDate(),
                      end        : moment(`${event.datum} ${event.bis}`).toDate(),
                      summary    : event.veranstaltung,
                      description:`Dozent: ${event.dozent}`
                   })
                   
                });
             }
             
             
             socket.emit('ongenerated', cal.toString());
             
             
          })
          
       })

   });
});





const THIAPI_BASE_URL    = "https://hiplan.thi.de/webservice/production/index.php";
const THIAPI_BASE_HEADER = {
   "Accept"        : "application/json, text/plain; q=0.9, text/html;q=0.8,",
   "Accept-Charset": "UTF-8, *;q=0.8",
   "Content-Type"  : "application/x-www-form-urlencoded",
   "User-Agent"    : "Embarcadero RESTClient/1.0, Embarcadero URI Client/1.0"
}


const THIApiClient = {
   
   getSession: function (login) {
    
      return new Promise(function (resolve, reject) {
         
         var req = unirest.post(THIAPI_BASE_URL)
            .type("application/x-www-form-urlencoded")
            .headers(THIAPI_BASE_HEADER)
            .send({
               service : "session",
               method  : "open",
               format  : "json",
               username: login.username,
               passwd: login.password
            })
            .end(function (response) {
              
               var session = _.get(response.body, 'data');
                  
               if (_.isArray(session)) {
                  resolve(session[0]);
               } else {
                  reject();
               }
            
            });
         
      });
   },
   
   getCalendar: function (session) {
   
      return new Promise(function (resolve, reject) {
         
         var date = moment();
         var req = unirest.post(THIAPI_BASE_URL)
            .type("application/x-www-form-urlencoded")
            .headers(THIAPI_BASE_HEADER)
            .send({
               service: "thiapp",
               method : "stpl",
               format : "json",
               session: session,
               day    : date.format("DD"),
               month  : date.format("MM"),
               year   : date.format("YYYY"),
               details: 0
            })
            .end(function (response) {
               
               resolve(response.body);
               
            });
      });
   }
}



