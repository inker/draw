const attrs = [
  // 'width',
  // // 'border',
  // // 'padding',
  // // 'padding-left',
  // 'background-position',
  // 'background-image',
  'font-family',
]

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
  fakeCellStyle.transform = `translate3d(${sourceCellBox.left}px, ${sourceCellBox.top}px, 0px)`
  fakeCellStyle.border = 'initial'
  fakeCellStyle.backgroundColor = null
  document.body.insertBefore(fakeCell, document.body.firstElementChild)

  const targetCellBox = targetCell.getBoundingClientRect()
  fakeCellStyle.transition = `transform ${duration}ms ease-in-out`
  fakeCellStyle.transform = `translate3d(${targetCellBox.left}px, ${targetCellBox.top}px, 0px)`
  return new Promise(resolve => {
      fakeCell.addEventListener('transitionend', e => {
          document.body.removeChild(fakeCell)
          targetCellStyle.fontSize = null
          targetCellStyle.backgroundImage = sourceCell.style.backgroundImage
          resolve()
      })
  })
}
