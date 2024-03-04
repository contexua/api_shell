'use strict'
const path = require('path');
const helmet = require('helmet');
const express = require('express');
const cookieParser = require("cookie-parser");
const { setMsgLocale, checkIpMiddleware, checkDnsMiddleware } = require('./util/server_modules'); 
const { config_swagger, serve_swagger } = require("./config/config_swagger");

const app = express();

require("./config/config_app")(app)
require("./config/logging_runtime")(app)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(helmet());
app.use(checkIpMiddleware(app));
app.use(checkDnsMiddleware(app));
app.use(setMsgLocale(app));

app.use(require('./api/routes/routes_main')(app));
app.use(require('./api/routes/routes_users')(app));
app.use(require('./api/routes/routes_accounts')(app));

config_swagger(app);
serve_swagger(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
