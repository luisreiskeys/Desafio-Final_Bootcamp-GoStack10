import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

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
    table-layout: fixed;

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
