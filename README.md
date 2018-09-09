
# Simple Chat Client and Server

### References
https://socket.io/get-started/chat
https://www.npmjs.com/package/socketio-auth
https://medium.com/@rwillt/authenticating-socket-io-clients-f1e6f39a25fe

### Repository
https://github.com/PanchoPuncho/simple-chat

### Database
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
brew install mongodb
mkdir -p /data/db
mongod
mongo --host 127.0.0.1:27017

### Run App
node src/js/server

### Navigate To
http://localhost:3000

# ToDo
- *Integrate Bootstrap*
- *Separate into Header, Body, Footer*
- *Add auto-scroll to bottom of message list*
- *Do not send empty messages from clients*
- *Do not respond to sender from server*
- *Distinguish between sent and received messages in client*
- *Limit to 140 characters*
- *Ensure text remains within list item*
- *Login page*
- *Identify user on server*
- *Display users on client*
- *Add user authentication*
- *Add user signup*
- *Move users to a database so we can maintain state past the server's life*
- Identify message sender on recipient clients
