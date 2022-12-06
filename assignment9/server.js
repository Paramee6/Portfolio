const fs = require('fs');
const http = require('http');

const hostname = 'localhost';
const port = 3000;


const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    //ทำการเรียกใช้ promise ในนี้นะ
    //แสดงผลของ json ใหม่ที่เพิ่มจำนวนเสื้อผ้าไปแล้วบน browser
    //ผล json ที่ได้บน browser จะไม่สวย ดังนั้นเราสามารถแก้ได้โดยกำหนด argument ใน JSON.stringify()
    // จะได้ JSON.stringify(<ชื่อตัวแปร JS object>, null, " ")  โดย json string ที่ได้จะมี การเว้นวรรคและบรรทัด


  });

let readMsg = () => {
    // อ่านไฟล์ cloth1.json

}

// จำนวนเสื้อผ้าตามที่กำหนด
let editJson = (data) => { 
    const stock = {
        item1: 2,
        item2: 3,
        item3: 5,
        item4: 2,
        item5: 5,
        item6: 8,
        item7: 1,
        item8: 9,
        item9: 0
    }
    var newdata = 'stock';
    var jsondata = JSON.parse(data)
    var keys = Object.keys(jsondata)
    for (var i = 0; i < keys.length; i++) {
    var index = "item" + (i + 1);
    jsondata[index][newdata] = stock[index];
    }
    resolve(JSON.stringify(jsondata, null, ' '));
    }

let writeMsg = () =>{
    //ทำการเขียนไฟล์ใหม่ขึ้นมา
    return new Promise((resolve, reject) => {
        fs.writeFile('new_cloth.json', data, (err) => {
        if (err)
        reject(err);
        else {
        var A = JSON.parse(data);
        resolve(A);
        }
        });
        
        })
        }
        const server = http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            readMsg().then(editJson).then(writeMsg).then((out) => {
                res.write(JSON.stringify(out));
            });
        });

server.listen(port, hostname, () => {
console.log(`Server running at   http://${hostname}:${port}/`);
});