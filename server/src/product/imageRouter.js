import express from 'express';
import multer from 'multer';
import { verifyToken, isAccess } from '../utils';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
});

const upload = multer({ storage });
const imageRouter = express.Router();

imageRouter.post('/', verifyToken, isAccess, upload.single('image'), (req, res) => {
    res.status(201).send({ image: `/${req.file.path}` });
});
export default imageRouter;
