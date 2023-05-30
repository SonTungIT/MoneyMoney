import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { MenuCollapseIcon, IconWallet } from '../Icons';
import { SidebarData } from '~/assets/data/SidebarData';
import SubMenu from './SubMenu';

const cx = classNames.bind(styles);

function Sidebar() {
    const [openNavigation, setOPenNavigation] = useState(false);
    const toggleNavigation = () => setOPenNavigation(!openNavigation);

    return (
        <div className={openNavigation ? cx('sidebar', 'sidebar-respon') : cx('sidebar')}>
            <div className={cx('top-bar')}>
                {openNavigation ? (
                    <span onClick={toggleNavigation}>
                        <MenuCollapseIcon />
                    </span>
                ) : (
                    <span onClick={toggleNavigation}>
                        <MenuCollapseIcon />
                    </span>
                )}
            </div>
            {SidebarData.map((item, index) => (
                <SubMenu key={index} item={item} openNavigation={openNavigation} />
            ))}
        </div>
    );
}

export default Sidebar;
