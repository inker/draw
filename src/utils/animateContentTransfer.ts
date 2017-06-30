const attrs = [
  // 'width',
  // // 'border',
  // // 'padding',
  // // 'padding-left',
  // 'background-position',
  // 'background-image',
  'font-family',
]

const OFFSET_LEFT = 2
const OFFSET_TOP = 2

function adjustPositioning(cell: HTMLElement, { left, top }: ClientRect) {
  const x = left + OFFSET_LEFT
  const y = top + OFFSET_TOP
  cell.style.transform = `translate3d(${x}px, ${y}px, 0px)`
}

export default (sourceCell: HTMLElement, targetCell: HTMLElement, duration: number) => {
  const targetCellStyle = targetCell.style
  targetCellStyle.fontSize = '0px'
  targetCell.textContent = sourceCell.textContent
  const fakeCell = sourceCell.cloneNode(true) as typeof sourceCell
  fakeCell.textContent = sourceCell.textContent
  const fakeCellStyle = fakeCell.style
  const computedStyle = getComputedStyle(sourceCell)
  for (const s of attrs) {
    fakeCellStyle[s] = computedStyle[s]
  }
  fakeCellStyle.zIndex = '1000'
  fakeCellStyle.color = 'initial'
  fakeCellStyle.opacity = null
  fakeCellStyle.position = 'absolute'
  const sourceCellBox = sourceCell.getBoundingClientRect()
  fakeCellStyle.border = 'initial'
  fakeCellStyle.backgroundColor = null
  fakeCellStyle.userSelect = 'none'
  adjustPositioning(fakeCell, sourceCellBox)
  document.body.insertBefore(fakeCell, document.body.firstElementChild)

  const targetCellBox = targetCell.getBoundingClientRect()
  fakeCellStyle.transition = `transform ${duration}ms ease-in-out`
  adjustPositioning(fakeCell, targetCellBox)
  return new Promise<void>(resolve => {
    fakeCell.addEventListener('transitionend', e => {
      document.body.removeChild(fakeCell)
      targetCellStyle.fontSize = null
      targetCellStyle.backgroundImage = sourceCell.style.backgroundImage
      resolve()
    })
  })
}
