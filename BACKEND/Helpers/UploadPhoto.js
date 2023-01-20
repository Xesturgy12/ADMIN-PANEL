const multer  = require('multer')


console.log('inside upload phjotos');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Static/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix +'.'+ file.mimetype.split("/")[1])
    }
  })


const upload = multer({storage:storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      }
    })



    // modules for video upload
//     const videoStorage = multer.diskStorage({
//       destination: 'videos', // Destination to store video 
//       filename: (req, file, cb) => {
//           cb(null, file.fieldname + '_' + Date.now() 
//            + '.'+ file.mimetype.split('/')[1])
//       }
//  });


//  const vidUpload = multer({
//   storage: videoStorage,
//   limits: {
//   fileSize: 90000000 // 10000000 Bytes = 90 MB
//   },
//   fileFilter(req, file, cb){
//     // upload only mp4 and mkv format
//     if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
//        return cb(new Error('Please upload a video'))
//     }
//     cb(undefined, true)
//  }
// })


module.exports = upload