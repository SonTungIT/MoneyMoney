import React, { useState } from 'react';
import './ImportModal.scss';
import Button from '../../Button';
import { IconGroup, IconRight, IconWallet2 } from '../../Icons';
import ImportDetail from './ImportDetail/ImportDetail';
import { DatePicker, Space } from 'antd';

function ImportModal({ closeModal }) {
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const payload = Object.fromEntries(formData.entries());

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(payload),
            redirect: 'follow',
        };

        fetch('https://money-money.azurewebsites.net/api/v1/money-money/users/incomes', requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));
    };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Thêm giao dịch</h1>
                </div>
                <form className="form-input" onSubmit={handleFormSubmit}>
                    <div className="body">
                        <label className="label-input">
                            <div className="content-input">
                                <p>Ví</p>
                                <Button leftIcon={<IconWallet2 />}>
                                    <div className="detail-input">
                                        Tiền mặt
                                        <IconRight />
                                    </div>
                                </Button>
                            </div>
                            <div className="content-input">
                                <p>Nhóm</p>
                                <Button
                                    leftIcon={<IconGroup />}
                                    type="button"
                                    onClick={() => {
                                        setOpenDetail(true);
                                    }}
                                >
                                    <div className="detail-input">
                                        {selectedGroup ? selectedGroup : 'Chọn nhóm'}
                                        <IconRight />
                                    </div>
                                </Button>
                            </div>
                            <div className="content-input">
                                <p>Số tiền</p>
                                <input type="number" placeholder="0" />
                            </div>
                            <div className="content-input">
                                <p>Ngày</p>
                                <Space direction="vertical">
                                    <DatePicker onChange={onChange} />
                                </Space>
                            </div>
                            <div className="content-input note-input">
                                <p>Ghi chú</p>
                                <input type="text" />
                            </div>
                        </label>
                    </div>
                    <div className="ant-divider" role="separator"></div>
                    <div className="footer">
                        <Button onClick={() => closeModal(false)} text>
                            Hủy
                        </Button>
                        <Button type="submit" rounded>
                            Lưu
                        </Button>
                    </div>
                </form>
            </div>
            {openDetail && <ImportDetail closeDetail={setOpenDetail} setSelectedGroup={setSelectedGroup} />}
        </div>
    );
}

export default ImportModal;
