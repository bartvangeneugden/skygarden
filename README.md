# Skygarden Seat monitor

London is full of fun stuff, but some of it is kind of hard to get into. The Skygarden in the Walkie Talkie building is one of those. It tends to book out pretty quickly (as they limit space) and tickets only become available once a week. Nobody has time for that.

## So then what's this?

This little node script is set up to check the dates you give it for more then 2 seats. After that it'll send a push notification to your phone!

## How do I make it work?

In 5 easy steps:

 - Sign up to (Pushover)[https://pushover.net/] (free for the first 7 days). This is a service that will allow the script to send push notifications to your smartphone (iOS and Android).
 - Create an application on `Pushover`
 - Install the pushover app on your smartphone and log in
 - Change the parameters in the script:

  Change these to the tokens you got from `Pushover`:

  ```
    const push = new Pushover({
        token: "<your-pushover-application-token>", //CHANGE THIS
        user: "<your-pushover-user-token>"  //CHANGE THIS
    });
  ```

  Change the dates to the ones you want tickets for. It's best to pick dates more then 2-3 weeks in advance where tickets haven't been released yet.

  ```
  ['2017-02-19', '2017-02-26', '2017-03-05'].forEach((date) => { //CHANGE THESE
  ```

 - Run this script somewhere by cron. I had it running hourly:

   ```
   0 * * * * node /opt/skygarden/index.j
   ```
