console.log("Creating express...")

const express = require('./express');
// const bodyParser = require('./body-parser');

// const urlencodedMiddleware = bodyParser.urlencoded();

const app = new express();

function renderBody(params) {
    return `
    <html><body>
    <h1>Hello, ${params['name']}!</h1>
    <form method='post' name='myform' action='/submart'/>
        <span>Enter your name, yo :</span> <input type='text' name='name'/>
        <br/>
        <input type='hidden' name='hval' value = '#jiquieqw' />
        <input type='hidden' name='bval' value = '#!!!!!!!!' />
        <input type='hidden' name='cval' value = '🚀👩🏼‍🚀👨🏼‍🚀👩🏼‍🎤🥌' />
        <input type='hidden' name='dval' value = 'wow bob!' />
        <input type='submit' name='submitButton' value='hidden val' /> 
    </form>
    </body></html>
    `
};

// app.use(urlencodedMiddleware);
// app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
    // res.send(renderBody({ name: 'Default' }));
    console.log(req.params);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});