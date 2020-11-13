var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BEzhT7LDtPMP_cbyp6dJNSGLjTqwXO4A7Xi1mEEWpdqFhZ_mjPb2-xkHNeESyFcDQlgH8z50xB6kIWeFqILj45o",
   "privateKey": "2SwBJ4E2TPVh9u_8qy4KkhvL98GbA0uclrQ1Td5yQag"
};
 
 
webPush.setVapidDetails(
   'mailto:bayusutrisno@outlook.co.id',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ddarnNwTgx8:APA91bG-Z5KMX3x1t06lmLF7gbz3xbsNnVAXZOeXDRwuO56tXvZR6k2-vAnnOHFU5T7-CO4Kf3tFcxz8cknZbRBrCvyesrD7UgliL9_hs6iWZr5UN2O7WeTzJOjQtMNkxZUFxrTDcbVK",
   "keys": {
       "p256dh": "BPKYa3skcMEcIurr+HBCxm9luTDi22A9RWXXRlk1oKJsI6D8iEUwOn9Uhqgh1MZiZLVHZHhuTts8pLWlSk2Tfwg=",
       "auth": "d3BmvjNmzSFq8kBCEr5kkQ=="
   }
};
var payload = 'Congratulations! The Football Information application can now receive push notifications!';
 
var options = {
   gcmAPIKey: '680072603493',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);