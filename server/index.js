const express = require("express");
const DbConnect = require("./Db/dbConnect");
const userModel = require("./model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const checkUser = require("./MiddleWere/userMiddleWere");
require("dotenv").config();
const app = express();
const port = 3000;
DbConnect();
app.use(express.json());
//note:
// app.post("/registration", async (req, res) => {
//     let { name, email, password } = req.body;
//     bcrypt.hash(password, 10, async function (err, hash) {

//         let user = new userModel({
//           name,
//           email,
//           password:hash
//         });
//         await user.save();
//         return res.status(201).send({ msg: "User Create Successfully", data: user });
//       });
// });

app.post("/registration", async (req, res) => {
  let { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(404).send("Required Fill");
  } else {
    bcrypt.hash(password, 10, async function (err, hash) {
      let user = new userModel({
        name,
        email,
        password: hash,
        role
      });
      await user.save();
      return res
        .status(201)
        .send({ msg: "User Create Successfully", data: user });
    });
    
  }
});

//note:
// app.post("/login", async (req, res) => {
//     let { email, password } = req.body
//     let existingUser = await userModel.findOne({ email })
//     if (existingUser) {
//         bcrypt.compare(password, existingUser.password, function (err, result) {
//             if (result) {
//                 const token = jwt.sign({ email }, process.env.PRV_TOKEN);

//               return res.status(200).send({ msg: "Login Successfully",token });
//             } else {
//               return res.status(400).send({ msg: "Invalid Email Or Password" });
//             }
//         });
//     } else {
//         return res.status(400).send({msg:"Invalid Email Or Password"})
//     }
//     })

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  
  let existingUser = await userModel.findOne({ email });
  if (existingUser) {
    bcrypt.compare(password, existingUser.password, function (err, result) {
      if (result) {
        let role = existingUser.role;
        const token = jwt.sign({ email ,role }, process.env.PRV_TOKEN, {
          expiresIn: "1h",
        });
        return res.status(200).send({ msg: "Login Successfully", token });
      } else {
        return res.status(400).send({ msg: "Invalid Email Or Password" });
      }
    });
  } else {
    return res.status(400).send({ msg: "Invalid Email Or Password" });
  }
});
app.get("/allUsers", checkUser, async (req, res) => {
  try {
    let allUsers = await userModel.find({});
    return res.status(200).send({ msg: "All Users", data: allUsers });
  } catch (error) {
    return res.status(404).send("404 Not Found");
  }
});
app.use((req, res) => {
  return res.status(404).send("404 Not Found");
});
app.listen(port, () => {
  console.log("Server Is Running");
});
