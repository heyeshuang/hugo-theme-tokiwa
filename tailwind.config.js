module.exports = {
  theme: {
    textIndent: { // defaults to {}
      '1': '1rem',
      '2': '2rem',
    },
    textShadow: { // defaults to {}
      'default': '0 2px 5px rgba(0, 0, 0, 0.5)',
      'lg': '0 2px 10px rgba(0, 0, 0, 0.5)',
    },
    textStyles: theme => ({ // defaults to {}
      heading: {
        output: false, // this means there won't be a "heading" component in the CSS, but it can be extended
        fontWeight: theme('fontWeight.bold'),
        lineHeight: theme('lineHeight.tight'),
      },
      h1: {
        extends: 'heading', // this means all the styles in "heading" will be copied here; "extends" can also be an array to extend multiple text styles
        fontSize: theme('fontSize.5xl'),
        '@screen sm': {
          fontSize: theme('fontSize.6xl'),
        },
      },
      h2: {
        extends: 'heading',
        fontSize: theme('fontSize.4xl'),
        '@screen sm': {
          fontSize: theme('fontSize.5xl'),
        },
      },
      h3: {
        extends: 'heading',
        fontSize: theme('fontSize.4xl'),
      },
      h4: {
        extends: 'heading',
        fontSize: theme('fontSize.3xl'),
      },
      h5: {
        extends: 'heading',
        fontSize: theme('fontSize.2xl'),
      },
      h6: {
        extends: 'heading',
        fontSize: theme('fontSize.xl'),
      },
      link: {
        fontWeight: theme('fontWeight.bold'),
        color: theme('colors.java.500'),
        '&:hover': {
          color: theme('colors.java.700'),
          // color: theme('colors.blue-stone.500'),
          textDecoration: 'underline',
        },
      },
      richText: {
        fontWeight: theme('fontWeight.normal'),
        fontSize: theme('fontSize.base'),
        lineHeight: theme('lineHeight.relaxed'),
        '> * + *': {
          marginTop: '1rem',
        },
        'h1': {
          extends: 'h1',
        },
        'h2': {
          extends: 'h2',
        },
        'h3': {
          extends: 'h3',
        },
        'h4': {
          extends: 'h4',
        },
        'h5': {
          extends: 'h5',
        },
        'h6': {
          extends: 'h6',
        },
        'ul': {
          listStyleType: 'square',
          listStylePosition:'inside'
        },
        'ol': {
          listStyleType: 'lower-greek',
          listStylePosition:'inside'
        },
        'li > ol, li > ul': {
          marginLeft: theme("spacing.2")
        },
        '.footnotes ol':{
          listStyleType: 'decimal',
          listStylePosition:'outside'
        },
        'mark':{
            backgroundColor:theme("colors.java.300"),
            borderBottomWidth:"2px",
            borderBottomColor:theme("colors.java.600"),
            padding: "2px",
            margin: "0 5px"
        },
        "table":{
          tableLayout:"auto"
        },
        "th,td":{
          borderBottomWidth: "1px",
          borderBottomColor: theme("colors.java.600"),
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          paddingLeft: "1rem",
          paddingRight: "1rem"
        },
        th:{
          backgroundColor:theme("colors.java.100"),
          borderTopWidth: "1px",
          borderTopColor: theme("colors.java.600"),
        },
        'a': {
          extends: 'link',
        },
        'b, strong': {
          fontWeight: theme('fontWeight.bold'),
        },
        'i, em': {
          fontStyle: 'italic',
        },
        'sub, sup':{
          fontSize: theme('fontSize.xs'),
          verticalAlign:'baseline'
        },
      },
    }),
    extend: {
      colors: { // color scheme:
        // https://javisperez.github.io/tailwindcolorshades/#/?blue-stone=085f63&java=49beb7&golden-tainoi=facf5a&eucalyptus=028760&Medium%20Red%20Violet=c64191&tv=1
      'eucalyptus': {
        100: '#E6F3EF',
        200: '#C0E1D7',
        300: '#9ACFBF',
        400: '#4EAB90',
        500: '#028760',
        600: '#027A56',
        700: '#01513A',
        800: '#013D2B',
        900: '#01291D',
      },
        'java': {
        100: '#EDF9F8',
        200: '#D2EFED',
        300: '#B6E5E2',
        400: '#80D2CD',
        500: '#49BEB7',
        600: '#42ABA5',
        700: '#2C726E',
        800: '#215652',
        900: '#163937',
        },
    
        'golden-tainoi': {
        100: '#FFFAEF',
        200: '#FEF3D6',
        300: '#FDECBD',
        400: '#FCDD8C',
        500: '#FACF5A',
        600: '#E1BA51',
        700: '#967C36',
        800: '#715D29',
        900: '#4B3E1B',
        },
        'medium-red-violet': {
        100: '#F9ECF4',
        200: '#F1D0E4',
        300: '#E8B3D3',
        400: '#D77AB2',
        500: '#C64191',
        600: '#B23B83',
        700: '#772757',
        800: '#591D41',
        900: '#3B142C',
        },
    },
    },
  },
  variants: {},
  plugins: [require('tailwindcss-typography')({
      // all these options default to the values specified here
      ellipsis: true,         // whether to generate ellipsis utilities
      hyphens: true,          // whether to generate hyphenation utilities
      kerning: true,          // whether to generate kerning utilities
      textUnset: true,        // whether to generate utilities to unset text properties
      componentPrefix: 'c-',  // the prefix to use for text style classes
    }),],
}
