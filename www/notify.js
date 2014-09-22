var gcm = require('node-gcm');
var message = new gcm.Message();
 
//API Server Key
var sender = new gcm.Sender('AIzaSyAyE15f7AvLniA6Y0xD4Ap9wc2BRg360L8');
var registrationIds = [];
 
// Value the payload data to send...
message.addData('message',"\u270C Peace, Love \u2764 and PhoneGap \u2706!");
message.addData('title','Push Notification Sample' );
message.addData('msgcnt','3'); // Shows up in the notification in the status bar
message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
//message.collapseKey = 'demo';
//message.delayWhileIdle = true; //Default is false
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
 
// At least one reg id required
registrationIds.push('APA91bFK4sHy3taniD7sDLeNa9zoXqGEv4O8X7nleogH5V9z4X0iuHbPR1FRQDpGYCdAIBfKG0mCXKA4QfM3tFKAFzA27hPbQb9SmNj1vLo52REnu1OTDkqUHSMLc4tpEDODCvxY_kjdMSILdWsqABaFjCCvzOxE6Q');
 
/**
 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
 */
sender.send(message, registrationIds, 4, function (result) {
    console.log(result);
});