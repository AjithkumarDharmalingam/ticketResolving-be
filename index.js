const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const signup = require("./models/signup");
const querydata = require("./models/createquery");
const messages = require("./models/message");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://mvel1620r:jZdPZnNTy8BQ7KFL@queryresolvingsystem.echa3i5.mongodb.net/queryresolvingsystem?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.post("/signup", async (req, res) => {
  const { name, email, password, address, mobile, category } = req.body;
  console.log(req.body);
  const feedbackdata = new signup({
    name: name,
    email: email,
    password: password,
    address: address,
    mobile: mobile,
    category: category
  });
  try {
    await feedbackdata.save();
    res.json({
      status: 200,
      message: "Account Created Successfully"
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/sendmessage", async (req, res) => {
  const {
    sender_id,
    receiver_id,
    message,
    messagekey,
    title,
    dateandtime
  } = req.body;
  console.log(req.body);
  const sendmessage = new messages({
    sender_id: sender_id,
    receiver_id: receiver_id,
    message: message,
    messagekey: messagekey,
    title: title,
    dateandtime: dateandtime
  });
  try {
    await sendmessage.save();
    res.json({
      status: 200
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/createquery", async (req, res) => {
  const {
    category,
    subcategory,
    tag,
    language,
    title,
    description,
    from,
    till,
    status,
    email
  } = req.body;
  console.log(req.body);
  const data = new querydata({
    category: category,
    subcategory: subcategory,
    tag: tag,
    language: language,
    title: title,
    description: description,
    from: from,
    till: till,
    status: status,
    email: email,
    mentoremail: "",
    dateandtime: new Date().toLocaleString().replace(",", "")
  });
  try {
    await data.save();
    res.json({
      status: 200,
      message: "Query Raised Successfully"
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/login/", async (req, res) => {
  const { email, password } = req.query;
  console.log(req.query);
  const allUsers = await signup.find({ email: email, password: password });
  res.status(200).send(allUsers);
});

app.get("/api/viewqueries/", async (req, res) => {
  const { email } = req.query;
  const query = await querydata.find({ email: email });
  res.status(200).send(query);
});

app.get("/api/getmessages/", async (req, res) => {
  const { key1, key2, title } = req.query;
  console.log(key1, key2);
  const query = await messages.find({
    $or: [{ messagekey: key1 }, { messagekey: key2 }],
    $and: [{ title: title }]
  });
  res.status(200).send(query);
});

app.get("/api/viewuserqueries/", async (req, res) => {
  const query = await querydata.find({});
  res.status(200).send(query);
});

app.put("/api/assigntask", async (req, res) => {
  var { id, mentoremail } = req.body;
  console.log(req.body);
  try {
    await querydata.updateOne(
      { _id: id },
      {
        $set: {
          status: "assigned",
          mentoremail: mentoremail
        }
      }
    );
    res.json({ status: 200, message: "Task Assigned Successfully" });
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/closetask", async (req, res) => {
  var { id, status } = req.body;
  console.log(req.body);
  try {
    await querydata.updateOne(
      { _id: id },
      {
        $set: {
          status: status
        }
      }
    );
    res.json({ status: 200, message: "Task Closed Successfully" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
