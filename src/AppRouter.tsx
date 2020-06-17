import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import CommentScreen from './component/CommentScreen/CommentScreen';
// import ViewingRoomScreen from './component/ViewingRoomScreen/ViewingRoomScreen';
import IntroScreen from './component/IntroScreen/IntroScreen';
// import ListScreen from './component/ListScreen/ListScreen';
// import MenuScreen from './component/MenuScreen/MenuScreen';
// import ContactScreen from './component/ContactScreen/ContactScreen';

import ConfigContext from './ConfigContext';

export default function AppRouter() {
  const [idxMap, setIdxMap] = React.useState<number[]>(
    (new Array(200)).fill(undefined).map((_, idx) => idx),
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
          {/* <Route exact path="/menu" component={MenuScreen} /> */}
          <Route exact path="/" component={IntroScreen} />
          {/* <Route path="/list" component={ListScreen} /> */}
          <Route path="/comments" component={CommentScreen} />
          {/* <Route path="/contact/:idx" component={ContactScreen} /> */}
          {/* <Route path="/viewing-room/:idx" component={ViewingRoomScreen} /> */}
          {/* <Route path="/viewing-room">
            <Redirect to="/viewing-room/0" />
          </Route> */}
          <Route path="/*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </ConfigContext.Provider>
    </Router>
  );
}
