const Pool = require("pg").Pool;

const pool = new Pool({
  connectionString:
    "postgres://ymzexsjcrviqmb:33fd9fccb7182c4d7aac0e7fbe83db1c68be780ad52185e8928c577b938e7a49@ec2-107-22-83-3.compute-1.amazonaws.com:5432/d31fi06dh1fhkn",
  ssl: {
    rejectUnauthorized: false,
  },
});

// const pool = new Pool({
//   user: "ymzexsjcrviqmb",
//   password: "33fd9fccb7182c4d7aac0e7fbe83db1c68be780ad52185e8928c577b938e7a49",
//   host: "ec2-107-22-83-3.compute-1.amazonaws.com",
//   port: 5432,
//   database: "d31fi06dh1fhkn",
// });

module.exports = pool;
