import styled from 'styled-components';

export const Container = styled.div``;

export const ActionList = styled.div`
  position: absolute;
  top: ${(props) => `${props.coords.y + 25}px`};
  left: ${(props) => `${props.coords.x - 75}px`};
  padding: 15px 0px;
  background: #fff;
  border-radius: 4px;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  -webkit-box-shadow: 0px 0px 10px -6px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px -6px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 10px -6px rgba(0, 0, 0, 0.75);

  div {
    margin-left: 10px;
    margin-right: 10px;

    button {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      padding: 5px 5px;
      align-items: center;
      color: #999;

      :hover {
        color: #444;
      }
    }

    span {
      font-size: 16px;
      margin-left: 7px;
    }
  }

  div:not(:first-child) {
    margin-top: 7px;
    padding-top: 7px;
    border-top: 1px solid #eee;
  }

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
  }
`;
