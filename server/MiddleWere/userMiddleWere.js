const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

let checkUser = (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split("Bearer ")[1];
    jwt.verify(token, process.env.PRV_TOKEN, function (err, decoded) {
      if (err) {
        return res.status(404).send(err);
      } else {
        if (decoded.email) {
          if (decoded.role == "admin") {
            next();
            
          } else {
            
            return res.status(400).send("You Are Not Admin");
          }
        } else {
        }
      }
    });
  } else {
    return res.status(404).send("Token Not Found");
  }
};

module.exports = checkUser;

// const jwt = require("jsonwebtoken");
// let checkUser = (req, res, next) => {
//   if (req.headers.authorization) {
//     let token = req.headers.authorization.split("Bearer "[1]);
//     jwt.verify(token, process.env.PRV_TOKEN, function (err, decoded) {
//       if (err) {
//         return res.status(404).send(err);
//       } else {
//         if (decoded.email) {
//           next();
//         } else {
//           return res.status(404).send(err);
//         }
//       }
//     });
//   } else {
//     return res.status(404).send("Token Not Found");
//   }
// };
// module.exports = checkUser;
