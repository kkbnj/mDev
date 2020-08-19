const path = require('path')


// START ENV VARS
const PORT = 3000,
      WATCH_INTERVAL = 400,

      PROTOCOL = 'https',
      SERVER_NAME = 'pxxx.jp',

      PUBLIC_DIR = 'public',
      INDEX_DIR = '',
      ASSETS_DIR = path.join(INDEX_DIR, 'assets'),
      CSS_DIR = path.join(ASSETS_DIR, 'css'),
      JS_DIR = path.join(ASSETS_DIR, 'js'),
      IMAGE_DIR = path.join(ASSETS_DIR, 'images'),
      START_DIR = path.join(INDEX_DIR, ''),
      WP = false,
      WP_DIR = 'www/app/public',
      WP_THEME_DIR = path.join(WP_DIR, 'cms/wp-content/themes/template_name'),
      WP_COPY_FILES = [
        // ['about/index.html', 'about'],
      ],
      OUTPUT_PATH = [
        // {
        //   pug: '',
        //   dirname: '',
        //   filename: '',
        // },
      ],
      HTML_MINIFY = true,
      CSS_MINIFY = true,
      JS_MINIFY = true,
      SHIFT_JIS = false,

      SRC_DIR = 'src',
      PUG_DIR = 'pug',
      STYLUS_DIR = 'stylus',
      BABEL_DIR = 'babel'
// END ENV VARS



const HOST_NAME = PROTOCOL + '://' + SERVER_NAME,
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
      gulpif = require('gulp-if'),
      flatmap = require('gulp-flatmap'),
      browserSync = require('browser-sync').create(),
      plumber = require('gulp-plumber'),
      notifier = require('node-notifier'),
      cached = require('gulp-cached'),
      pug = require('gulp-pug'),
      stylus = require('gulp-stylus'),
      nib = require('nib'),
      named = require('vinyl-named'),
      rename = require('gulp-rename'),
      replace = require('gulp-replace'),
      webpack = require('webpack'),
      gulpWebpack = require('webpack-stream'),
      convertEncoding = require('gulp-convert-encoding')


var errorHandler = function (error) {
  notifier.notify({
    title: 'compile error!',
    message: error.message,
    // icon: path.join(__dirname, 'error.png'),
    sound: true
  }, function () {
    console.log(error.message);
  });
};


gulp.task('default', ['server', 'build', 'watch', 'copy'])


gulp.task('build', ['pug', 'stylus', 'webpack', 'copy'])


gulp.task('copy', ['copy_html', 'copy_css', 'copy_js', 'copy_others', 'copy_wp'])


gulp.task('watch', () => {
  notifier.notify({
    title: 'Gulp',
    message: 'watch start!',
  });

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

  gulp.watch(
    [
      path.join(PUBLIC_DIR, '**', '*.html'),
    ],
    {
      interval: WATCH_INTERVAL,
    },
    ['copy_html']
  )

  gulp.watch(
    [
      path.join(PUBLIC_DIR, '**', '*.css'),
    ],
    {
      interval: WATCH_INTERVAL,
    },
    ['copy_css']
  )

  gulp.watch(
    [
      path.join(PUBLIC_DIR, '**', '*.js'),
    ],
    {
      interval: WATCH_INTERVAL,
    },
    ['copy_js']
  )

  gulp.watch(
    [
      path.join(PUBLIC_DIR, '**', '*'),
      '!**/*.html',
      '!**/*.css',
      '!**/*.js',
    ],
    {
      interval: WATCH_INTERVAL,
    },
    ['copy_others']
  )

  gulp.watch(
    [
      path.join(PUBLIC_DIR, '**', '*'),
    ],
    {
      interval: WATCH_INTERVAL,
    },
    ['copy_wp']
  )
})


gulp.task('copy_html', () => {
  gulp
    .src(path.join(SRC_DIR, PUG_DIR, 'extra', '**', '*.html'))
    .pipe(plumber({
      errorHandler: errorHandler,
    }))
    .pipe(gulp.dest(path.join(PUBLIC_DIR, INDEX_DIR)))
})

gulp.task('copy_css', () => {
  gulp
    .src(path.join(SRC_DIR, STYLUS_DIR, 'extra', '**', '*.css'))
    .pipe(plumber({
      errorHandler: errorHandler,
    }))
    .pipe(gulp.dest(path.join(PUBLIC_DIR, CSS_DIR)))
})

gulp.task('copy_js', () => {
  gulp
    .src(path.join(SRC_DIR, BABEL_DIR, 'extra', '**', '*.js'))
    .pipe(plumber({
      errorHandler: errorHandler,
    }))
    .pipe(gulp.dest(path.join(PUBLIC_DIR, JS_DIR)))
})

gulp.task('copy_others', () => {
  gulp
    .src([
      path.join(SRC_DIR, PUG_DIR, 'extra', '**', '*'),
      '!**/*.html',
      '!**/*.css',
      '!**/*.js',
    ])
    .pipe(plumber({
      errorHandler: errorHandler,
    }))
    .pipe(gulp.dest(path.join(PUBLIC_DIR, INDEX_DIR)))
})

gulp.task('copy_wp', () => {
  if(WP) {
    setTimeout(() => {
      gulp
        .src([
          path.join(PUBLIC_DIR, INDEX_DIR, 'assets/**/*'),
        ])
        .pipe(gulp.dest(path.join(WP_THEME_DIR, 'assets')))

      for(let i = 0; i < WP_COPY_FILES.length; i++) {
        gulp
          .src([
            path.join(PUBLIC_DIR, INDEX_DIR, WP_COPY_FILES[i][0]),
          ])
          .pipe(gulp.dest(path.join(WP_DIR, WP_COPY_FILES[i][1])))
      }
    })
  }
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
      errorHandler: errorHandler,
    }))
    .pipe(pug(options))
    .pipe(gulpif(SHIFT_JIS && OUTPUT_PATH.length <= 0, replace('text/html; charset=UTF-8', 'text/html; charset=Shift_JIS')))
    .pipe(gulpif(SHIFT_JIS && OUTPUT_PATH.length <= 0, replace('"/>', '" />')))
    .pipe(gulpif(SHIFT_JIS && OUTPUT_PATH.length <= 0, replace('<br/>', '<br />')))
    .pipe(gulpif(SHIFT_JIS && OUTPUT_PATH.length <= 0, convertEncoding({to: 'Shift_JIS'})))
    // .pipe(rename((path) => {
    //   path.basename += '_sjis'
    // }))
    .pipe(gulp.dest(path.join(PUBLIC_DIR, INDEX_DIR)))
    .pipe(flatmap((stream, file) => {
      if(OUTPUT_PATH.length > 0) {
        let pathname = file.path.split(path.join(PUBLIC_DIR, INDEX_DIR, '/'))[1]

        pathname = pathname.split(path.extname(pathname))[0]

        for(let i = 0; i < OUTPUT_PATH.length; i++) {
          if(OUTPUT_PATH[i].pug === pathname) {
            gulp.src(file.path)
              .pipe(gulpif(SHIFT_JIS, replace('text/html; charset=UTF-8', 'text/html; charset=Shift_JIS')))
              .pipe(gulpif(SHIFT_JIS, replace('"/>', '" />')))
              .pipe(gulpif(SHIFT_JIS, replace('<br/>', '<br />')))
              .pipe(gulpif(SHIFT_JIS, convertEncoding({to: 'Shift_JIS'})))
              .pipe(rename((path) => {
                path.basename = OUTPUT_PATH[i].filename
              }))
              .pipe(gulp.dest(path.join(PUBLIC_DIR, OUTPUT_PATH[i].dirname)))
          }
        }
      }

      return stream
    }))
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
      errorHandler: errorHandler,
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
      errorHandler: errorHandler,
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
    startPath: (START_DIR ? '/' + START_DIR + '/' : ''),
    server: {
      baseDir: PUBLIC_DIR,
    }
  })
})
