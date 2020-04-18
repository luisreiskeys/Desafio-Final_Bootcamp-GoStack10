import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import Deliveries from '~/pages/Deliveries';
import Deliveryman from '~/pages/Deliveryman';
import Recipients from '~/pages/Recipients';
import Problems from '~/pages/Problems';
import FormDeliveryman from '~/pages/FormDeliveryman';
import FormDelivery from '~/pages/FormDelivery';
import FormRecipient from '~/pages/FormRecipient';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliveries" exact component={Deliveries} isPrivate />
      <Route path="/deliveries/form" exact component={FormDelivery} isPrivate />
      <Route path="/deliveryman" exact component={Deliveryman} isPrivate />
      <Route
        path="/deliveryman/form"
        exact
        component={FormDeliveryman}
        isPrivate
      />
      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route
        path="/recipients/form"
        exact
        component={FormRecipient}
        isPrivate
      />
      <Route path="/problems" exact component={Problems} isPrivate />
    </Switch>
  );
}
