import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import Icecek from './pages/icecek';
import Tatli from './pages/tatli';
import Yemek from './pages/yemek';
import Home from './pages/anasayfa';
import support from './pages/support';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/yemek' component={Yemek}></Route>
      <Route exact path='/tatli' component={Tatli}></Route>
      <Route exact path='/icecek' component={Icecek}></Route>
      <Route exact path='/support' component={support}></Route>
    </Switch>
  );
}

export default Main;