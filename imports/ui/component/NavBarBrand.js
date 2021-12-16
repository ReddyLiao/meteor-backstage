import React from 'react';
import { useHistory } from 'react-router-dom';

const NavBarBrand = () => {
    const history = useHistory();
    function handleClick() {
        history.push('/users');
    }

    const handleCssNavToggle = () => {
        document.getElementById('nav-menu') && document.getElementById('nav-menu').classList.toggle('is-active');
    };

    const handleCssMenuToggle = () => {
        document.getElementById('column-menu') && document.getElementById('column-menu').classList.toggle('active');
    };
    return (
        <div className="navbar-brand has-background-grey-lighter is-hoverable">
            <a role="button" name="menuToggler" className="navbar-burger menu-toggler" onClick={handleCssMenuToggle}>
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
            </a>
            <a href="#" className="navbar-item has-text-weight-bold has-text-black" onClick={() => handleClick()}>
                <span className="has-text-danger">TITAN</span>
            </a>
            <a role="button" name="navToggler" className="navbar-burger nav-toggler" onClick={handleCssNavToggle}>
                <span />
                <span />
                <span />
            </a>
        </div>
    );
};

NavBarBrand.propTypes = {};

export default NavBarBrand;
