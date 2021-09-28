// https://stackoverflow.com/questions/59188483/error-invalid-login-535-5-7-8-username-and-password-not-accepted
// https://nodemailer.com/about/
// http://expressjs.com/en/resources/middleware/cors.html
// https://expressjs.com/en/resources/middleware/body-parser.html
// node index.js

// import libraries express  and nodemailer
const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const port = process.env.PORT || 3010
const smtp_login = process.env.SMTP_LOGIN || "---"
const smtp_password = process.env.SMTP_PASSWORD || "---"

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	service: "gmail",
	// host: "smtp.ethereal.email",
	//  port: 25,
	//  secure: false, // true for 465, false for other ports
	//  tls:{
	//   rejectUnauthorized: false,
	//  },
	auth: {
    user: smtp_login, // generated ethereal user
	pass: smtp_password,
	},
})

app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.post("/sendMessage", async (req, res) => {

	let { name, email, message } = req.body
	let info = await transporter.sendMail({
		from: "My Portfolio ", // sender address
		to: "tanya03.11@mail.ru", // list of receivers
		subject: "My Portfolio", // Subject line
		html: `<div ><b>Сообщение с portfolio</b> 
    <div> name: ${name}</div>
    <div> email: ${email}</div>
    <div> message: ${message}</div>
    </div>`, // html body
	})
	// res.send(name)
	res.send('отправил')
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
