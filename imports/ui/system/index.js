import React from 'react';
import { useParams } from 'react-router-dom';

import NavBar from '/imports/ui/component/NavBar';
import Button from './button';
import Role from './role';
import Users from './users';
import { systemMenu } from '/imports/fixture/menu';

const Index = () => {
    const { menu } = useParams();
    return (
        <div>
            <NavBar menus={systemMenu} menu={menu} />
            {(menu === 'button' && <Button />) || undefined}
            {(menu === 'role' && <Role />) || undefined}
            {(menu === 'users' && <Users />) || undefined}
        </div>
    );
};

export default Index;
