const express = require('express');
const QRCode = require('qrcode');
const path = require('path');
const { text } = require('stream/consumers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res)=> {
    res.render('index', {qrCode: null, text: ''});
});

app.post('/generate', async (req, res) => {
    const { text } = req.body;
    
    if (!text) {
        return res.render('index', { 
            qrCode: null, 
            text: '',
            error: 'Silakan masukkan teks atau URL!' 
        });
    }

    try {
        // Generate QR Code sebagai Data URL
        const qrCodeDataURL = await QRCode.toDataURL(text, {
            width: 300,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        });

        res.render('index', { 
            qrCode: qrCodeDataURL, 
            text: text,
            error: null 
        });
    } catch (error) {
        res.render('index', { 
            qrCode: null, 
            text: text,
            error: 'Error generating QR Code!' 
        });
    }
});

app.post('/api/generate', async (req, res) => {
    const { text } = req.body;
    
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        const qrCodeDataURL = await QRCode.toDataURL(text, {
            width: 300,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        });

        res.json({ 
            success: true, 
            qrCode: qrCodeDataURL,
            text: text 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error generating QR Code' });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});