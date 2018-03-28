const path = require('path')

const PORT = 3000,
      WATCH_INTERVAL = 400,

      PROTOCOL = 'http',
      SERVER_NAME = 'factory.kkbnj.com',

      PUBLIC_DIR = 'public',
      INDEX_DIR = '',
      ASSETS_DIR = path.join(INDEX_DIR, 'assets'),
      CSS_DIR = path.join(ASSETS_DIR, 'css'),
      JS_DIR = path.join(ASSETS_DIR, 'js'),
      IMAGE_DIR = path.join(ASSETS_DIR, 'images'),

      HTML_MINIFY = true,
      CSS_MINIFY = true,
      JS_MINIFY = true,

      SRC_DIR = 'src',
      PUG_DIR = 'pug',
      STYLUS_DIR = 'stylus',
      BABEL_DIR = 'babel',

      HOST_NAME = PROTOCOL + '://' + SERVER_NAME,
      CANONICAL_ROOT = HOST_NAME + (INDEX_DIR ? '/' + INDEX_DIR + '/' : ''),

      COMMON_VARS = {
        PROTOCOL: PROTOCOL,
        SERVER_NAME: SERVER_NAME,
        HOST_NAME: HOST_NAME,
        CANONICAL_ROOT: CANONICAL_ROOT,

        INDEX_DIR: '/' + INDEX_DIR + (INDEX_DIR ? '/' : ''),
        ASSETS_DIR: '/' + ASSETS_DIR + (ASSETS_DIR ? '/' : ''),
        CSS_DIR: '/' + CSS_DIR + (CSS_DIR ? '/' : ''),
        JS_DIR: '/' + JS_DIR + (JS_DIR ? '/' : ''),
        IMAGE_DIR: '/' + IMAGE_DIR + (IMAGE_DIR ? '/' : ''),
      }


const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      plumber = require('gulp-plumber'),
      notify = require('gulp-notify'),
      cached = require('gulp-cached'),
      pug = require('gulp-pug'),
      stylus = require('gulp-stylus'),
      nib = require('nib'),
      named = require('vinyl-named'),
      webpack = require('webpack'),
      gulpWebpack = require('webpack-stream')

gulp.task('default', ['server', 'pug', 'stylus', 'webpack', 'watch'])

gulp.task('watch', () => {
  gulp.watch(
    [
      path.join(SRC_DIR, PUG_DIR, '**', '*')
    ],
    {
      interval: WATCH_INTERVAL,
    },
    ['pug']
  )

  gulp.watch(
    [
      path.join(SRC_DIR, STYLUS_DIR, '**', '*.styl'),
      path.join(SRC_DIR, STYLUS_DIR, '**', '*.css'),
    ],
    {
      interval: WATCH_INTERVAL,
    },
    ['stylus'],
  )

  gulp.watch(
    [
      path.join(SRC_DIR, BABEL_DIR, '**', '*.js'),
    ],
    {
      interval: WATCH_INTERVAL,
    },
    ['webpack']
  )
})

gulp.task('pug', () => {
  const options = {
    basedir: path.join(SRC_DIR, PUG_DIR),
    doctype: 'html',
    pretty: !HTML_MINIFY,
    locals: COMMON_VARS,
  }

  gulp
    .src(path.join(SRC_DIR, PUG_DIR, 'dir', '**', '*.pug'))
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(pug(options))
    .pipe(gulp.dest(path.join(PUBLIC_DIR, INDEX_DIR)))
})

gulp.task('stylus', () => {
  const options = {
    'include css': true,
    compress: CSS_MINIFY,
    import: ['nib'],
    use: [
      nib(),
    ],
    rawDefine: COMMON_VARS,
  }

  gulp
    .src(path.join(SRC_DIR, STYLUS_DIR, 'dir', '**', '*.styl'))
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(stylus(options))
    .pipe(gulp.dest(path.join(PUBLIC_DIR, CSS_DIR)))
})


gulp.task('webpack', () => {
  const options = {
    watch: false,
    cache: true,
    mode: (JS_MINIFY ? 'production' : 'development'),
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            presets: ['env'],
          }
        }
      ]
    }
  }

  gulp
    .src(path.resolve(SRC_DIR, BABEL_DIR, 'dir', '**', '*.js'))
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(named((file) => {
      // ディレクトリを維持して出力
      let dirname = path.relative(file.base, path.dirname(file.path)),
          filename = path.basename(file.path, path.extname(file.path))

      return path.join(dirname, filename)
    }))
    .pipe(gulpWebpack(options, webpack))
    .pipe(gulp.dest(path.resolve(PUBLIC_DIR, JS_DIR)))
})


gulp.task('server', () => {
  browserSync.init({
    files: path.join(PUBLIC_DIR, '**', '*'),

    port: PORT,
    https: (PROTOCOL === 'https' ? true : false),
    logLevel: 'silent',
    notify: false,
    scrollProportionally: false,
    reloadDelay: 200,
    startPath: (INDEX_DIR ? '/' + INDEX_DIR + '/' : ''),
    server: {
      baseDir: PUBLIC_DIR,
    }
  })
})
