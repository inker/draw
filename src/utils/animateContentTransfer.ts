import delay from 'delay.js'

import { isFirefox } from 'utils/browser'

import styled from './makeStyleClass'
import { transitionEnd } from './events'

const OFFSET_LEFT = 1
const OFFSET_TOP = 1

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
  border: 1px solid transparent;
  user-select: none;
  box-sizing: border-box;
`

const airborneDiv = document.createElement('div')
airborneDiv.classList.add(airborneDivClass)
document.body.insertBefore(airborneDiv, document.getElementById('app'))

function adjustPositioning(cell: HTMLElement, { left, top }: ClientRect) {
  const x = left + OFFSET_LEFT
  const y = top + OFFSET_TOP
  cell.style.transform = `translate3d(${x}px, ${y}px, 0px)`
}

function makeFakeCell(sourceCell: HTMLElement) {
  const { width, fontFamily } = getComputedStyle(sourceCell)
  const fakeCell = sourceCell.cloneNode(true) as typeof sourceCell
  fakeCell.classList.add(fakeCellClass)
  const { style } = fakeCell
  style.width = width
  style.fontFamily = fontFamily
  fakeCell.textContent = sourceCell.textContent
  const rect = sourceCell.getBoundingClientRect()
  adjustPositioning(fakeCell, rect)
  return fakeCell
}

export default async (sourceCell: HTMLElement, targetCell: HTMLElement, duration: number) => {
  const fakeCell = makeFakeCell(sourceCell)
  airborneDiv.appendChild(fakeCell)

  const targetCellBox = targetCell.getBoundingClientRect()
  fakeCell.style.transition = `transform ${duration}ms ease-in-out`
  adjustPositioning(fakeCell, targetCellBox)

  await transitionEnd(fakeCell)
  if (isFirefox) {
    await delay(0)
  }

  airborneDiv.removeChild(fakeCell)
}
