import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  strong {
    font-size: 24px;
    color: #444;
    font-weight: bold;
    display: block;
  }

  table {
    width: 100%;
    margin-top: 10px;
    border: none;
    border-collapse: separate;
    border-spacing: 0 1.2em;

    th {
      color: #444;
      text-align: left;
    }

    th:first-child {
      padding-left: 20px;
    }

    th:last-child {
      text-align: center;
    }

    td {
      color: #666;
      text-align: left;
      font-size: 16px;
      vertical-align: middle;
      padding: 10px 0;

      button {
        border: 0;
        background: none;
        vertical-align: middle;
      }
    }

    td:first-child {
      padding-left: 20px;
      padding-right: 0;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    td:last-child {
      text-align: center;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    tbody > tr {
      background: #fff;
      border-radius: 4px;
      margin-right: 10px !important;
      height: 45px;
      vertical-align: middle;
    }

    .empty {
      background: transparent;
    }
  }
`;

const rotate = keyframes`
  from{
    transform: rotate(0deg)
  }

  to{
    transform: rotate(360deg)
  }
`;

export const Loading = styled.div`
  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;

export const Modal = styled.div`
  height: 100vh;
  width: 100vw;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);

  div {
    background: #fff;
    border-radius: 4px;
    padding: 29px;
    width: 450px;

    strong {
      font-size: 14px;
      font-weight: bold;
      color: #444;
    }

    p {
      font-size: 14px;
      color: #666;
      display: block;
      padding-top: 3px;
    }
  }
`;
