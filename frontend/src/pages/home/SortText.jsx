import React, { useState } from "react";
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';

const SortText = ({ title,type, onClick }) => {

    const handleTypr = () => {
        onClick()
    }

    return (<div style={{ display: "flex", alignItems: "center" }} onClick={handleTypr}>
        <p style={{ margin: "0", marginRight: '5px' }}>{title}</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
            <CaretUpFilled style={{ color: type === 'sheng' ? '#000' : "#999" }} />
            <CaretDownFilled style={{ color: type === 'jiang' ? '#000' : "#999" }} />
        </div>
    </div>)
}

export default SortText