import styled, { keyframes } from 'styled-components';
import { darken, lighten } from 'polished';

const statusColor = {
  pendente: '#C1BC35',
  entregue: '#2CA42B',
  retirada: '#2A71F5',
  cancelada: '#DE3B3B',
};

export const Container = styled.div`
  width: 100%;
  strong {
    font-size: 24px;
    color: #444;
    font-weight: bold;
    display: block;
  }

  .topContent {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 15px;

    button {
      margin: 5px 0 0;
      height: 36px;
      background: #7d40e7;
      color: #fff;
      text-transform: uppercase;
      font-weight: bold;
      border: 0;
      padding: 0 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-radius: 4px;
      font-size: 14px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
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

export const SearchInput = styled.div`
  display: flex;
  margin-top: 15px;
  input {
    border: 1px solid #dddddd;
    border-radius: 4px;
    height: 36px;
    width: 237px;
    padding: 0 15px;
    padding-left: 30px;
    color: #333;
    margin: 0 0 10px;
    &::placeholder {
      color: #999;
    }
  }

  svg {
    position: absolute;
    margin-left: 10px;
    margin-top: 10px;
  }
`;

export const Status = styled.div`
  background: ${(props) => lighten(0.4, statusColor[props.status])};
  display: inline;
  padding: 3px 10px;
  border-radius: 10px;

  span {
    color: ${(props) => statusColor[props.status]};
    text-transform: uppercase;
    font-weight: bold;

    &::before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 7px;
      border-radius: 50%;
      background: ${(props) => statusColor[props.status]};
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

    span {
      font-size: 14px;
      color: #666;
      display: block;
      padding-top: 3px;
    }

    hr {
      height: 1px;
      border: 0.5px solid #eee;
      margin: 12px 0;
    }
    img {
      max-width: 90%;
      max-height: 60px;
      margin: 0 auto;
      margin-top: 15px;
    }
  }
`;
