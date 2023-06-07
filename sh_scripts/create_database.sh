# #!/bin/bash

# # Step 1: Open the terminal in the root folder

# # Step 2: Init database
# sqlite3 db/database.db

# # Step 3: Read all files from the migration folder
# migrations_folder="db/migrations"
# for file in "$migrations_folder"/*.sql; do
#   echo ".read $file"
# done | sqlite3 db/database.db

# # Step 4: View schema
# echo ".fullschema" | sqlite3 db/database.db

# # Step 5: Exit from sqlite
# echo ".exit" | sqlite3 db/database.db

sqlite3 db/database.db <<EOF
.read db/migrations/users.sql
.read db/migrations/sessions.sql
.read db/migrations/posts.sql
.read db/migrations/comments.sql
.read db/migrations/categories.sql
.read db/migrations/categoryPostRelation.sql
.read db/migrations/messages.sql
.fullschema
.quit
EOF