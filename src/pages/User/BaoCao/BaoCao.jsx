import React from 'react';
import classNames from 'classnames/bind';
import LayoutUser from '../LayoutUser';
import styles from './BaoCao.scss';
import RevenuePieChart from './RevenuePieChart/RevenuePieChart';

function BaoCao() {
    return (
        <LayoutUser>
            <div className="wrapper">
                {/* <RevenuePieChart /> */}
                <RevenuePieChart />
            </div>
        </LayoutUser>
    );
}

export default BaoCao;
