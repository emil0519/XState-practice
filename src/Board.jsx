import styled from "styled-components";
const BorderWrapper = styled.div`
  display: flex;
  border: 1px solid black;
  border-right: 0;
  border-bottom: 0;
  flex-wrap: wrap;
  width: 300px;
  height: 300px;
  margin: 0 auto;
`;
const SquareBlock = styled.div`
  border: 1px solid black;
  border-top: 0;
  border-left: 0;
  cursor: pointer;
  color: black;
  width: 99px;
  height: 99px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Board = ({ board, handleClick }) => {
  return (
    <BorderWrapper>
      {board.map((item, index) => (
        //originally board.fill().map(...)
        //no need to fill as we have fill already
        <SquareBlock onClick={() => handleClick(index)} key={index}>
          {item}
        </SquareBlock>
      ))}
    </BorderWrapper>
  );
};

export default Board;
