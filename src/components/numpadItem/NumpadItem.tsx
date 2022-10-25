import React from "react";

export default function NumpadItem({value, onClick}: any) {


    return <button className="numpad-item" onClick={() => onClick(value)}>
        <p>{value}</p>
    </button>
}