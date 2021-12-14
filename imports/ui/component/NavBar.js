import React from 'react';
import PropTypes from 'prop-types';

import NavBarBrand from './NavBarBrand';
import NavBarMenu from './NavBarMenu';

const NavBar = (props) => (
    <nav id="navbar" className="navbar has-shadow  box-shadow-y">
        <NavBarBrand />
        <NavBarMenu menus={props.menus} menu={props.menu} />
    </nav>
);

NavBar.propTypes = {
    menus: PropTypes.array.isRequired,
    menu: PropTypes.string.isRequired,
};

export default NavBar;
