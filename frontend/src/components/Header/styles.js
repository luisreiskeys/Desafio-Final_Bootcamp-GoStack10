import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      height: 26px;
      border-right: 1px solid #ddd;
    }
    a {
      font-weight: bold;
      color: #999;
      margin-right: 20px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #666666;
      font-size: 14px;
    }

    button {
      color: #de3b3b;
      border: 0;
      background: none;
      margin-top: 2px;
      font-size: 14px;
    }
  }
`;
