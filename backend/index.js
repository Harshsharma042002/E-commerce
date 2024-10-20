const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const axios = require('axios');
const router = require('./Routes/userRouter'); 
const ProdRouter = require('./Routes/productRouter');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;
const mongo_uri = process.env.mongo_uri;

app.use(express.json());
app.use(bodyParser.json()); 
app.use(cookieParser());


const corsOption = {
    origin: "http://localhost:3000",
    credentials: true,
};
app.use(cors(corsOption));

const uploadPath = './upload/images';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: 0,
            message: 'No file uploaded'
        });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

app.use('/users', router); 
app.use('/products', ProdRouter); 

const SQUARE_ACCESS_TOKEN = process.env.PAYMENT_API;

app.post('/process-payment', async (req, res) => {
    const { nonce, amount } = req.body;

    try {
        const response = await axios.post(
            'https://connect.squareupsandbox.com/v2/payments',
            {
                source_id: nonce,
                amount_money: {
                    amount: amount, 
                    currency: 'INR',
                },
                idempotency_key: `${Date.now()}`, 
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
                },
            }
        );

        res.json({ success: true, payment: response.data.payment });
    } catch (error) {
        console.error('Payment error:', error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, error: error.response ? error.response.data : error.message });
    }
});

app.get('/', (req, res) => {
    res.send("Hi from server");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
