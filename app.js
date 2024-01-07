import router from './routes.js';
import express from 'express';
import auth from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';
import cors from 'cors';
import { expressjwt as jwt} from 'express-jwt';
import jwksRsa from 'jwks-rsa';
const port = 3000;
dotenv.config();

const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;

const app = express();

app.use(express.json())
app.use(cors())

app.get('/health', async (req, res) => {
  res.status(200)
  res.send("Backend is alive")
})

app.options('*', cors())

app.use(
  jwt({
    secret: jwksRsa.expressJwtSecret({
      jwksUri: `${AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`,
    }),
    audience: AUTH0_AUDIENCE,
    issuerBaseURL: AUTH0_ISSUER_BASE_URL,
    algorithms: ['RS256'],
    getToken: function fromHeaderOrQuerystring(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  })
);

app.use('/', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
