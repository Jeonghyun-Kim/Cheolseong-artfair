import React from 'react';
import {
  // BrowserRouter as Router,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import withTracker from './withTracker';

import ViewingRoomScreen from './component/ViewingRoomScreen/ViewingRoomScreen';
import IntroScreen from './component/IntroScreen/IntroScreen';
import ListScreen from './component/ListScreen/ListScreen';
import ContactScreen from './component/ContactScreen/ContactScreen';
import SummaryScreen from './component/SummaryScreen/SummaryScreen';
import PosterContactScreen from './component/PosterContactScreen/PosterContactScreen';
import ArtistHistory from './component/ArtistHistory/ArtistHistory';
import SignatureCanvas from './component/SignatureCanvas/SignatureCanvas';

import ConfigContext from './ConfigContext';

import './common.scss';
import info from './info.json';

export default function AppRouter() {
  const [idxMap, setIdxMap] = React.useState<number[]>(
    (new Array(info.length)).fill(undefined).map((_, idx) => idx),
  );

  // const history = createBrowserHistory();

  React.useEffect(() => {
    const storedIdx = sessionStorage.getItem('@idxMap');
    if (storedIdx) {
      setIdxMap(JSON.parse(storedIdx));
    }
  }, []);

  return (
    <Router>
      <ConfigContext.Provider
        value={{ idxMap, setIdxMap }}
      >
        <Switch>
          <Route exact path="/" component={withTracker(SummaryScreen)} />
          <Route path="/intro" component={withTracker(IntroScreen)} />
          <Route path="/list" component={ListScreen} />
          <Route path="/history" component={withTracker(ArtistHistory)} />
          <Route path="/guest" component={withTracker(SignatureCanvas)} />
          <Route path="/poster/:idx" component={withTracker(PosterContactScreen)} />
          <Route path="/contact/:idx" component={withTracker(ContactScreen)} />
          <Route path="/viewing-room/:idx" component={withTracker(ViewingRoomScreen)} />
          <Route path="/viewing-room">
            <Redirect to="/viewing-room/0" />
          </Route>
          <Route path="/*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </ConfigContext.Provider>
    </Router>
  );
}
