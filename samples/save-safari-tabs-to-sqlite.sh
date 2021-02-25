#!/bin/bash

# List tabs from Safari, format them with jq to csv and then import them in a
# new table using sqlite.

# Pre-reqs: jq, sqlite3

automac=../automac

# Add header
echo "name,url,tab_index,window_id" > import.csv

# Add rows
$automac safari list-tabs | jq -r '[.[]]|@csv' >> import.csv

sqlite3 mydb.sql << EOF
.mode csv my_table
.import import.csv my_table
.mode ascii
select count(*) || ' records imported.' || x'0a' from my_table;
EOF

