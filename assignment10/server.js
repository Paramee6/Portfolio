var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);

var fs = require('fs');
const { Console } = require('console');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


// read from file to user
//ทำให้สมบูรณ์
app.get('/inmsg', async (req, res) => {
  //console.log("test");
  let readfile =  await readMsg();
  res.send(readfile);
  
})

//from user, write data to file
//ทำให้สมบูรณ์
  app.post('/outmsg', async (req, res) => {
  //console.log("test2");
  const newMsg = req.body;
  //console.log("1 : "+newMsg);
  let readfile =  await readMsg();
  let upnewdata = updateMsg(newMsg,readfile);
  let writeFile = await writeMsg(upnewdata);
  let readfile2 =  await readMsg();
  res.send(readfile2);
})

// read json data from file
//ทำให้สมบูรณ์
const readMsg = () => {
  return new Promise((resolve,reject) => {
    fs.readFile('log.json','utf8', (err, data) => {
                  if (err) 
                      reject(err);
                  else
                  {
                      //console.log(data);
                      resolve(data);
                  } 
                });
        })
} 

// update json data
//ทำให้สมบูรณ์
const updateMsg = (newMsg,readfile) => {
  let dataparse = JSON.parse(readfile);
  dataparse.dataMsg.push(newMsg);
  let datastring = JSON.stringify(dataparse);
  //console.log("2 : "+datastring);
  return datastring;
}


// write json data to file
//ทำให้สมบูรณ์
const writeMsg = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('log.json',data, (err) => {
        if (err) 
            reject(err);
        else
            resolve("saved!")
    });
})
}

var server = http.listen(3001, () => {
  console.log('server is running on port http://localhost:'+ server.address().port);
});