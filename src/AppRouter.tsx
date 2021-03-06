import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import ViewingRoomScreen from './component/ViewingRoomScreen/ViewingRoomScreen';
import ListScreen from './component/ListScreen/ListScreen';
import ContactScreen from './component/ContactScreen/ContactScreen';
import SummaryScreen from './component/SummaryScreen/SummaryScreen';
import PosterContactScreen from './component/PosterContactScreen/PosterContactScreen';
import ArtistHistory from './component/ArtistHistory/ArtistHistory';
import SignatureCanvas from './component/SignatureCanvas/SignatureCanvas';
import LanguageScreen from './component/LanguageScreen/LanguageScreen';

import ConfigContext from './ConfigContext';

import './common.scss';
import info from './info.json';
// import LoadingScreen from './component/LoadingScreen/LoadingScreen';

export default function AppRouter() {
  const [idxMap, setIdxMap] = React.useState<number[]>(
    (new Array(info.length)).fill(undefined).map((_, idx) => idx),
  );

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
          <Route exact path="/" component={SummaryScreen} />
          {/* <Route path="/loading" component={LoadingScreen} /> */}
          <Route path="/languages" component={LanguageScreen} />
          <Route path="/list" component={ListScreen} />
          <Route path="/history" component={ArtistHistory} />
          <Route path="/guest" component={SignatureCanvas} />
          <Route path="/poster/:idx" component={PosterContactScreen} />
          <Route path="/contact/:idx" component={ContactScreen} />
          <Route path="/viewing-room/:idx" component={ViewingRoomScreen} />
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
