# PriceTracker

It happens quite often when we are shopping online that we come across an article that we want to purchase desperately but then end up realizing that it is out of budget at the moment. Without failing, we visit the website almost every day to check if the price dropped by any penny. 

This practice usually makes us end up wasting a lot of time. And for that matter, this application called the-price-tracker comes to use. The base idea is to run a script in the background that checks for price drop every 60 seconds. In case there is any, the automated script notifies the user via an email. At any point of time, if the user finds the article to be in budget and a decent price he can then visit the website and make a buy. 

The check in the price drop every 30 mins is implemented through the Cron library and the email notification for the same is implemented using Nodemailer, a module for Node.js to send emails. For any new article that the user wants to run this script for, all he/she has to do is to change the URL at the beginning of the script.


Working Video : https://youtu.be/Ak6mtJ5gShY
