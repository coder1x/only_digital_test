import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main/Main';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Main />
  </StrictMode>
);
