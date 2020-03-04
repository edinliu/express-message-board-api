console.clear()
const fs = require("fs")
let datas = fs.readFileSync("data.json")// Get content from file
console.log(typeof datas)
datas = JSON.parse(datas)
console.log(typeof datas)
datas[0].deletPassword = "33118844"
console.log(datas)
fs.writeFile('data.json', JSON.stringify(datas), (err) => {  
    // Catch this!
    if (err) throw err;
    console.log('Users saved!')
});