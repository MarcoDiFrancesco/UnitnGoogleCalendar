# Unitn Google Calendar
This program makes Google Calendar update automaticly when lectures change.

![https://i.imgur.com/ccVpGXk.png](https://i.imgur.com/ccVpGXk.png)

The program is able to take every `n` hours the calendar from the university's website [EasyAcademy](https://easyacademy.unitn.it/AgendaStudentiUnitn/) from the link, and downloading the `.ics` file.  

**The server needs to have a dynamic IP**. Why? Because the university's website from time to time block the IP of the client that make too many requests coming, infact now the (static) IP of Google Calendar has been blocked, so it's not possible anymore to .  
How to solve it?
Use a personal computer/raspberry always active running this program.

## How to use it
Make your computer interface with the router so it can interface it with internet. I used to connect it to the router the port 3000 in entrance and in exit. Then I set up a DNS service to have a link in which to connect, so instead of using the dynamic IP I can connect to it using a URL. I made the computer updating every 5 minutes with dynu.com linux program to check if the IP changed, and in that case update the URL with the new IP. 
