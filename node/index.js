const express = require('express')
const { dbPromise } = require('./dbPromise')

const mysql = require('mysql');

const config={
  host:'db',
  user:'root',
  password:'root',
  database:'nodedb'
}

async function createApp(){
const app = express()
 
//const connection = mysql.createConnection(config);

//insert on database
const number = Math.floor(Math.random() * 100);
const sqlInser = `INSERT INTO people(name) values('Flavio ${number}')`
await dbPromise.query(sqlInser);
//connection.query(sql)
  
app.get('/', async (req, res) => {
  //const connection = mysql.createConnection(config);
  const sqlNames = `SELECT * FROM people`
  
  const allNames = await dbPromise.query(sqlNames);

    const html = `<h1>Full Cycle Rocks!</h1>\n
    <ul>
      ${allNames.map(items => `<li>${items.name}</li>`).join('')}
    </ul>`

    res.send(html)


  // connection.query(selectNames, (error, results, fields) => {
  //   if (error) {
  //     res.send(error.message);
  //   }
  //   const html = `<h1>Full Cycle Rocks!</h1>\n
  //   <ul>
  //     ${results.map(items => `<li>${items.name}</li>`).join('')}
  //   </ul>`
  
  //   res.send(html)
  // });
})
return app

}

module.exports = createApp