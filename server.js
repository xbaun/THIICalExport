const express        = require('express'),
      app            = express(),
      server         = require('http').Server(app),
      io             = require('socket.io')(server),
      _              = require('lodash'),
      ical           = require('ical-generator'),
      Joi            = require('joi');
      
      
var ssr;

require('./public/js/server.bundle.js').THIICalExport.init((html) => {
  ssr = html;
});


const THIRestClient
   = require('./server/THIRestClient.js');

server.listen(process.env.PORT, process.env.IP);

app.use(express.static('public'));
app.get('/', (req, res) => {
   res.send(ssr);
})

io.on('connection', function(socket) {
   
   socket.on('auth', function (credentials) {

      THIRestClient.getSession(credentials)
         .then (function (session) {
            
            socket.emit('auth', { state: 'SUCCESS' });
            socket.emit('generate-ical', { state: 'STARTED' });
           
            THIRestClient.getCalendar(session)
               .then (function (res) {
                  
                   buildICal(res, credentials)
                     .then (function (data) {

                        socket.emit('generate-ical', {
                           state: 'SUCCESS',
                           data: data
                        });
                     })
                     .catch(function (err) {
                        
                        socket.emit('generate-ical', {
                           state: 'FAILURE',
                           error: 'BUILD ICAL FAILED',
                           input: err.event
                        });
                     });
               })
               .catch(function (err) {
                  
                  socket.emit('generate-ical', {
                     state: 'FAILURE'
                  });
               });
         })
         .catch(function (err) {
            
             socket.emit('auth', { state: 'FAILURE', detail: err });
            
         });
   });
});

const schemaTHICalEvent = Joi.object().keys({
    von          : Joi.string(),
    bis          : Joi.string(),
    dozent       : Joi.string(),
    raum         : Joi.string(),
    veranstaltung: Joi.string(),
}).unknown();


function buildICal(data, credentials) {
   
   return new Promise(function (resolve, reject) {
      
      var output = ical({name: `Calendar for ${credentials.username}`});
      var events = data.data[3];
      
      if (!_.isEmpty(events)) {
         
         events.forEach((event) => {
            
            var res = Joi.validate(event, schemaTHICalEvent);
            
            if (!res.error) {
            
               output.createEvent({
                  start      : new Date(`${event.datum} ${event.von}`),
                  end        : new Date(`${event.datum} ${event.bis}`),
                  summary    : event.veranstaltung,
                  description:`Dozent: ${event.dozent}, Raum: ${event.raum}`,
               })
            } else {
               reject({event});
               return false;
            }
         });
         
         resolve(output.toString());
         
      }
   });
}