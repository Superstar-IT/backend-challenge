## Description
Task: MightyByte Backend Challenge

## Tech stacks
- TypeScript
- WebSocket
- [Nest](https://github.com/nestjs/nest)
- [Swagger](https://swagger.io/)
- [Class-validator](https://github.com/typestack/class-validator)


## Approach Overview
### 1. REST APIs - POST & GET methods
- Create POST api to shorten url and return code
- Create GET api to get the original URL by code

### 2. WebSocket Implementation
- Implement websocket to return code to client
s

## Quick Run
```bash
$ git clone https://github.com/Superstar-IT/backend-challenge.git
$ cd backend-challenge
$ yarn install
$ yarn dev
```

Once the server is running you can visit http://localhost:4000/api/v1/document to see the API documentation.
And then pleas open /client/index.html' on browser. After websocket is connected successfully, please test