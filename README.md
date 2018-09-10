
# Simple Chat Client and Server

## Description

A simple socket.io chat client and server with a responsive AngularJS/Bootstrap UI.

## Repository

https://github.com/PanchoPuncho/simple-chat

## Dependencies

- mongod@v4.0.2
- node@v8.11.4

## Step-by-step instructions (for macOS)

### If Needed, Install Node.js

`brew install node`

### Install the App (only necessary for the initial run)

`npm install`

### Start MongoDB

If needed, https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/  
`mongod`

### Open a New Terminal Window and Run the App

`node src/js/server`

### Navigate To http://localhost:3000

### [Optional] Connect to MongoDB through CLI

- `mongo --host 127.0.0.1:27017`
- `use simple-chat`
- `db.users.find()`

## Criteria

### Server

- Support at least 2 simultaneous clients
  - Supports n-clients

### Client

- Left (or right) windows displaying connected usernames
  - Left window - collapses when accessed through mobile or other portrait style screen.
- Main panel displaying the chat log
  - Displays and distinguishes between sent messages, received messages, and server level messages with updates on connected and disconnected users.
- Chat log should only display the message form the current session (server does not need to push a history)
  - Accordingly, only displaying messages from the current session

### Bonus

- Utilize WebSockets for communication
  - Using socket.io for real-time communication
- User signup (create a username and password), with authentication
  - Using socketio-auth for authentication and MongoDB to store the username, password hash, and user state (active/inactive).

## Running End-To-End Tests

- webdriver-manager update && webdriver-manager start
- protractor e2e/protractor.conf.js

## References

https://socket.io/get-started/chat  
https://www.npmjs.com/package/socketio-auth  
https://medium.com/@rwillt/authenticating-socket-io-clients-f1e6f39a25fe  
