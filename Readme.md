# real-time-forum

[About]
[Technologies]
[Authors]
[Instructions]
[License]

## About
This project focuses on the development of a new and upgraded forum, with specific features and technologies. The forum follows the concept of a single-page application, where all page transitions are handled through Javascript. To access the forum, users need to register and log in. 

Similar to the previous forum, users can:

* Create posts with categories.
* Create comments on posts.
* View posts in a feed display.
* View comments by clicking on a post.

The forum also includes a private messaging feature. 


## Technologies

#### Tech stack
- Go & Js websockets (Gorilla websocket)
- Javascript
- HTML
- CSS
- SQLite (sqlite3)
- bash
- golang
- bcrypt
- UUID

#### Limits
Solution may not be optimized for Safari. Please use incognito mode and reload multiple times in case of problems.


## Authors
(Olha Yarukhina)[https://01.kood.tech/git/oyarukhi]
(Jegor Petsorin)[https://01.kood.tech/git/jegor_petsorin]


## Instructions

1. Run bash script from foot folder
`
bash sh_scripts/run.sh
`

2. Open http://localhost:8080/ in your browser

3. Test users logins (pass same for all - 12345678). 
Chat between test users contains more than 20 messages:
- tj@gmail.com
- js@gmail.com

## License 

(MIT)[https://opensource.org/license/mit/]