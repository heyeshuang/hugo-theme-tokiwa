# Starter Theme for [Hugo](http://gohugo.io/)

[Hugo Static Site Generator Blank Starter Theme](https://jimfrenette.com/2019/02/hugo-static-site-generator-blank-starter-theme/)

## Installation

For example, if your Hugo website is in the `www` folder.
```
cd www

git init

git submodule add https://github.com/jimfrenette/hugo-starter.git themes/starter
```

## Dev Hugo Templates

```
cd www

hugo server -D
```
Preview the site, e.g., [`localhost:1313`](http://localhost:1313/)

## Webpack Dev UI

Install node modules

```
cd www/themes/starter

npm i
```

Unminified development build with sourcemaps

```
cd www/themes/starter
    
npm run dev
```

Build for production with npm run build. CSS and JavaScript files will be output into the starter themes dist folder. e.g.,

```
cd www/themes/starter
    
npm run build
```

## Comments

To enable DISQUS comments, add `disqusShortname = YOURSHORTNAME` to your config file.


## Production

To run in production (e.g. to have Google Analytics show up), run `HUGO_ENV=production` before your build command. For example:

```
HUGO_ENV=production hugo
```
