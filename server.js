const express = require('express');
const app = express();
const cors = require('cors')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser');
//require('dotenv').config()
app.listen(process.env.PORT || 3001);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors( {
    origin: 'https://nicknik.com/contact'
}));

app.get('/', (req, res) => {
    res.send('Welcome! This is a REST API for Nick\'s contact form :)')
})

app.post('/contact', (req, res) => {
    try {
        sendFeedback(req.body.name, req.body.email, req.body.message)
        res.status(200).send('Message sent!')
    }
    catch (err) {
        res.status(500).send('Server error')
    }
   
})

const sendFeedback = (name, email, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nikita.nikolenko@gmail.com',
          pass: process.env.GMAIL_PASS
        }
      });
      
      const mailOptions = {
        from: 'nikita.nikolenko@gmail.com',
        to: 'nikita.nikolenko@gmail.com',
        subject: 'WEBSITE FEEDBACK',
        text: ` Name: ${name || 'no name'}.
                Email: ${email}.
                Message: ${message}`
        };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
