console.clear()
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database.sqlite');

const allTable = `
select name from sqlite_master where type='table'
`
/**
表格裡面的所有東西
 */
const allInTable = tableName => `
SELECT * FROM ${tableName};
`
const createTable = `
UPDATE celebs 
SET twitter_handle = '@taylorswift13' 
WHERE id = 4; 

SELECT * FROM celebs;
`
const sql = `
SELECT name, genre ,year
FROM movies;
`
db.all(allTable, function (err, res) {
  err ? console.error(err.message) :
    console.log(`Row(s) updated: ${this.changes}`)
  res ? console.log(res) : null
})

db.close();