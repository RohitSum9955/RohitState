import express from 'express';

const app = express();

//listen a port number
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
})