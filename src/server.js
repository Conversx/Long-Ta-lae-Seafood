import express from 'express';
import cors from 'cors';

const app = express();

// Enable CORS for all routes
app.use(cors());

// Your other routes and middleware

app.listen(7279, () => {
  console.log('Server is running on port 7279');
});
