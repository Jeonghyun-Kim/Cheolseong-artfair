import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import CommentScreen from './component/CommentScreen/CommentScreen';
import ViewingRoomScreen from './component/ViewingRoomScreen/ViewingRoomScreen';
import HomeScreen from './component/HomeScreen/HomeScreen';

import ConfigContext from './ConfigContext';

export default function AppRouter() {
  const [yearRange, setYearRange] = React.useState<[number, number]>([2004, 2020]);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 1650]);

  return (
    <Router>
      <Switch>
        <ConfigContext.Provider
          value={{
            yearRange, priceRange, setYearRange, setPriceRange,
          }}
        >
          <Route exact path="/" component={HomeScreen} />
          <Route path="/comments" component={CommentScreen} />
          <Route path="/viewing-room/">
            <Redirect to="/viewing-room/0" />
          </Route>
          <Route path="/viewing-room/:idx" component={ViewingRoomScreen} />
          <Route path="/*">
            404 Not Found
          </Route>
        </ConfigContext.Provider>
      </Switch>
    </Router>
  );
}
