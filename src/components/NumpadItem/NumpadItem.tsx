import React from "react";
import styled from 'styled-components';
import { StyledButton } from "./style";


export default function NumpadItem({value, onClick}: any) {
    return (
        <StyledButton onClick={() => onClick(value)}>
            {value}
        </StyledButton>
    );
}