import { renderToString } from 'react-dom/server';

import App from './app';
import { StaticRouter } from 'react-router-dom';

export const render = () => {
  return renderToString(<StaticRouter><App /></StaticRouter>);
};
