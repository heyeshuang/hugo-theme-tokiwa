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
    extend: {
      fontFamily: {
        'sans': '-apple-system, "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif',
        'serif': 'Georgia, "Nimbus Roman No9 L", "Songti SC", "Noto Serif CJK SC", "Source Han Serif SC", "Source Han Serif CN", STSong, "AR PL New Sung", "AR PL SungtiL GB", NSimSun, SimSun, "TW\-Sung", "WenQuanYi Bitmap Song", "AR PL UMing CN", "AR PL UMing HK", "AR PL UMing TW", "AR PL UMing TW MBE", PMingLiU, MingLiU, serif',
        'mono':"'Fira Code','Cascadia Code',Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New','Sarasa Mono SC','Noto Sans CJK SC','monospace', monospace"
      },
      minHeight:{
        '70vh':'70vh'
      },
      inset:{
        "-1":"-0.25rem"
      },
      flexGrow:{
        "3":3
      },
      maxHeight:{
        '16':'5rem'
      },
      maxWidth:{
        'xxs':'15em'
      },
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
