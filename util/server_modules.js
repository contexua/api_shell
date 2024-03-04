// app_modules.js
const dns = require('dns');


const checkIpMiddleware = (app) => {
    return (req, res, next) => {
      if (app.locals.ADMIN_IPS_CHECK === 'true') {
        const test_ip = req.ip;
        const this_ip = app.locals.ADMIN_IPS_ARRAY.find(a => a.ip === test_ip);
        if (!this_ip) {
          return res.status(403).send(`Access denied IP ${test_ip}`);
        }
        next();
      } else {
        next();
      }
    };
  }

const checkDnsMiddleware = (app) => {
    return (req, res, next) => {
      if (app.locals.ADMIN_HOSTS_CHECK === 'true') {
        const test_ip = req.ip;
        dns.reverse(test_ip, (err, hostnames) => {
            console.log(hostnames);
  
            if (err || !hostnames.some(hostname => app.locals.ADMIN_HOSTS_ARRAY.includes(hostname))) {
                return res.status(403).send(`Access denied DNS ${test_ip}`);
            }
            next();
        });  
      } else {
        next();
      }
    };
  }

  const setMsgLocale = (app) => {
    return (req, res, next) => {

        const locale = req.cookies.locale ||
                      req.header('Accept-Language') ||
                      req.query.lang ||
                      'en'; // Default to 'en'
      
        req.msg_locale = locale.split(',')[0].trim();
        next();
    };
  }

  module.exports = {
    checkIpMiddleware,
    checkDnsMiddleware,
    setMsgLocale,
  };
  