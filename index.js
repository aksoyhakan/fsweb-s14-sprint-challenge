// Server'ı buradan başlatın
require("dotenv").config();
const server = require("./api/server");

const port = process.env.PORT || 8001;

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
