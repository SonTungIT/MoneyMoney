import React, { useState } from 'react';
import './ImportModal.scss';
import Button from '../../Button';
import { IconGroup, IconRight, IconSP, IconWallet2 } from '../../Icons';
import ImportDetail from './ImportDetail/ImportDetail';
import { DatePicker, Space } from 'antd';

function ImportModal({ closeModal }) {
    const [openDetail, setOpenDetail] = useState(false);

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Thêm giao dịch</h1>
                </div>
                <form className="form-input">
                    <div className="body">
                        <label className="label-input">
                            <div className="content-input">
                                <p>Ví</p>
                                <Button
                                    leftIcon={<IconWallet2 />}
                                    // type="button"
                                    // onClick={() => {
                                    //     setOpenDetail(true);
                                    // }}
                                >
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
                                        Chọn nhóm
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
                        <Button
                            onClick={() => {
                                closeModal(false);
                            }}
                            text
                        >
                            Hủy
                        </Button>
                        <Button type="submit" rounded>
                            Lưu
                        </Button>
                    </div>
                </form>
            </div>
            {openDetail && <ImportDetail closeDetail={setOpenDetail} />}
        </div>
    );
}

export default ImportModal;
