import domToImage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { format as formatDate } from 'date-fns'

type ImageFormat = 'png' | 'svg'

const formatDateAllDigits = (date: Date) =>
  formatDate(date, 'yyyyMMddHHmmssSSS')

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
  const fileName = `draw-${formatDateAllDigits(now)}.${imageFormat}`
  const dataUrl = await elToPng(el, imageFormat)
  saveAs(dataUrl, fileName)
}
