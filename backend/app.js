const bodyParser = require("body-parser");
const { PORT } = require("./CONFIG");
const clientRoutes = require("./routes/clientRoutes");
const vaccinRoutes = require("./routes/vaccinRoutes");
var cors = require('cors')

//init the app
const express = require("express");
const app = express();
//allow json post data
app.use(express.json());


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization,token, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
      return res.send(200);
    } else {
      return next();
    }
  });
//using routes
app.use("/api/client", clientRoutes);
app.use("/api/vaccin",vaccinRoutes);

app.use(cors);




app.listen(PORT, () => {
    console.log("backend server running !");
})