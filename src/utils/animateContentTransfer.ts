export default (sourceCell: HTMLElement, targetCell: HTMLElement, duration: number) => {
  const targetCellStyle = targetCell.style
  targetCellStyle.fontSize = '0px'
  targetCell.textContent = sourceCell.textContent
  const fakeCell = document.createElement('td')
  const fakeCellStyle = fakeCell.style
  fakeCellStyle.opacity = null
  fakeCellStyle.position = 'absolute'
  fakeCellStyle.backgroundRepeat = 'no-repeat'
  fakeCell.textContent = sourceCell.textContent
  const computedStyle = getComputedStyle(sourceCell)
  for (let s of ['width', 'border', 'padding', 'padding-left', 'background-position', 'background-image']) {
      fakeCellStyle[s] = computedStyle[s]
  }
  const sourceCellBox = sourceCell.getBoundingClientRect()
  fakeCellStyle.transform = `translate(${sourceCellBox.left}px, ${sourceCellBox.top}px)`
  fakeCellStyle.height = sourceCellBox.height - 5 + 'px'
  fakeCellStyle.borderColor = 'rgba(0,0,0,0)'
  fakeCellStyle.paddingTop = '3px'
  fakeCellStyle.backgroundColor = null
  document.body.appendChild(fakeCell)

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
