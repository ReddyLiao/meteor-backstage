import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Dashboard from '/imports/ui/component/Dashboard';
import NavBar from '/imports/ui/component/NavBar';
import Button from './button';
import Role from './role';
import User from './user';
import { usersMenu } from '/imports/fixture/menu';

const Index = (props) => {
    const { menu } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div>
            <Dashboard sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="md:pl-64 flex flex-col">
                <main className="flex-1">
                    <NavBar menus={usersMenu} menu={menu} setSidebarOpen={setSidebarOpen} />
                    {(menu === 'button' && <Button />) || undefined}
                    {(menu === 'role' && <Role />) || undefined}
                    {(menu === 'user' && <User />) || undefined}
                </main>
            </div>
        </div>
    );
};

export default Index;
