const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Bring in .env
const env = require('dotenv').config();

const passport = require('./strategies/sql.localstrategy');
const sessionConfig = require('./modules/session-middleware');

// Route includes
const componentRouter = require('./routes/component.router');
const moduleRouter = require('./routes/module.router');
const reportRouter = require('./routes/report.router');
const shoppingRouter = require('./routes/shopping.router');
const userRouter = require('./routes/user.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/component', componentRouter);
app.use('/api/module', moduleRouter);
app.use('/api/report', reportRouter);
app.use('/api/shopping', shoppingRouter);
app.use('/api/user', userRouter);


// Serve static files
app.use(express.static('server/public'));

const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
