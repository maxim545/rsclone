import express from 'express';
import multer from 'multer';
import { verifyToken, isAccess } from '../utils';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, `${__dirname}./uploads`);
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

const imageRouter = express.Router();

imageRouter.post(
    '/',
    verifyToken,
    isAccess,
    upload.single('image'),
    (req, res) => {
        res.status(201).send({ image: `/${req.file}` });
    },
);
export default imageRouter;
