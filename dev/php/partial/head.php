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

  <link href="/<?php echo $css_path; ?>/index.css" rel="stylesheet" type="text/css" />

  <?php if($device == 'pc') : ?>
  <?php endif; ?>

  <?php if($device == 'sp') : ?>
  <?php endif; ?>
