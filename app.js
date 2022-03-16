const nodemailer = require("nodemailer");
const { google } = require("googleapis");

require('dotenv/config')

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
    try {
        const accessToken = await  oAuth2Client.getAccessToken();
        // console.log(accessToken);
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth : {
                type: "OAuth2",
                user: 'chaiyapatoam12@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refresh_token : REFRESH_TOKEN,
                accessToken: accessToken.token
            }
        })

        const mailOptions = {
            from: 'Unforgettravel.com',
            to : 'chaiyapat4579@gmail.com',
            subject: "Hello from Gmail API OAuth2",
            text : "Hello from Gmail API",
            html : '<h1>Hello from Gmail API</h1>'
        }

        const result = await transport.sendMail(mailOptions)
        return result
    } catch (error) {
        return error
    }
}

sendMail().then(result => console.log(result))
.catch(err=>console.log(err))