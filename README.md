  <h1 align="center">BrainHub API</h3>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Test](#test)

<!-- ABOUT THE PROJECT -->

## About The Project

Serverless API for event creation

### Built With

- AWS Lambda
- serverless
- MongoDB
- Mongoose

<!-- GETTING STARTED -->

## Getting Started

1. You need mongoDB cluster. Create .env file at the root with the URL for that cluster
   <br>
   `MONGODB_URI= xxx`
2. You need to authenticate serverless with AWS

```bash
   $ sls config credentials --provider aws --key ACCESS_KEY --secret SECRET_KEY
```

3. Install dependency

```bash
   $ npm i
```

3. Deploy your lambdas

```bash
  $ sls deploy
```

<!-- Test -->

## Test

#### Run local test

```bash
   $ npm test
```

#### Test your lambdas offline

```bash
   $ npm lambda-test
```
