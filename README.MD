# MARVEL SUPER HEROES GAME

### WIREFRAME
[View](./Wireframe.pdf)

### DEPLOYED
[View](https://marvel-game.netlify.com/)

### RUNNING LOCALLY
```cd server && npm install && npm start```

**IMPORTANT:** *For the server a local .env file is required with the API_KEY and the PRIVATE_KEY of Marvel as per the .env-example file*

Server will run on localhost:5050 (no view just API to serve client)

```cd .. && cd client && npm install && npm start```

Client will run on localhost:3000

### TESTING CLIENT
```cd client && npm run test``` or ```cd client && npm run test:watch```

### TESTING SERVER
```cd server && npm install && npm run test``` or ```cd server &&npm install && npm run test:watch```

### ADDITIONAL IMPROVEMENTS THAT CAN BE IMPLEMENTED
1. Add tests for GameOver and GameStats components
2. Add animation to make cards flip
3. Make a signup form and keep high scores using mongodb