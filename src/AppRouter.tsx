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
import ListScreen from './component/ListScreen/ListScreen';

import ConfigContext from './ConfigContext';

const storageArray = ['@yearMin', '@yearMax', '@priceMin', '@priceMax'];

export default function AppRouter() {
  const [yearRange, setYearRange] = React.useState<[number, number]>([2004, 2020]);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 33]);

  React.useEffect(() => {
    if (sessionStorage.getItem(storageArray[0])) {
      setYearRange([Number(sessionStorage.getItem(storageArray[0])),
        Number(sessionStorage.getItem(storageArray[1]))]);
    }

    if (sessionStorage.getItem(storageArray[2])) {
      setPriceRange([Number(sessionStorage.getItem(storageArray[2])),
        Number(sessionStorage.getItem(storageArray[3]))]);
    }
  }, []);

  return (
    <Router>
      <ConfigContext.Provider
        value={{
          yearRange, priceRange, setYearRange, setPriceRange,
        }}
      >
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/list" component={ListScreen} />
          <Route path="/comments" component={CommentScreen} />
          <Route path="/viewing-room/:idx" component={ViewingRoomScreen} />
          <Route path="/viewing-room">
            <Redirect to="/viewing-room/0" />
          </Route>
          <Route path="/*">
            404 Not Found
          </Route>
        </Switch>
      </ConfigContext.Provider>
    </Router>
  );
}
