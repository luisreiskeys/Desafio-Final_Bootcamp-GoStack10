import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  span {
    color: #666;

    span {
      color: #333;
      margin-left: 25px;
    }
  }
  div {
    display: flex;
    flex-direction: row;
  }
  button {
    border: 0;
    background: #7d40e7;
    border-radius: 4px;
    margin-left: 10px;
    justify-content: center;
    align-items: center;
    display: flex;
    transition: background 0.2s;

    :disabled {
      background: ${lighten(0.2, '#7d40e7')};
      cursor: not-allowed;
    }

    :hover {
      background: ${darken(0.04, '#7d40e7')};
      :disabled {
        background: ${darken(0.04, lighten(0.2, '#7d40e7'))};
      }
    }
  }
`;
