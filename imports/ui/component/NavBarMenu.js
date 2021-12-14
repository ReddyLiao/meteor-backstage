import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import NavBarEnd from './NavBarEnd';

const NavBarMenu = (props) => {
    const history = useHistory();
    const menus = props.menus;
    const menu = props.menu;

    // 將User點到的地方反白
    const menuID = menu && _.find(menus, { menu })?._id;
    useEffect(() => {
        [...document.getElementsByClassName('navbarMenu')].forEach((element) => {
            element.classList.remove('is-active');
        });
        document.getElementById(menuID)?.classList?.add('is-active');
    }, [menu]);

    return (
        <div id="nav-menu" className="navbar-menu has-background-grey-lighter">
            <div className="navbar-start">
                {menus.map((m) => {
                    const { _id, url, name, icon, roles, subMenu, isShow } = m;

                    if (subMenu) {
                        return (
                            <li id={_id} key={_id} className="navbar-item has-dropdown is-hoverable">
                                <div className="navbar-link">{name}</div>
                                <div className="navbar-dropdown">
                                    {subMenu.map((s) => {
                                        const { _id, url, name, icon, roles, isShow } = s;

                                        return (
                                            <a
                                                key={_id}
                                                id={_id}
                                                className="navbarMenu navbar-item is-tab"
                                                onClick={() => history.push(url)}
                                            >
                                                <div>
                                                    <span className="icon is-medium">
                                                        <i className={icon} />
                                                    </span>
                                                    {name}
                                                </div>
                                            </a>
                                        );

                                        return undefined;
                                    })}
                                </div>
                            </li>
                        );
                    }
                    return (
                        <li
                            key={_id}
                            id={_id}
                            className="navbarMenu navbar-item is-tab "
                            onClick={() => history.push(url)}
                        >
                            <i className={icon} />
                            {name}
                        </li>
                    );

                    return undefined;
                })}
            </div>
            <NavBarEnd />
        </div>
    );
};

NavBarMenu.propTypes = {
    menus: PropTypes.array.isRequired,
    menu: PropTypes.string.isRequired,
};

export default NavBarMenu;
