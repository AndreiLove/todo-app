//create variable to store express server
let express = require('express')
let { MongoClient } = require('mongodb')

//Create server.js file
//npm init -y | intilize npm
//Npm install express | install express
//package jason was modified at this moment to include list of dependencies

//create a variable to store server
let appServer = express()

//create a variable to store mongodb
let db

//connect to mongodb
async function go() {
  let client = new MongoClient(
    'mongodb+srv://AndreiLove:IHave1MillionDollars!@cluster0.xsccyrd.mongodb.net/TodoApp?retryWrites=true&w=majority'
  )
  await client.connect()
  db = client.db()
  appServer.listen(3000)
}
go()

//add all form values to the body object and add this object to the request object
//configure the express framework include body object thats getting added to the request object
//easy to acces to user data that they are submitting
appServer.use(express.urlencoded({ extended: false }))

//create method that telling our server what to do when recieving
//incoming request from our home page
appServer.get('/', async function (request, response) {
  const items = await db.collection('items').find().toArray()
  response.send(`<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple To-Do App</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
      <h1 class="display-4 text-center py-1">To-Do App!!!</h1>
      
      <div class="jumbotron p-3 shadow-sm">
        <form action = "/create-item" method="POST">  
          <div class="d-flex align-items-center">
            <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
            <button class="btn btn-primary">Add New Item</button>
          </div>
        </form>
      </div>
      
      <ul class="list-group pb-5">
        ${items
          .map(function (item) {
            return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${item.text}</span>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>`
          })
          .join('')}
      </ul>
      
    </div>
    
  </body>
  </html>`)
})
//create method that will send info from our input field to server
appServer.post('/create-item', async function (request, response) {
  await db.collection('items').insertOne({
    text: request.body.item,
  })
  response.redirect('/')
})

//create method to tell our server to listen our local host

// node server | to start local server

//npm install nodemon -g
//Set-ExecutionPolicy RemoteSigned | if system show error
//add "whatch" script to package.jason to run command as npm run watch
//npm run watch | to start local server

//data base collection
