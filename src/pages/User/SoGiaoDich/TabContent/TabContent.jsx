import React from 'react';
import classNames from 'classnames/bind';
import { IconSad } from '~/components/GlobalStyles/Layout/components/Icons';
import styles from '~/pages/User/SoGiaoDich/SoGiaoDich.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { Avatar, Card, Space } from 'antd';
import config from '~/config';

function TabContent({ icon, content }) {
    return (
        <div className="container">
            {/* {icon && icon}
            <span>{content}</span> */}

            <div className="bodyTop">
                <div className="bodyDetail">
                    <span>Tiền vào</span>
                    <p className="tienVao">0</p>
                </div>
                <div className="bodyDetail">
                    <span>Tiền ra</span>
                    <p className="tienRa">-123</p>
                </div>
                <div className="bodyDetail">
                    <span></span>
                    <p className="lineTop">-123</p>
                </div>
            </div>
            <Button className="btnBaocao" small to={config.routes.BaoCao}>
                XEM BÁO CÁO GIAI ĐOẠN NÀY
            </Button>
            <div className="bodyBot">
                <div className="bodyDetail">
                    <div className="titleBody">
                        <Avatar />
                        <div className="dichVu">
                            <span>Ăn Uống</span>
                            <p>1 Transactions</p>
                        </div>
                    </div>
                    <p>123</p>
                </div>
                <div className="bodyDetail">
                    <div className="titleBody">
                        <Avatar />
                        <div className="dichVu">
                            <span>Ăn Uống</span>
                            <p>1 Transactions</p>
                        </div>
                    </div>
                    <p>123</p>
                </div>
            </div>
        </div>
    );
}

export default TabContent;
