import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import BlockUi from '/imports/ui/component/BlockUI';
import '/imports/ui/component/BlockUI/style.css';
import Login from '/imports/ui/component/Login';
// import Landing from '/imports/ui/component/Landing';
import System from '/imports/ui/system';
import Users from '/imports/ui/users';
import User1 from '/imports/ui/system/user';
import User2 from '/imports/ui/users/user';

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
            <ProtectedRoute path="/system" comp={System} />
            <ProtectedRoute path="/users" comp={Users} />
            <ProtectedRoute exact path="/system/:menu" comp={User1} />
            <ProtectedRoute exact path="/users/:menu" comp={User2} />
            <Route>
                <NotFound />
            </Route>
        </Switch>
    </BrowserRouter>
);

Index.propTypes = {};

export const RoutingContext = React.createContext();
export default Index;
