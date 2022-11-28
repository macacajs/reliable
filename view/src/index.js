import React from 'react';
import ReactGA from 'react-ga';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import './locale';
import Builds from './page/Builds';
import Setting from './page/Setting';
import Insight from './page/Insight';
import OneBuild from './page/OneBuild';
import BuildLog from './page/BuildLog';
import SnsAuthorize from './page/SnsAuthorize';

import './index.less';

const importAll = (r) => {
  return r.keys().forEach(r);
};
importAll(require.context('./assets', false, /\.svg$/));

window.addEventListener('load', () => {
  ReactGA.initialize('UA-49226133-2');
  ReactGA.pageview(window.location.pathname + window.location.search);
});

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Builds} />
      <Route exact path="/setting" component={Setting} />
      <Route exact path="/buildinfo" component={OneBuild} />
      <Route exact path="/buildlog" component={BuildLog} />
      <Route exact path="/insight" component={Insight} />
      <Route exact path="/snsAuthorize/auth" component={SnsAuthorize} />
    </div>
  </BrowserRouter>,
  document.querySelector('#app')
);
