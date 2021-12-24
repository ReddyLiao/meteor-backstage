import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Dashboard from '/imports/ui/component/Dashboard';
import NavBar from '/imports/ui/component/NavBar';
import Order from './order';
import { orderMenu } from '/imports/fixture/menu';

const Index = (props) => {
    const { menu } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div>
            <Dashboard sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="md:pl-64 flex flex-col">
                <main className="flex-1">
                    <NavBar menus={orderMenu} menu={menu} setSidebarOpen={setSidebarOpen} />
                    {(menu === 'main' && <Order />) || undefined}
                </main>
            </div>
        </div>
    );
};

export default Index;
