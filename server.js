import Express from 'express';
import { env } from 'process';
import bodyParser from 'body-parser';
import routes from './routes/index';

const app = Express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/', routes);
app.listen(env.port || 5000, '0.0.0.0', () => {
  console.log('connected');
});
