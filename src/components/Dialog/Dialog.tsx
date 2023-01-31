import { size } from "src/constants";
import styled from "styled-components";
import { ComponentProps } from "src/types";
import { Button } from "src/components";
import { DirectionContainer } from "src/components/DirectionContainer";

const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3333;
`;

const Container = styled.div`
  display: flex;
  padding: ${size.l};
  background-color: #fff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  border-radius: 15px;
  width: 40vmax;
`;

const ContentContainer = styled(DirectionContainer)`
  overflow: hidden;
  flex: 1;
`;

const ActionsContainer = styled(DirectionContainer)`
  justify-content: flex-end;

  & :not(:last-child) {
    margin-right: ${size.s};
  }
`;

export interface DialogProps extends ComponentProps {
  onConfirm?(): void;
  onCancel?(): void;
  hasConfirm?: boolean;
}

export function Dialog({
  children,
  onConfirm,
  onCancel,
  hasConfirm = true,
}: DialogProps) {
  return (
    <Background>
      <Container>
        <ContentContainer direction="vertical">
          {children}

          <ActionsContainer>
            <Button onClick={onCancel}>Cancel</Button>
            {hasConfirm && (
              <Button kind="accent" onClick={onConfirm}>
                Confirm
              </Button>
            )}
          </ActionsContainer>
        </ContentContainer>
      </Container>
    </Background>
  );
}
