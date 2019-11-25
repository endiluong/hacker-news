import styled, { css } from 'styled-components';

export const CommentsPageWrap = styled.div`
  background-color: #f6f6ef;
  height: 100%;
  width: 100%;
`;

export const CommentItemWrap = styled.div`
  padding: 10px 15px;
  ${({ paddingLeft }) => paddingLeft && css`
    padding-left: 30px;
  `}
`;

export const CommentHead = styled.div`
  color: #9b9b9b;
  font-size: 12px;
  margin-bottom: 4px;
`;

export const CommentContentWrap = styled.div`
  font-size: 13px;
  p {
    margin-top: 10px;
  }
`;

export const CommentLoadMore = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #3737f5;
  font-style: italic;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    opacity: .7;
  }
`;