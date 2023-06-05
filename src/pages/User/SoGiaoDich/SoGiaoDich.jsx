import React from 'react';
import classNames from 'classnames/bind';
import styles from './SoGiaoDich.scss';
import LayoutUser from '../LayoutUser';
import LayoutDetails from '../LayoutDetails';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import TabContent from './TabContent/TabContent';
import { IconSad } from '~/components/GlobalStyles/Layout/components/Icons';

const cx = classNames.bind(styles);

function SoGiaoDich() {
    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: '2',
            label: `THÁNG TRƯỚC`,
            children: [
                {
                    icon: <IconSad />,
                    content: `Không có giao dịch`,
                },
            ],
        },
        {
            key: '1',
            label: `THÁNG NÀY`,
            children: [
                {
                    icon: <IconSad />,
                    content: `Không có giao dịch`,
                },
            ],
        },
        {
            key: '3',
            label: `TƯƠNG LAI`,
            children: [
                {
                    icon: <IconSad />,
                    content: `Không có giao dịch`,
                },
            ],
        },
    ];

    return (
        <LayoutUser>
            <Tabs defaultActiveKey="1" onChange={onChange} className="header">
                {items.map((item) => (
                    <TabPane tab={item.label} key={item.key}>
                        {Array.isArray(item.children) ? (
                            item.children.map((child, index) => (
                                <TabContent key={index} icon={child.icon} content={child.content} />
                            ))
                        ) : (
                            <div>{item.children}</div>
                        )}
                    </TabPane>
                ))}
            </Tabs>
        </LayoutUser>
        // <LayoutDetails>Tùng</LayoutDetails>
    );
}

export default SoGiaoDich;
