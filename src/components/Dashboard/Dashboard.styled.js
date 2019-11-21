import styled from 'styled-components';

export const DashboardContainer = styled.div`
  height: 100vh;
  width: calc(100% - 40px);
  margin: 20px auto;
  background-color: #fff;
`;

export const DashboardTabList = styled.div`
  display: flex;
  align-items: center;
  background-color: #bf0d0d;
`;

export const DashboardTabItem = styled.div`
  padding: 6px 15px;
  cursor: pointer;
  &:first-child {
    border-right: 1px solid #fff;
  }
  &:hover {
    background-color: #EF3236;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
`;