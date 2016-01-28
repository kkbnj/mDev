  <meta http-equiv="content-language" content="ja" />
  <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  <meta http-equiv="content-style-type" content="text/css; charset=UTF-8" />
  <meta http-equiv="content-script-type" content="text/javascript; charset=UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="robots" content="index,follow,noodp" />
  <meta name="viewport" content="width=device-width" />
  <link rel="canonical" href="<?php echo $meta['pages'][$page]['url']; ?>" />
  <meta property="og:type" content="<?php echo $meta['pages'][$page]['type']; ?>" />
  <meta property="og:image" content="<?php echo $meta['pages'][$page]['image']; ?>" />
  <meta property="og:description" content="<?php echo $meta['pages'][$page]['description']; ?>" />
  <meta property="og:url" content="<?php echo $meta['pages'][$page]['url']; ?>" />
  <meta property="og:title" content="<?php echo $meta['pages'][$page]['title']; ?>" />
  <meta property="og:site_name" content="<?php echo $meta['site_name']; ?>" />
  <title><?php echo $meta['pages'][$page]['title']; ?></title>
  <meta name="keywords" content="<?php echo $meta['pages'][$page]['keywords']; ?>" />
  <meta name="description" content="<?php echo $meta['pages'][$page]['description']; ?>" />

  <!-- Tile icon for Win8 (144x144 + tile color) -->
  <meta name="msapplication-TileImage" content="/<?php echo $sp_image_path; ?>/common/ms-touch-icon-144x144-precomposed.png" />
  <meta name="msapplication-TileColor" content="#CCCCCC" />

  <!-- Add to homescreen for Chrome on Android -->
  <meta name="mobile-web-app-capable" content="yes" />
  <link rel="icon" sizes="192x192" href="/<?php echo $sp_image_path; ?>/common/chrome-touch-icon-192x192.png" />

  <!-- Add to homescreen for Safari on iOS 152x152 -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <meta name="apple-mobile-web-app-title" content="<?php echo $meta['site_name']; ?>" />
  <link rel="apple-touch-icon" href="/<?php echo $sp_image_path; ?>/common/apple-touch-icon.png" />

  <link href="//yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css" rel="stylesheet" type="text/css" />
  <link href="/<?php echo $sp_css_path; ?>/common.css" rel="stylesheet" type="text/css" />
