const express = require('express');
const app = express();
const fs = require('fs');
const hostname = 'localhost';
const port = 3000;
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const { Console } = require('console');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'img/');
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  const imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

//ทำให้สมบูรณ์ ok
app.post('/profilepic', (req,res) => {
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('avatar');

    upload(req, res, (err) => {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        res.cookie('img',req.file.filename); 
        //เปลี่ยนรูปในข้อมูล
        updateImg(Username,req.file.filename);
        return res.redirect('feed.html');
    });
    
 })

//ทำให้สมบูรณ์ ok
app.get('/logout', (req,res) => {
    res.clearCookie('username');
    return res.redirect('index.html');
})

//ทำให้สมบูรณ์ ok
app.get('/readPost', async (req,res) => {
    let fliename = "js/postDB.json"
    let readfile =  await readJson(fliename);
    res.send(readfile);
})

//ทำให้สมบูรณ์
app.post('/writePost',async (req,res) => {
    const newMsg = req.body;
    let fliename = "js/postDB.json"
    let readfile =  await readJson(fliename);
    let OlddataObject = JSON.parse(readfile);
    let keysOlddataObject = Object.keys(OlddataObject);
    let i = keysOlddataObject.length+1;
    OlddataObject["post"+i]= newMsg;
    //console.log(OlddataObject); 
    let newdata2 = JSON.stringify(OlddataObject, null," ");
    await writeJson(newdata2,"js/postDB.json");
    let readfile2 =  await readJson(fliename);
    res.send(readfile2);
})

var Username; 
//ทำให้สมบูรณ์ ok
app.post('/checkLogin',async (req,res) => {
    
    let file_name = "js/userDB.json";
    let readfile_user = await readJson(file_name);
    let UserObject = JSON.parse(readfile_user);
    let keysUserObject = Object.keys(UserObject);
    let inputUsername = req.body.username; Username = inputUsername;
    let inputPassword = req.body.password;
    let checkUP = false;
    let picnum;
    
    // ถ้าเช็คแล้ว username และ password ถูกต้อง
    for( i=0; i<keysUserObject.length ;i++)
    {
        if(inputUsername == UserObject[keysUserObject[i]].username && inputPassword == UserObject[keysUserObject[i]].password )
        {
            checkUP = true;
            picnum = i;
        }
    } 
    if(checkUP == true)
    {
        console.log("correct");
        res.cookie('username',inputUsername);
        res.cookie('img',UserObject[keysUserObject[picnum]].img);
        return res.redirect("feed.html");
    }
    else
    {
        // ถ้าเช็คแล้ว username และ password ไม่ถูกต้อง
        return res.redirect('index.html?error=1');
    }
})

//ทำให้สมบูรณ์ ok
const readJson = (file_name) => {
    return new Promise((resolve,reject) => {
        fs.readFile(file_name,'utf8', (err, data) => {
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

//ทำให้สมบูรณ์ ok
const writeJson = (data,file_name) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file_name,data, (err) => {
            if (err) 
                reject(err);
            else
                resolve("saved!")
        });
    })
}

//ทำให้สมบูรณ์ ok
const updateImg = async (username1, fileimg) => {
    let olddata = await readJson("js/userDB.json");
    let newdata; let thisUser;
    let OlddataObject = JSON.parse(olddata);
    let keysOlddataObject = Object.keys(OlddataObject);
    for( i=0; i<keysOlddataObject.length ;i++)
    {
      if(OlddataObject[keysOlddataObject[i]].username == username1)
      {
        thisUser = i;
      }
    }
    
    OlddataObject[keysOlddataObject[thisUser]].img = fileimg;
    newdata = JSON.stringify(OlddataObject, null," ");
    writeJson(newdata,"js/userDB.json");
}

 app.listen(port, hostname, () => {
        console.log(`Server running at   http://${hostname}:${port}/`);
});