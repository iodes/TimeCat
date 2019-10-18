import * as React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  background: #30373f;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #d0d1d2;
  white-space: nowrap;
`

const Button = styled.button`
  position: relative;
  display: block;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  width: 30px;
  height: 40px;
  white-space: nowrap;
  text-indent: 100000px;
  overflow: hidden;
  outline: none;
  cursor: pointer;

  &::before {
    position: absolute;
    display: block;
    left: 50%;
    top: 50%;
    margin: -6px 0 0 -3px;
    content: '';
    border: solid transparent;
    border-width: 6px 0;
  }
`

const PrevButton = styled(Button)`
    &::before {
      border-right: 6px solid #d0d1d2;
    }
`

const NextButton = styled(Button)`
    &::before {
      border-left: 6px solid #d0d1d2;
    }
`

export class DateController extends React.Component {
  constructor(props: {}) {
    super(props)
  }

  public render() {
    return (
      <Wrap>
        <PrevButton type="button">이전</PrevButton>
        <div>지난 30일간의 사용통계</div>
        <NextButton type="button">다음</NextButton>
      </Wrap>
    )
  }
}

export default DateController
