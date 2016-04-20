// 未実装（実装予定）の機能
// 差分releaseファイル生成
// バージョン違いの管理
// アナリティクス設定
// dataのjson化
// 処理の同期化

// 環境変数の設定
var opt = {
  port: 3087,
  publish_mode: 'html',
  // charset: 'Shift_JIS',
  charset: 'UTF-8',

  php_files: [
    // ['sp/index.php', 'sp/index.html'],
    ['pc/index.php', 'index.html'],
  ],

  image_files: [
    // ['sp/*', 'sp/resource/image'],
    // ['sp/sprites/*', 'sp/resource/image/sprites'],
    ['pc/*', 'resource/image'],
    ['pc/sprites/*', 'resource/image/sprites'],
  ],

  scss_files: [
    // ['sp/*.scss', 'sp/resource/style', 'sp/resource/image'],
    // ['sp/base.scss', 'sp/resource/style/base.css', 'sp/resource/image'],
    // ['pc/*.scss', 'resource/style', 'resource/image'],
    ['pc/base.scss', 'resource/style/base.css', 'resource/image'],
  ],

  babel_files: [
    // ['sp/*.js', 'sp/resource/script'],
    // ['sp/base.js', 'sp/resource/script/base.js'],
    // ['pc/*.js', 'resource/script'],
    ['pc/base.js', 'resource/script/base.js'],
  ],

  vender_files: [
    // ['sp/vender.js', 'sp/resource/script/vender.js'],
    ['pc/vender.js', 'resource/script/vender.js'],
  ],
};



// 以下、内部処理
// モジュール読み込み
var path = require('path'),
    browserSync = require('browser-sync'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect-php'),
    encoding = require('gulp-convert-encoding'),
    gulpif = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css'),
    php2html = require('gulp-php2html'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    pngquant = require('imagemin-pngquant'),
    through2 = require('through2');

// ローカルサーバー構築
gulp.task('server', function() {
  connect.server({
    base: 'publish',
    port: opt.port
  }, function() {
    browserSync({
      proxy: 'localhost:' + opt.port,
      port: opt.port + 1
    });
  });
});

// 変更の監視
gulp.task('watch', function() {
  watch('dev/php/**/*.php', function() {
    gulp.start(['php2html']);
  });

  watch('dev/image/**/*', function() {
    gulp.start(['imageOpt']);
  });

  watch('dev/scss/**/*.scss', function() {
    gulp.start(['compass']);
  });

  watch('dev/babel/**/*.js', function() {
    gulp.start(['babel']);
  });

  watch('dev/vender/**/*', function() {
    gulp.start(['vender']);
  });
});

// ビルドコンパイル
gulp.task('build', ['php2html', 'imageOpt', 'compass', 'babel', 'vender']);

// gulpコマンド
gulp.task('default', ['build', 'server', 'watch', 'replace']);

// 設定書き換え
gulp.task('replace', function() {
  return gulp.src('dev/php/partial/head.php')
    .pipe(replace(
      /\"text\/html; charset=([-_a-z0-9]*)\"/i,
      '"text/html; charset=' + opt.charset + '"'
    ))
    .pipe(gulp.dest('dev/php/partial'));
});

// 共通処理関数
function compile(type, files, process1, process2) {
  var i,
      len = files.length,
      finished = 0;

  for(i = 0; i < len; i++) {
    gulp
      .src(path.join('dev', type, files[i][0]))
      .pipe(plumber())
      .pipe(process1(files[i]))
      .pipe(process2(files[i]))
      .pipe(
        gulpif(
          (files[i][1].indexOf('.') >= 0),
          rename(files[i][1]),
          rename({
            dirname: files[i][1]
          })
        )
      )
      .pipe(gulp.dest('publish'))
      .on('end', function() {
        finished++;

        if(finished >= len) {
          browserSync.reload();
        }
      });
  }
}

// phpコンパイル
gulp.task('php2html', function() {
  compile('php', opt.php_files, php2html, function() {
    return encoding({to: opt.charset});
  });
});

// 画像圧縮
gulp.task('imageOpt', function() {
  compile('image', opt.image_files, function() {
    return imagemin({
      progressive: true,
      use: [
        pngquant({
          quality: '80-90',
          speed: 1
        })
      ]
    })
  }, through2.obj);
});

// compassコンパイル
gulp.task('compass', function() {
  compile('scss', opt.scss_files, function(file_info) {
    var css_dir = file_info[1];

    if(file_info[1].indexOf('.') >= 0) {
      css_dir = file_info[1].substring(0, file_info[1].lastIndexOf('/'));
    }

    return compass({
      comments: false,
      sass: path.join('dev/scss', file_info[0].substring(0, file_info[0].lastIndexOf('/'))),
      css: path.join('publish', css_dir),
      image: path.join('publish', file_info[2])
    });
  }, minifyCSS);
});

// babelコンパイル
gulp.task('babel', function() {
  compile('babel', opt.babel_files, function() {
    return babel({
      presets: ['es2015']
    });
  }, uglify);
});

// venderファイル移動
gulp.task('vender', function() {
  compile('vender', opt.vender_files, through2.obj, through2.obj);
});
