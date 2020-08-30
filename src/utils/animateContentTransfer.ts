import delay from 'delay.js'

import { isFirefox } from 'utils/browser'
import styled from 'utils/makeStyleClass'
import {
  transitionEnd,
  transitionCancel,
} from 'utils/events'

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

function getPosTransform(cell: HTMLElement, posCell: HTMLElement) {
  const { left, top } = posCell.getBoundingClientRect()
  return `translate3d(${left}px, ${top}px, 0px)`
}

function makeFakeCell(sourceCell: HTMLElement) {
  const { width, fontFamily } = getComputedStyle(sourceCell)
  const fakeCell = sourceCell.cloneNode(true) as typeof sourceCell
  fakeCell.classList.add(fakeCellClass)
  const { style } = fakeCell
  style.width = width
  style.fontFamily = fontFamily
  fakeCell.textContent = sourceCell.textContent
  fakeCell.style.transform = getPosTransform(fakeCell, sourceCell)
  return fakeCell
}

export default async (sourceCell: HTMLElement, targetCell: HTMLElement, duration: number) => {
  const fakeCell = makeFakeCell(sourceCell)
  airborneDiv.appendChild(fakeCell)

  fakeCell.style.transition = `transform ${duration}ms ease-in-out`
  fakeCell.style.transform = getPosTransform(fakeCell, targetCell)

  await Promise.race([
    transitionCancel(fakeCell),
    transitionEnd(fakeCell),
  ])
  if (isFirefox) {
    await delay(0)
  }

  airborneDiv.removeChild(fakeCell)
}
