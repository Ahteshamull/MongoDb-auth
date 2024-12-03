const mongoose = require("mongoose")
const DbConnect = () => {
    try {
        mongoose.connect(process.env.DV_URL).then(() => {
          console.log("Database Connected");
        });
    } catch(err) {
        console.log(err)
  }
}
module.exports = DbConnect