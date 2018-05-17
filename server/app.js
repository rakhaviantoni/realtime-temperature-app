/* Brought to you by Rakha Viantoni
   Visit: rakha.arvipi.com */
   
const express = require("express"); //assign express
const http = require("http"); //assign http
const socketIo = require("socket.io"); //assign socket.io
const axios = require("axios"); //assign axios

const port = process.env.PORT || 4001; //assign the port to 4001
const index = require("./routes/index"); //assign the index page route

const app = express(); //assign the app using express
app.use(index); //method use to apply the index page to the app

const server = http.createServer(app); //using http method to create server on the app
const io = socketIo(server); //apply socket.io to the server

io.on("connection", socket => { //calling socket.io connection function
  console.log("New client connected"), setInterval( //show log client connected if there is new client
    () => getApiAndEmit(socket), //set interval and get the api and then emit it to the client using function that declared below
    10000 //for every 10 seconds
  );
  socket.on("disconnect", () => console.log("Client disconnected")); //if socket disconnected
});

const getApiAndEmit = async socket => { //function expression with async parameter
  try { //try to catch
    const res = await axios.get( //await the callback response
      // "https://api.darksky.net/forecast/'token-key'/'lat,long'"
      "https://api.darksky.net/forecast/8e98be8430a388250c6f3d1745762cef/-6.157992,106.854967" //from this api endpoint
    );
    socket.emit("FromAPI", res.data.currently.temperature); //emit the data to "FromAPI"
  } catch (error) { //if catch error
    console.error(`Error: ${error.code}`); //show log error
  }
};

server.listen(port, () => console.log(`Listening on port ${port}`)); //listen the server on port that has been set