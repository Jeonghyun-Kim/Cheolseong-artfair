import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import CommentScreen from './component/CommentScreen/CommentScreen';
import ViewingRoomScreen from './component/ViewingRoomScreen/ViewingRoomScreen';

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/comments" component={CommentScreen} />
        <Route path="/viewing-room/:idx" component={ViewingRoomScreen} />
        <Route path="/viewing-room" component={ViewingRoomScreen} />
        <Route path="*">
          <Redirect to="/viewing-room" />
        </Route>
      </Switch>
    </Router>
  );
}
