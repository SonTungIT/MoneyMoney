// ImportDetail.jsx
import React, { useState } from 'react';
import './ImportDetail.scss';
import Button from '../../../Button';
import { IconClose, IconMenu } from '../../../Icons';
import { Avatar, Tabs, Select, Space } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';

const items = [
    {
        key: '1',
        label: `NỢ/ CHO VAY`,
        children: [
            {
                content: `Thu nợ`,
            },
            {
                content: `Đi vay`,
            },
        ],
    },
    {
        key: '2',
        label: `KHOẢN CHI`,
        children: [
            {
                content: `Ăn Uống`,
            },
            {
                content: `Giải trí`,
            },
            {
                content: `Giao thông vận tải`,
            },
            {
                content: `Sinh hoạt`,
            },
            {
                content: `Quần áo`,
            },
            {
                content: `Giáo dục`,
            },
            {
                content: `Sức khỏe`,
            },
            {
                content: `Khác`,
            },
        ],
    },
    {
        key: '3',
        label: `KHOẢN THU`,
        children: [
            {
                content: `Tiền lương`,
            },
            {
                content: `Tiền trợ cấp`,
            },
            {
                content: `Tiền thưởng`,
            },
            {
                content: `Tiền đầu tư`,
            },
            {
                content: `Chứng khoán`,
            },
            {
                content: `Cho thuê nhà`,
            },
            {
                content: `Kinh doanh online`,
            },
            {
                content: `Khác `,
            },
        ],
    },
];

function ImportDetail({ closeDetail, setSelectedGroup }) {
    const handleGroupSelection = (group) => {
        setSelectedGroup(group);
        closeDetail(false);
    };

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <div className="detailBackground">
            <div className="detailContainer">
                <div className="title">
                    <Button
                        leftIcon={<IconClose />}
                        onClick={() => {
                            closeDetail(false);
                        }}
                    ></Button>
                    <p>Chọn nhóm</p>
                </div>
                <div className="detailBody">
                    <Tabs defaultActiveKey="1" onChange={onChange} className="customTabs">
                        {items.map((item) => (
                            <TabPane tab={item.label} key={item.key}>
                                {Array.isArray(item.children) ? (
                                    item.children.map((child) => (
                                        <div
                                            className="childLabel"
                                            key={child.label}
                                            onClick={() => handleGroupSelection(child.content)}
                                        >
                                            <Avatar />
                                            <p>{child.content}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div>{item.children}</div>
                                )}
                            </TabPane>
                        ))}
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default ImportDetail;
