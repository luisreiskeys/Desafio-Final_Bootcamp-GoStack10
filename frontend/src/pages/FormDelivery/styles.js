import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 900px;
  max-width: 900px;
`;

export const TopHead = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;

  strong {
    font-size: 24px;
    color: #444;
    font-weight: bold;
    display: block;
  }
  div {
    display: flex;
    flex-direction: row;

    button {
      margin-left: 15px;
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

      :first-child {
        background: #ccc;
        &:hover {
          background: ${darken(0.03, '#ccc')};
        }
      }
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 4px;
  margin-top: 20px;
  padding: 30px;

  #product {
    height: 45px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 15px;
    color: #555;
    margin: 0 0 10px;
    width: 100%;

    &::placeholder {
      color: #ccc;
    }
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 25px;
`;
