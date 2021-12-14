import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Log } from 'meteor/logging';

import Route from '/imports/ui/route';

Log.info(navigator.language);

Meteor.startup(() => {
    render(<Route />, document.getElementById('root')); // eslint-disable-line
});
