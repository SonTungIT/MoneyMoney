import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function SubMenu({ item, openNavigation }) {
    const [openSubNav, setOpenSubNav] = useState(false);
    const toggleSubNav = () => setOpenSubNav(!openSubNav);

    return (
        <div className={cx('nav-box')}>
            <div
                to={item.path}
                className={openNavigation ? cx('nav-item', 'nav-item-res') : cx('nav-item')}
                onClick={toggleSubNav}
            >
                <NavLink to={item.path} className={cx('nav-title')}>
                    <div className={cx('icon')}>{item.icon}</div>
                    <div className={openNavigation ? cx('title', 'display') : cx('title')}>{item.title}</div>
                </NavLink>
                <div className={openNavigation ? cx('arrow-icon', 'display') : cx('arrow-icon')}>
                    {item.subNav && openSubNav ? item.iconClosed : item.iconOpened}
                </div>
            </div>
            {!openNavigation &&
                openSubNav &&
                item.subNav &&
                item.subNav.map((nav, index) => (
                    <NavLink key={index} to={nav.path} className={(nav) => cx('sub-item', { active: nav.isActive })}>
                        <div className={cx('icon')}></div>
                        <div className={cx('sub-title')}>{nav.title}</div>
                    </NavLink>
                ))}
        </div>
    );
}

SubMenu.propTypes = {
    item: PropTypes.object.isRequired,
    openNavigation: PropTypes.bool.isRequired,
};

export default SubMenu;
