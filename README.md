# HR

HR is a solution for freelance human recruiters. It's provides simple work with multiple companies.

## Installation

This project use [npm](https://www.npmjs.com) JavaScript package manager and [node](https://nodejs.org) JavaScript runtime environment. Please install npm and node firstly. Installation instructions you can find [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

When you install npm and node use next steps for project installation:

1. Download and unzip project or clone repository
2. Open folder in terminal
3. Input next command to build project

```bash
npm ci
```

4. You need to change default mongodb url constant to your oun inside app.js file.

```javascript
const MONGODB_URL = "mongodb://127.0.0.1/test";
```

5. You can run project with command:

```bash
npm run start
```

6. Input in you favorite browser

```bash
http://127.0.0.1:3000/login
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
