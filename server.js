import Express from 'express';
import { env } from 'process';
import routes from './routes/index';

const app = Express();
app.use('/', routes);
app.listen(env.port || 5000, () => {
  console.log('connected');
});
