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
        apiKey: "",
        server: "us17",
    });

    const list_id = "";

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

