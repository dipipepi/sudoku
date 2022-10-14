import React from "react";

export default function NumpadItem({value, onClick}: any) {


    return <div className="numpad-item" data-value={value} onClick={() => onClick(value)}>{value}</div>
}