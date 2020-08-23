import domToImage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { format } from 'date-fns/fp'

type ImageFormat = 'png' | 'svg'

const formatDate = format('yyyyMMddHHmmssSSS')

function addCaption(el: HTMLElement) {
  const mark = document.createElement('div')
  mark.textContent = window.location.hostname
  mark.style.fontSize = '12px'
  mark.style.textAlign = 'center'
  el.appendChild(mark)

  return () => {
    el.removeChild(mark)
  }
}

function elToPng(el: HTMLElement, imageFormat: ImageFormat) {
  const scale = imageFormat === 'svg'
    ? 1
    : window.devicePixelRatio

  const width = el.offsetWidth * scale
  const height = el.offsetHeight * scale

  const toImage = imageFormat === 'svg'
    ? domToImage.toSvg
    : domToImage.toPng

  return toImage(el, {
    quality: 1,
    width,
    height,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      width: `${el.offsetWidth}px`,
      height: `${el.offsetHeight}px`,
      transition: 'none !important',
    },
  })
}

export default async (el: HTMLElement, imageFormat: ImageFormat) => {
  const now = new Date()
  const fileName = `draw-${formatDate(now)}.${imageFormat}`
  const removeCaption = addCaption(el)
  const dataUrl = await elToPng(el, imageFormat)
  removeCaption()
  saveAs(dataUrl, fileName)
}
