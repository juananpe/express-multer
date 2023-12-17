var express = require('express');
var router = express.Router();
const multer  = require('multer')

var path = require('path');
const ruta = path.join(__dirname, '../public/uploads');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, ruta)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    },
    fileSize: function (req, file, cb) {
      cb(null, file.size)
    }
})

const fileFilter = (req, file, cb) => {
  const fitx = file.originalname.split('.');
  const mota = fitx[fitx.length - 1];
  if ( mota === 'jpg' || mota === 'png' || mota === 'PNG' || mota === 'JPG') {
    cb(null, true);
  } else {
    cb(new Error('Ez da PNG edo JPG motako fitxategia'), false);
  }
};
  
const upload = multer({ storage: storage,
                        limits: {
                          fileSize: 2 * 1024 *1024,
                        },
                        fileFilter: fileFilter
                      })


/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});

router.post('/', upload.single('avatar'), function (req, res, next) {
    //console.log(req.file)
    res.send('Zure izena: ' + req.body.izena +'. Fitxategia: http://localhost:3000/uploads/' + req.file.originalname)
    //res.send("Jasota")
    //res.send("http://localhost:3000/uploads/" + req.file.originalname);
})

module.exports = router;
