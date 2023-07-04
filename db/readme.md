To init database though command line:

Fast way: 
* Run from root folder
`
bash sh_scripts/create_database.sh
`

1. Open the terminal in root folder
2. Init database with command:
`
sqlite3 db/database.db
`
3. Read all files from migration folder, for example:
`
.read db/migrations/users.sql
`
4. Run command to view schema
`
.fullschema
`
5. Exit from sqlite
`
.exit
`