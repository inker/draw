import delay from 'delay.js'

import { isFirefox } from 'utils/browser'
import styled from 'utils/makeStyleClass'
import { transitionEnd } from 'utils/events'

const airborneDivClass = styled`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`

const fakeCellClass = styled`
  color: initial;
  position: fixed;
  margin: 0;
  user-select: none;
  pointer-events: none;
`

const airborneDiv = document.createElement('div')
airborneDiv.classList.add(airborneDivClass)
document.body.insertBefore(airborneDiv, document.getElementById('app'))

function moveTo(cell: HTMLElement, posCell: HTMLElement) {
  const { left, top } = posCell.getBoundingClientRect()
  // eslint-disable-next-line no-param-reassign
  cell.style.transform = `translate3d(${left}px, ${top}px, 0px)`
}

function makeFakeCell(sourceCell: HTMLElement) {
  const { width, fontFamily } = getComputedStyle(sourceCell)
  const fakeCell = sourceCell.cloneNode(true) as typeof sourceCell
  fakeCell.classList.add(fakeCellClass)
  const { style } = fakeCell
  style.width = width
  style.fontFamily = fontFamily
  fakeCell.textContent = sourceCell.textContent
  moveTo(fakeCell, sourceCell)
  return fakeCell
}

export default async (sourceCell: HTMLElement, targetCell: HTMLElement, duration: number) => {
  const fakeCell = makeFakeCell(sourceCell)
  airborneDiv.appendChild(fakeCell)

  fakeCell.style.transition = `transform ${duration}ms ease-in-out`
  moveTo(fakeCell, targetCell)

  await transitionEnd(fakeCell)
  if (isFirefox) {
    await delay(0)
  }

  airborneDiv.removeChild(fakeCell)
}
