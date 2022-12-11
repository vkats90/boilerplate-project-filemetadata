var express = require('express');
var cors = require('cors');
const bodyParser = require("body-parser");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
  res.json({'name':req.file.originalname,'type':req.file.mimetype,'size':req.file.size})
})

app.get('/uploaded',(req,res)=>{
  res.sendFile(process.cwd() + '/views/uploaded.html')
  res.sendFile(process.cwd() + '/uploads/IMG_1106.JPG')
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
