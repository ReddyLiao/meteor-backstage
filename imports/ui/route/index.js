import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import BlockUi from '/imports/ui/component/BlockUI';
import '/imports/ui/component/BlockUI/style.css';
import Login from '/imports/ui/component/Login';
import Settings from '/imports/ui/settings';
import Users from '/imports/ui/users';

import NotFound from '/imports/ui/component/NotFound';

const useAccount = () =>
    useTracker(() => {
        const user = Meteor.user();
        const userId = Meteor.userId();
        return {
            user,
            userId,
            isLoggedIn: !!userId,
        };
    }, []);

const ProtectedRoute = ({ comp: Component, ...rest }) => {
    const [blockUI, setBlockUI] = useState(false);
    const { isLoggedIn, user } = useAccount();
    return (
        <Route
            {...rest}
            render={(props) => {
                return isLoggedIn ? (
                    <RoutingContext.Provider value={{ user, blockUI, setBlockUI }}>
                        <BlockUi tag="block-div" blocking={blockUI}>
                            <Component {...props} />
                        </BlockUi>
                    </RoutingContext.Provider>
                ) : (
                    <Redirect to={{ pathname: '/login' }} />
                );
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    comp: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

const Index = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={['/', '/login']}>
                <Login />
            </Route>
            <ProtectedRoute path="/settings/:menu" comp={Settings} />
            <ProtectedRoute path="/users/:menu" comp={Users} />
            <Route>
                <NotFound />
            </Route>
        </Switch>
    </BrowserRouter>
);

Index.propTypes = {};

export const RoutingContext = React.createContext();
export default Index;
