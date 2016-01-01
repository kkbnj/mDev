// gulpコマンド
/*
gulp server
ローカルサーバー構築
gulp reload
ブラウザリロード
gulp watch
変更監視（各種コンパイル）
gulp build
各種コンパイル
gulp
サーバーの起動、変更監視開始
gulp php2html
phpをhtmlに変換
gulp compass
compassのコンパイル
gulp babel
babelのコンパイル
*/
// 環境変数の設定
var opt = {
  pub_dir: 'publish',
  pc_style_dir: 'resource/style',
  pc_script_dir: 'resource/script',
  pc_image_dir: 'resource/image',

  port: 3031,

  src_dir: 'dev',
  php_dir: 'php',
  scss_dir: 'scss',
  babel_dir: 'babel',
  php_files: '**/*.php',
  scss_files: '**/*.scss',
  babel_files: '**/*.js'
};

// モジュール読み込み
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    watch = require('gulp-watch'),
    // php2html = require('gulp-php2html'),
    yuicompressor = require('gulp-yuicompressor'),
    babel = require("gulp-babel"),
    $ = require('gulp-load-plugins')();

// ローカルサーバー構築
gulp.task('server', function() {
  $.connectPhp.server({
    base: opt.pub_dir,
    port: opt.port
  }, function() {
    browserSync({
      index: 'index.php',
      proxy: 'localhost:' + opt.port,
      port: opt.port
    });
  });
});

// ブラウザのリロード
gulp.task('reload', function() {
  browserSync.reload();
});

// 変更の監視
gulp.task('watch', function() {
  watch(opt.src_dir + '/' + opt.php_dir + '/' + opt.php_files, function() {
    gulp.start(['php2html']);
  });

  watch(opt.src_dir + '/' + opt.scss_dir + '/' + opt.scss_files, function() {
    gulp.start(['compass']);
  });

  watch(opt.src_dir + '/' + opt.babel_dir + '/' + opt.babel_files, function() {
    gulp.start(['babel']);
  });
});

// ビルドコンパイル
gulp.task('build', ['php2html', 'compass', 'babel']);

// gulpコマンド
gulp.task('default', ['build', 'server', 'watch']);

// phpコンパイル（現時点では純粋な移動）
gulp.task('php2html', ['reload'], function() {
  gulp
    .src(opt.src_dir + '/' + opt.php_dir + '/' + opt.php_files)
    .pipe(gulp.dest(opt.pub_dir));
});

// compassコンパイル
gulp.task('compass', ['reload'], function() {
  gulp
    .src(opt.src_dir + '/' + opt.scss_dir + '/' + opt.scss_files)
    .pipe($.plumber())
    .pipe($.compass({
      comments: false,
      css: opt.pub_dir + '/' + opt.pc_style_dir,
      sass: opt.src_dir + '/' + opt.scss_dir,
      image: opt.pub_dir + '/' + opt.pc_image_dir
    }))
    .pipe(yuicompressor({
      type: 'css'
    }))
    .pipe(gulp.dest(opt.pub_dir + '/' + opt.pc_style_dir));
});

// Babelコンパイル
gulp.task('babel', ['reload'], function() {
  gulp
    .src(opt.src_dir + '/' + opt.babel_dir + '/' + opt.babel_files)
    .pipe($.plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(opt.pub_dir + '/' + opt.pc_script_dir));
});
