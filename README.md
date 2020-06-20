# Jagent

### This app is a simple solution for job hunters. It provides interface for searching and managing vacancies for multiple jobs.

## What is it look like?

Please visit [jagent.herokuapp.com](https://jagent.herokuapp.com/).

## Installation

### Additional software

Project uses [npm](https://www.npmjs.com) as JS package manager and [Node.js](https://nodejs.org) as JS runtime environment. Please install npm and Node.js firstly. Installation instructions you can find [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Also you need to install [MongoDB](https://www.mongodb.com).

### Downloading

- You can download and unzip project or clone repository

### Setting up database

- You need to set system variable with MongoDB URL

```bash

  MONGO_URI="mongodb://mongo_db_host/you_db_name"
  # example: MONGO_URI="mongodb://127.0.0.1/jagent"

```

### Install server side app part

1. Open project folder in terminal
1. Input next command to install project dependencies

```bash

  npm ci

```

### Install & build client side app part

1. Change folder:

```bash

  cd client

```

2. Run next command to install project dependencies

```bash

  npm ci

```

3. Build client project

```bash

  npm run build

```

### Run app

1. Move to root project folder

```bash

  cd ..

```

2. Start project

```bash

  npm run start

```

### How to use project

- Input in you favorite browser next url

```bash

  http://127.0.0.1:5000

```

## License

[MIT](https://choosealicense.com/licenses/mit/)
