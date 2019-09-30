import objectToFunction from 'utils/objectToFunction'

const data = {
  cl: {
    title: 'CL draw simulator',
    favicon: '//img.uefa.com/imgml/favicon/comp/ucl.ico',
    themeColor: '#00336a',
    description: 'Champions League draw simulator',
  },
  el: {
    title: 'EL draw simulator',
    favicon: '//img.uefa.com/imgml/favicon/comp/uefacup.ico',
    themeColor: '#f68e00',
    description: 'Europa League draw simulator',
  },
  wc: {
    title: 'FIFA World Cup draw simulator',
    favicon: '//www.fifa.com/imgml/favicon/favicon.ico',
    themeColor: '#326295',
    description: 'FIFA World Cup draw simulator',
  },
} as const

export default objectToFunction(data)
