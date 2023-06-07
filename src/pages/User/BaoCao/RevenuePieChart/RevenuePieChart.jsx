import React from 'react';
// import { Pie } from '@ant-design/charts';
import classNames from 'classnames/bind';
import styles from './RevenuePieChart.scss';

const cx = classNames.bind(styles);

const RevenuePieChart = () => {
    const data = [
        {
            type: 'Ăn uống',
            value: 27,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: false,
            },
        },
    };
    return (
        <div className={cx('containerChart')}>
            <p>Khoản thu</p>
            {/* <Pie {...config} /> */}
        </div>
    );
};

export default RevenuePieChart;
