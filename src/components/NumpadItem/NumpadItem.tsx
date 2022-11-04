import React from "react";
import styled from "styled-components";
import { StyledButton } from "./style";

type Props = {
  value: string;
  onClick: (value: string) => void;
};

export default function NumpadItem({ value, onClick }: Props) {
  return <StyledButton onClick={() => onClick(value)}>{value}</StyledButton>;
}
