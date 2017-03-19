import $ from "jquery";
import socket from 'socket.io-client';

const io = socket('/');




export const viewModel =  {
    username: null,
    password: null,
    generate() {

        io.emit('generate-ical', {username: this.username, password: this.password});

    }
};

$(function () {
    
    var saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {
            var blob = new Blob([data], {type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());
    
    io.on("ongenerated", function (data) {
        saveData(data, `${viewModel.username}.ics`);
    });

    
    ko.applyBindings(viewModel);  
    
})



