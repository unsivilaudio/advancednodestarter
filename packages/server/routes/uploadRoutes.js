const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const v2 = require('cloudinary').v2;
const multer = require('multer');

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uploader = multer({
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, uuid() + '.' + file.originalname.split('.')[1]);
        },
    }),
    limits: { fileSize: 5000000 },
    fileFilter,
});

const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
});

const cloudinary = v2.config({
    cloud_name: keys.cloudinary_name,
    api_key: keys.cloudinary_api_key,
    api_secret: keys.cloudinary_secret_key,
});

module.exports = app => {
    app.post(
        '/api/upload',
        requireLogin,
        uploader.single('image'),
        async (req, res) => {
            // const key = `${req.user.id}/${uuid()}.jpeg`;
            const uploaded = await v2.uploader.upload(req.file.path, {
                folder: req.user.id,
            });

            // s3.getSignedUrl(
            //     'putObject',
            //     {
            //         Bucket: 'bloggr-bucket',
            //         ContentType: 'image/jpeg',
            //         Key: key,
            //     },
            //     (err, url) => {
            //         res.send({ key, url });
            //     }
            // );

            // console.log(req.file.path);
            console.log(req.file);
            console.log(uploaded);
            if (req.file) {
                res.status(201).json({ key: uploaded.secure_url });
                return;
            }
            res.status(400).send('ok');
        }
    );
};
