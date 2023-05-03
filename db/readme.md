To init database though command line:

1. Open the terminal in root folder
2. Init database with command:
`
sqlite3 db/database.db
`
3. Read all files from migration folder, for example:
`
.read db/migrations/users_table.sql
`
4. Run command to view schema
`
.fullschema
`
5. Exit from sqlite
`
.exit
`