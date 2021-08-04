# Theme Tokiwa

Theme Tokiwa is a minimalistic blog theme. Tokiwa-iro is the main color tone and the name of this theme. 

Built on the top of [Jim Frenette's](https://jimfrenette.com/2019/02/hugo-static-site-generator-blank-starter-theme/) [Hugo Starter Theme](https://github.com/jimfrenette/hugo-starter) and [Tailwind CSS](https://tailwindcss.com/). Inspired by [Tailwind Toolbox - Minimalist-Blog](https://github.com/tailwindtoolbox/Minimalist-Blog).

This theme is especially optimized for Chinese characters, while works well with other languages.

## Screenshot

![1](https://raw.githubusercontent.com/heyeshuang/hugo-theme-tokiwa/master/images/screenshot.png)
![2](https://raw.githubusercontent.com/heyeshuang/hugo-theme-tokiwa/master/images/screenshot02.png)

A live demo is at <http://heysh.xyz/hugo-theme-tokiwa/>.

## Install

Inside the folder of your Hugo site run:
```bash
$ git submodule add https://github.com/heyeshuang/hugo-theme-tokiwa.git themes/hugo-theme-tokiwa
```
## available config params

```toml
disqusShortname = "YOURSHORTNAME"
googleAnalytics = "UA-1234567890" # or "G-xxxxxxxx" in Google Analytics v4, in hugo v0.82+

[params]
description = """
Tokiwa-iro is the theme color of this site.
"""
math = true # for introducing $KaTEX$
env = "production" # for Google Analytics and DISQUS.
useChineseFonts = true # for font Noto Serif etc.
bannerFont = "fonts/exampleFont" # custom your own font for the title.
postDateFormat = "2006-1-2" # override custom date format posts.

[menu]
# Shown in the side menu.
  [[menu.main]]
    name = "Posts"
    weight = 1
    identifier = "post"
    url = "/post/"
  [[menu.main]]
    name = "Tags"
    url = "/tags/"
    weight = 2

[social]
instagram="http://example.com/"
bilibili="http://example.com/"
weibo="http://example.com/"
zhihu="http://example.com/"
twitter="http://twitter.com/"
gitlab="http://gitlab.com/"
youtube="http://youtube.com/"
github="http://github.com/"
```

A complete `config.toml` example is in the `exampleSite` folder.


## Dev this theme

Install node modules

```
cd blog/themes/hugo-theme-tokiwa

npm i
```

Unminified development build with sourcemaps

```
cd blog/themes/hugo-theme-tokiwa
    
npm run dev
```

Build for production with npm run build. CSS and JavaScript files will be output into the starter themes dist folder. e.g.,

```
cd blog/themes/hugo-theme-tokiwa
    
npm run build
```

## Credit

* [hugoBasicExample](https://github.com/gohugoio/hugoBasicExample.git) is used to mock data.
* [Tailwind CSS](https://tailwindcss.com/)
* [Hugo Static Site Generator Blank Starter Theme](https://github.com/jimfrenette/hugo-starter)
* [Tailwind Toolbox - Minimalist-Blog](https://github.com/tailwindtoolbox/Minimalist-Blog)
* Fonts. `杨任东竹石体` was used for the banner in the beginning. This font is okay for commercial usage. However, I wonder if it is compatible with ~~GPL~~ MIT, so I replaced it with an `exampleFont` in the `exampleSite`. See `config.toml`.
* And the open, warm-hearted [Noto Serif CN](https://www.google.com/get/noto/help/cjk/). Always a good choice for Chinese words. Under [OFL 1.1](https://github.com/googlefonts/noto-cjk/blob/master/LICENSE). 
* Beautiful icons made by [Remix-Design](https://github.com/Remix-Design/remixicon). Under [Apache 2.0](https://raw.githubusercontent.com/Remix-Design/RemixIcon/master/License).
* [fuse.js](https://fusejs.io/) for fuzzy search, and a [blog post](https://ttys3.net/post/hugo/hugo-fast-search/) (in Chinese) about how to use it. 

Thanks.

## LICENSE

MIT
