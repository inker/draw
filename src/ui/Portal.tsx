import {
  useRef,
  useEffect,
  useMemo,
  memo,
  FC,
} from 'react'

import ReactDOM from 'react-dom'
import htmlTags from 'html-tags'

const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml'
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

type TagName = keyof ElementTagNameMap

interface Props {
  tagName: TagName,
  modalRoot: Element,
}

const Portal: FC<Props> = ({
  tagName,
  modalRoot,
  children,
}) => {
  const el = useMemo(() => {
    const ns = htmlTags.includes(tagName) && tagName !== 'svg' ? HTML_NAMESPACE : SVG_NAMESPACE
    return document.createElementNS(ns, tagName) as HTMLElement
  }, [tagName, modalRoot])

  const elRef = useRef<Element>(el)

  useEffect(() => {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot.appendChild(el)
    return () => {
      modalRoot.removeChild(el)
    }
  }, [])

  return ReactDOM.createPortal(
    children,
    elRef.current!, // this.props.modalRoot is possible
  )
}

export default memo(Portal) as typeof Portal
