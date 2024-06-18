const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        let fileName = file.originalname;
        if (fileName.includes("&")) {
            fileName = fileName.replace("&", "-and-");
        }
        const name = String(fileName.split('.')[0]).replace(/[\])}[{(]/g, '');
        const extension = path.extname(file.originalname);
        cb(null, `${name}-${Date.now()}${extension}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 50,
    },
});

module.exports = { upload };