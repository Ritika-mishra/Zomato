// lecture 249

// const request = require("request");
// const https = require("https");

const express = require("express")
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")

})

app.get("/signup", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/signup", function (req, res) {
    const fname = req.body.first;
    const lname = req.body.last;
    const mail = req.body.mail;

    mailchimp.setConfig({
        apiKey: "5939b395506841ddc9399e252759c219-us17",
        server: "us17",
    });

    const list_id = "ac5a80f71c";

    const run = async () => {

        const response = await mailchimp.lists.addListMember(list_id, {
            email_address: mail,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
        });

        console.log(response);
    };

    run();

    console.log(res.statusCode)
    if (res.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
    }

    else {
        res.sendFile(__dirname + "/failure.html")
    }
});

app.post("/success", function (req, res) {

    res.sendFile(__dirname + "/index.html")

})

app.listen(3000, function () {
    console.log("server is running on port 3000")
})














// npm install @mailchimp..........(line 9:)


// mailApiKey:
// 3d42665eeffef732f19175bc8a55cce0-us17

// MAILCHIMP DOC
// https://mailchimp.com/developer/marketing/api/lists/batch-subscribe-or-unsubscribe/

// audience/list id mailchimp : https://us17.admin.mailchimp.com/lists/settings/defaults?id=1359724
// ac5a80f71c

// server prefix
// us17
// const bodyParser = require("body-parser")
// app.use(bodyParser.urlencoded({ extended: true }));                         BODYPARSER DEPRACATED!!!!!!!!!
