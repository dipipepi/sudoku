import React from "react";
import { useState } from "react";
import { DIFFICULTY_LEVELS } from "../../const/index";
import {
  StyledCreateGameButton,
  StyledCreator,
  StyledCreatorButton,
  StyledCreatorWrapper,
  StyledDifficultySection,
} from "./style";

type Props = {
  onChange: (difficultyLevel: string) => void;
};

export function GameCreator({ onChange }: Props) {
  const [difficultyLevel, setDifficultyLevel] = useState("Easy");
  const difficultyValues = Object.entries(DIFFICULTY_LEVELS);

  return (
    <StyledCreatorWrapper>
      <StyledCreator>
        <StyledDifficultySection>
          <h4>Select dificult level</h4>
          {difficultyValues.map((item) => {
            return (
              <StyledCreatorButton
                key={item[0]}
                isActive={difficultyLevel === item[1]}
                onClick={() => setDifficultyLevel(item[1])}
              >
                {item[1]}
              </StyledCreatorButton>
            );
          })}
        </StyledDifficultySection>
        <StyledCreateGameButton onClick={() => onChange(difficultyLevel)}>
          Start Game
        </StyledCreateGameButton>
      </StyledCreator>
    </StyledCreatorWrapper>
  );
}
