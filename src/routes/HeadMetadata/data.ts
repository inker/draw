import objectToFunction from '#utils/objectToFunction'

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
  ecl: {
    title: 'ECL draw simulator',
    favicon: '//img.uefa.com/imgml/uefacom/uecl/favicon.ico',
    themeColor: '#1cbc28',
    description: 'Europa Conference League draw simulator',
  },
  wc: {
    title: 'FIFA World Cup draw simulator',
    favicon:
      '//img.fifa.com/image/upload/t_fe-auto/assets/img/icons/favicon.ico',
    themeColor: '#326295',
    description: 'FIFA World Cup draw simulator',
  },
} as const

export default objectToFunction(data)
