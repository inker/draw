import { firefox } from 'bowser'
import styled from './makeStyleClass'

const OFFSET_LEFT = 2
const OFFSET_TOP = 2

const airborneDivClass = styled`
  position: absolute;
  z-index: 1000;
`

const fakeCellClass = styled`
  color: initial !important;
  position: absolute !important;
  border: initial !important;
  user-select: none !important;
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

export default (sourceCell: HTMLElement, targetCell: HTMLElement, duration: number) => {
  const fakeCell = makeFakeCell(sourceCell)
  airborneDiv.appendChild(fakeCell)

  const targetCellBox = targetCell.getBoundingClientRect()
  fakeCell.style.transition = `transform ${duration}ms ease-in-out`
  adjustPositioning(fakeCell, targetCellBox)
  return new Promise<void>(resolve => {
    fakeCell.addEventListener('transitionend', e => {
      resolve()
      if (!firefox) {
        airborneDiv.removeChild(fakeCell)
        return
      }
      setTimeout(() => {
        airborneDiv.removeChild(fakeCell)
      }, 0)
    })
  })
}
