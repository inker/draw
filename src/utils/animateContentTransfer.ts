const attrs = [
  'width',
  // // 'border',
  // // 'padding',
  // // 'padding-left',
  // 'background-position',
  // 'background-image',
  'font-family',
]

const OFFSET_LEFT = 2
const OFFSET_TOP = 2

const airborneDiv = document.getElementById('airborne')

if (!airborneDiv) {
  throw new Error('airborne div not found')
}

function adjustPositioning(cell: HTMLElement, { left, top }: ClientRect) {
  const x = left + OFFSET_LEFT
  const y = top + OFFSET_TOP
  cell.style.transform = `translate3d(${x}px, ${y}px, 0px)`
}

export default (sourceCell: HTMLElement, targetCell: HTMLElement, duration: number) => {
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
  airborneDiv.appendChild(fakeCell)

  const targetCellBox = targetCell.getBoundingClientRect()
  fakeCellStyle.transition = `transform ${duration}ms ease-in-out`
  adjustPositioning(fakeCell, targetCellBox)
  return new Promise<void>(resolve => {
    fakeCell.addEventListener('transitionend', e => {
      airborneDiv.removeChild(fakeCell)
      resolve()
    })
  })
}
