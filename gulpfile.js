const path = require('path')

const PORT = 3001,

      // 文字コード
      HTML_CHARSET = 'utf-8',
      SP = false,

      // URL
      PROTOCOL = 'http',
      SERVER_NAME = 'maam.me',
      HOST_NAME = PROTOCOL + '://' + SERVER_NAME,

      // 公開用ディレクトリ
      PUBLIC_DIR = 'public',
      // RELATIVE_PATH = false, //未実装
      INDEX_DIR = '',
      SP_INDEX_DIR = path.join(INDEX_DIR, 'sp'),
      CANONICAL_ROOT = HOST_NAME + (INDEX_DIR ? '/' + INDEX_DIR + '/' : ''),

      // アセットディレクトリ
      ASSETS_DIR = path.join(INDEX_DIR, 'assets'),
      CSS_DIR = path.join(ASSETS_DIR, 'css'),
      JS_DIR = path.join(ASSETS_DIR, 'js'),
      IMAGE_DIR = path.join(ASSETS_DIR, 'images'),

      // SPアセットディレクトリ
      SP_ASSETS_DIR = path.join(SP_INDEX_DIR, 'assets'),
      SP_CSS_DIR = path.join(SP_ASSETS_DIR, 'css'),
      SP_JS_DIR = path.join(SP_ASSETS_DIR, 'js'),
      SP_IMAGE_DIR = path.join(SP_ASSETS_DIR, 'images'),

      // pugオプション
      PUG_OPTION = {
        doctype: 'html',
        pretty: false,
      },

      // stylusSオプション
      STYLUS_OPTION = {
        prefix: '',
        compress: true,
      },

      // 開発用ディレクトリ
      SRC_DIR = 'src',
      PUG_DIR = 'pug',
      STYLUS_DIR = 'stylus',
      BABEL_DIR = 'babel',

      // PATHオブジェクト
      COMMON_PARAMS = {
        PROTOCOL: PROTOCOL,
        SERVER_NAME: SERVER_NAME,
        HOST_NAME: HOST_NAME,
        CANONICAL_ROOT: CANONICAL_ROOT,
      };


// モジュール読み込み
const gulp = require('gulp'),
      pug = require('gulp-pug'),
      encoding = require('gulp-convert-encoding'),
      stylus = require('gulp-stylus'),
      nib = require('nib'),
      webpack = require('webpack-stream'),
      named = require('vinyl-named'),
      watch = require('gulp-watch'),
      plumber = require('gulp-plumber'),
      browserSync = require('browser-sync'),
      connectPhp = require('gulp-connect-php'),
      imagemin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant');

// default
gulp.task('default', ['server', 'pug', 'stylus', 'watch', 'webpack'])


// pug
gulp.task('pug', () => {
  const default_options = Object.assign({
    basedir: path.join(SRC_DIR, PUG_DIR),
    doctype: 'html',
    pretty: true,
  }, PUG_OPTION)

  // pc
  gulp
    .src(path.join(SRC_DIR, PUG_DIR, 'pc/dir', '**', '*.pug'))
    .pipe(plumber())
    .pipe(pug(Object.assign({}, default_options, {
      locals: Object.assign({}, COMMON_PARAMS, {
        INDEX_DIR: '/' + INDEX_DIR + (INDEX_DIR ? '/' : ''),
        ASSETS_DIR: '/' + ASSETS_DIR + (ASSETS_DIR ? '/' : ''),
        CSS_DIR: '/' + CSS_DIR + (CSS_DIR ? '/' : ''),
        JS_DIR: '/' + JS_DIR + (JS_DIR ? '/' : ''),
        IMAGE_DIR: '/' + IMAGE_DIR + (IMAGE_DIR ? '/' : ''),

        // for RELATIVE_PATH
        // INDEX_DIR: (RELATIVE_PATH ? '' : '/') + INDEX_DIR + (INDEX_DIR ? '/' : ''),
        // ASSETS_DIR: (RELATIVE_PATH ? '' : '/') + ASSETS_DIR + (ASSETS_DIR ? '/' : ''),
        // CSS_DIR: (RELATIVE_PATH ? '' : '/') + CSS_DIR + (CSS_DIR ? '/' : ''),
        // JS_DIR: (RELATIVE_PATH ? '' : '/') + JS_DIR + (JS_DIR ? '/' : ''),
        // IMAGE_DIR: (RELATIVE_PATH ? '' : '/') + IMAGE_DIR + (IMAGE_DIR ? '/': ''),
      }),
    })))
    .pipe(encoding({to: HTML_CHARSET}))
    .pipe(gulp.dest(path.join(PUBLIC_DIR, INDEX_DIR)))

  if(SP) {
    gulp
      .src(path.join(SRC_DIR, PUG_DIR, 'sp/dir', '**', '*.pug'))
      .pipe(plumber())
      .pipe(pug(Object.assign({}, default_options, {
        locals: Object.assign({}, COMMON_PARAMS, {
          INDEX_DIR: '/' + SP_INDEX_DIR + (SP_INDEX_DIR ? '/' : ''),
          ASSETS_DIR: '/' + SP_ASSETS_DIR + (SP_ASSETS_DIR ? '/' : ''),
          CSS_DIR: '/' + SP_CSS_DIR + (SP_CSS_DIR ? '/' : ''),
          JS_DIR: '/' + SP_JS_DIR + (SP_JS_DIR ? '/' : ''),
          IMAGE_DIR: '/' + SP_IMAGE_DIR + (SP_IMAGE_DIR ? '/' : ''),

          // for RELATIVE_PATH
          // INDEX_DIR: (RELATIVE_PATH ? '' : '/') + SP_INDEX_DIR + (SP_INDEX_DIR ? '/' : ''),
          // ASSETS_DIR: (RELATIVE_PATH ? '' : '/') + SP_ASSETS_DIR + (SP_ASSETS_DIR ? '/' : ''),
          // CSS_DIR: (RELATIVE_PATH ? '' : '/') + SP_CSS_DIR + (SP_CSS_DIR ? '/' : ''),
          // JS_DIR: (RELATIVE_PATH ? '' : '/') + SP_JS_DIR + (SP_JS_DIR ? '/' : ''),
          // IMAGE_DIR: (RELATIVE_PATH ? '' : '/') + SP_IMAGE_DIR + (SP_IMAGE_DIR ? '/' : ''),
        }),
      })))
      .pipe(encoding({to: HTML_CHARSET}))
      .pipe(gulp.dest(path.join(PUBLIC_DIR, SP_INDEX_DIR)))
  }
})


// stylus
gulp.task('stylus', () => {
  const default_options = Object.assign({
    'include css': true,
    import: ['nib'],
    use: [
      nib(),
    ],
  }, STYLUS_OPTION)

  gulp
    .src(path.join(SRC_DIR, STYLUS_DIR, 'pc/dir', '*.styl'))
    .pipe(plumber())
    .pipe(stylus(Object.assign({}, default_options, {
      rawDefine: Object.assign({}, COMMON_PARAMS, {
        INDEX_DIR: '/' + INDEX_DIR + (INDEX_DIR ? '/' : ''),
        ASSETS_DIR: '/' + ASSETS_DIR + (ASSETS_DIR ? '/' : ''),
        CSS_DIR: '/' + CSS_DIR + (CSS_DIR ? '/' : ''),
        JS_DIR: '/' + JS_DIR + (JS_DIR ? '/' : ''),
        IMAGE_DIR: '/' + IMAGE_DIR + (IMAGE_DIR ? '/' : ''),

        // for RELATIVE_PATH
        // INDEX_DIR: (RELATIVE_PATH ? path.relative(CSS_DIR, INDEX_DIR) + (path.relative(CSS_DIR, INDEX_DIR) ? '/' : '') : '/' + INDEX_DIR + (INDEX_DIR ? '/' : '')),
        // ASSETS_DIR: (RELATIVE_PATH ? path.relative(CSS_DIR, ASSETS_DIR) + (path.relative(CSS_DIR, ASSETS_DIR) ? '/' : '') : '/' + ASSETS_DIR + (ASSETS_DIR ? '/' : '')),
        // CSS_DIR: (RELATIVE_PATH ? path.relative(CSS_DIR, CSS_DIR) + (path.relative(CSS_DIR, CSS_DIR) ? '/' : '') : '/' + CSS_DIR + (CSS_DIR ? '/' : '')),
        // JS_DIR: (RELATIVE_PATH ? path.relative(CSS_DIR, JS_DIR) + (path.relative(CSS_DIR, JS_DIR) ? '/' : '') : '/' + JS_DIR + (JS_DIR ? '/' : '')),
        // IMAGE_DIR: (RELATIVE_PATH ? path.relative(CSS_DIR, IMAGE_DIR) + (path.relative(CSS_DIR, IMAGE_DIR) ? '/' : '') : '/' + IMAGE_DIR + (IMAGE_DIR ? '/' : '')),
      }),
    })))
    .pipe(gulp.dest(path.join(PUBLIC_DIR, CSS_DIR)))

  if(SP) {
    gulp
      .src(path.join(SRC_DIR, STYLUS_DIR, 'sp/dir', '*.styl'))
      .pipe(plumber())
      .pipe(stylus(Object.assign({}, default_options, {
        rawDefine: Object.assign({}, COMMON_PARAMS, {
          INDEX_DIR: '/' + SP_INDEX_DIR + (SP_INDEX_DIR ? '/' : ''),
          ASSETS_DIR: '/' + SP_ASSETS_DIR + (SP_ASSETS_DIR ? '/' : ''),
          CSS_DIR: '/' + SP_CSS_DIR + (SP_CSS_DIR ? '/' : ''),
          JS_DIR: '/' + SP_JS_DIR + (SP_JS_DIR ? '/' : ''),
          IMAGE_DIR: '/' + SP_IMAGE_DIR + (SP_IMAGE_DIR ? '/' : ''),

          // for RELATIVE_PATH
          // INDEX_DIR: (RELATIVE_PATH ? path.relative(SP_CSS_DIR, SP_INDEX_DIR) + (path.relative(SP_CSS_DIR, SP_INDEX_DIR) ? '/' : '') : '/' + SP_INDEX_DIR + (SP_INDEX_DIR ? '/' : '')),
          // ASSETS_DIR: (RELATIVE_PATH ? path.relative(SP_CSS_DIR, SP_ASSETS_DIR) + (path.relative(SP_CSS_DIR, SP_ASSETS_DIR) ? '/' : '') : '/' + SP_ASSETS_DIR + (SP_ASSETS_DIR ? '/' : '')),
          // CSS_DIR: (RELATIVE_PATH ? path.relative(SP_CSS_DIR, SP_CSS_DIR) + (path.relative(SP_CSS_DIR, SP_CSS_DIR) ? '/' : '') : '/' + SP_CSS_DIR + (SP_CSS_DIR ? '/' : '')),
          // JS_DIR: (RELATIVE_PATH ? path.relative(SP_CSS_DIR, SP_JS_DIR) + (path.relative(SP_CSS_DIR, SP_JS_DIR) ? '/' : '') : '/' + SP_JS_DIR + (SP_JS_DIR ? '/' : '')),
          // IMAGE_DIR: (RELATIVE_PATH ? path.relative(SP_CSS_DIR, SP_IMAGE_DIR) + (path.relative(SP_CSS_DIR, SP_IMAGE_DIR) ? '/' : '') : '/' + SP_IMAGE_DIR + (SP_IMAGE_DIR ? '/' : '')),
        }),
      })))
      .pipe(gulp.dest(path.join(PUBLIC_DIR, SP_CSS_DIR)))
  }
})


// webpack
gulp.task('webpack', () => {
  const options = {
    watch: true,
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.json']
    },
    plugins: [
      new webpack.webpack.optimize.UglifyJsPlugin()
    ],
  };

  gulp
    .src(path.join(SRC_DIR, BABEL_DIR, 'pc/dir', '*.js'))
    .pipe(plumber())
    .pipe(named())
    .pipe(webpack(options))
    .pipe(gulp.dest(path.join(PUBLIC_DIR, JS_DIR)))

  if(SP) {
    gulp
      .src(path.join(SRC_DIR, BABEL_DIR, 'sp/dir', '*.js'))
      .pipe(plumber())
      .pipe(named())
      .pipe(webpack(options))
      .pipe(gulp.dest(path.join(PUBLIC_DIR, SP_JS_DIR)))
  }
});


// imagemin
gulp.task('imagemin', () => {
  gulp
    .src([
      path.join(SRC_DIR, IMAGE_DIR, '**', '*'),
      path.join(SRC_DIR, SP_IMAGE_DIR, '**', '*'),
    ])
    .pipe(imagemin({
      progressive: true,
      use: [
        pngquant({
          quality: '80-90',
          speed: 1
        })
      ]
    }))
})


// watch
gulp.task('watch', () => {
  // pug
  watch(path.join(SRC_DIR, PUG_DIR, '**', '*'), () => {
    gulp.start(['pug'])
  })

  // stylus
  watch(path.join(SRC_DIR, STYLUS_DIR, '**', '*'), () => {
    gulp.start(['stylus'])
  })

  // imagemin
  watch(path.join(SRC_DIR, IMAGE_DIR, '**', '*'), () => {
    gulp.start(['imagemin']);
  })
})


// server
gulp.task('server', () => {
  connectPhp.server({
    base: PUBLIC_DIR,
    port: PORT,
  }, () => {
    browserSync({
      files: path.join(PUBLIC_DIR, '**', '*'),
      proxy: 'localhost:' + PORT,
      port: PORT,
      logLevel: 'silent',
      notify: false,
      startPath: (INDEX_DIR ? '/' + INDEX_DIR + '/' : ''),
    })
  })
})
