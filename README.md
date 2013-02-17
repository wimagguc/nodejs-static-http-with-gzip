Node.js static http server with gzip support (for Heroku)
=========================================================

This is a simple Heroku project to serve static files over http via gzip support. It is powerful enough for production usage, but also simple and easy to understand for future development.

(More info, demo and why this thing actually is useful <a href="http://www.wimagguc.com/2013/02/node-js-http-server-with-gzip-support-for-heroku/">in this blogpost</a>.)

USAGE
=====

Starting up the server locally

    node http-with-gzip.js 

    (now visit http://localhost:8080/ in your browser)

Use it on Heroku

    1. Copy http-with-gzip.js next to your web app
    2. Set the DOCUMENT_ROOT and DIRECTORY_INDEX values in http-with-gzip.js
    3. Edit Heroku's Procfile and project.json
    4. Submit your project to Heroku


LICENSE
=======

Do with the code whatever you please. Let me know if you did something awesome.

ABOUT
=====

Richard Dancsi

Blog: http://www.wimagguc.com/
Twitter: http://twitter.com/wimagguc
Linkedin: http://linkedin.com/in/richarddancsi
Google+: https://plus.google.com/u/0/115939246085616544919
