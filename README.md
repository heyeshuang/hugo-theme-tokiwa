# Theme Tokiwa

Theme Tokiwa is a minimalistic blog theme. Tokiwa-iro is the main color tone and the name of this theme. 

Built on the top of [Hugo Starter Theme](https://jimfrenette.com/2019/02/hugo-static-site-generator-blank-starter-theme/) and [Tailwind CSS](https://tailwindcss.com/). Inspired by [Tailwind Toolbox - Minimalist-Blog](https://github.com/tailwindtoolbox/Minimalist-Blog).

This theme is especially optimized for Chinese characters, while works well with other languages.

## Screenshot

![1](https://raw.githubusercontent.com/heyeshuang/hugo-theme-tokiwa/master/images/screenshot.png)
![2](https://raw.githubusercontent.com/heyeshuang/hugo-theme-tokiwa/master/images/screenshot02.png)

## Install

Inside the folder of your Hugo site run:
```bash
$ git submodule add https://github.com/heyeshuang/hugo-theme-tokiwa.git themes/tokiwa
```
## available config params

```toml
disqusShortname = "YOURSHORTNAME"
googleAnalytics = "UA-1234567890"

[params]
description = """
Tokiwa-iro is the theme color of this site.
"""
math = true # for introducing $KaTEX$
env = "production" # for Google Analytics and DISQUS.

[menu]
# Shown in the side menu.
  [[menu.main]]
    name = "cat"
    pre = "<i class='fa fa-list fa-fw'></i>"
    weight = 1
    identifier = "post"
    url = "/post/"
  [[menu.main]]
    name = "Tags"
    pre = "<i class='fa fa-tags fa-fw'></i>"
    url = "/tags/"
    weight = 2

[social]
twitter="http://twitter.com/hh"
instagram="http://twitter.com/hh"
gitlab="http://twitter.com/hh"
youtube="http://twitter.com/hh"
github="http://github.com/hh"
```

A complete `config.toml` example is in the `exampleSite` folder.


## Dev this Templates

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
* [Hugo Static Site Generator Blank Starter Theme](https://jimfrenette.com/2019/02/hugo-static-site-generator-blank-starter-theme/)
* [Tailwind Toolbox - Minimalist-Blog](https://github.com/tailwindtoolbox/Minimalist-Blog)
* Font `杨任东竹石体` is used for the banner. 
* Beautiful icons made by [Remix-Design](https://github.com/Remix-Design/remixicon).

Thanks.