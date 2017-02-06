"use strict";

const request = require('request-promise');
const Pushover = require('pushover-notifications');
const push = new Pushover({
    token: "<your-pushover-application-token>", //CHANGE THIS
    user: "<your-pushover-user-token>"  //CHANGE THIS
});
let promises = [];

['2017-02-19', '2017-02-26', '2017-03-05'].forEach((date) => { //CHANGE THESE
    const requestOptions = {
        uri: `https://skygarden.bookingbug.com/api/v1/37002/events?start_date=${date}&end_date=${date}`,
        headers: {
            'App-Id': "f6b16c23",
            'App-Key': "f0bc4f65f4fbfe7b4b3b7264b655f5eb"
        }
    };
    promises.push(new Promise((resolve) => {
        request.get(requestOptions).then(response => {
            const events = JSON.parse(response);
            let seats = [];
            events._embedded.events.forEach(event => {
                const time = event.datetime.substring(0, 16).replace("T", " ");
                const adultSpaces = event.ticket_spaces[Object.keys(event.ticket_spaces)[0]].left;
                if (adultSpaces > 1) {
                    seats.push({date: time, seats: adultSpaces});
                }
            });
            if (seats.length > 0) {
                console.log(seats.length + " timeslots with more then 2 seats available");
                sendNotification(seats.length + " timeslots with more then 2 seats available", "Seats are available", "https://bespoke.bookingbug.com/skygarden/new_booking.html", (result) => {
                    resolve();
                });
            } else {
                sendNotification("No seats at " + date, "No seats at " + date, "", (result) => { resolve(); });
                console.log("No seats at " + date);
                //resolve();
            }
        });
    }).catch(err => logError(err)));
});

Promise.all(promises).then(() => {
    console.log("All done");
}).catch(reason => {
    console.error("Whoops", reason);
});

function logError(error) {
    console.log("Error occurred", error);
    sendNotification("Error occurred", error, "", (result) => {
        console.log("Done", result)
    });
}
function sendNotification(title, body, url, callback) {
    var msg = {
        message: body,
        title: title,
        url: url,
        device: 'phone',
        priority: 1
    };
    console.log("Sending push");
    push.send(msg, (err, result) => {
        if (err) {
            console.log("Error sending push", err);
            throw err;
        }
        callback(result);
    })
}
