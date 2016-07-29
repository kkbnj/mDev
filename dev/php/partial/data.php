<?php
$http_host = 'http://localhost:3087';

$canonical_path = '';

$index_path = '';
$data_path = 'resource/data';
$image_path = 'resource/image';
$css_path = 'resource/style';
$javascript_path = 'resource/script';

if($device == 'sp') {
  $index_path = 'sp';
  $data_path = 'sp/resource/data';
  $image_path = 'sp/resource/image';
  $css_path = 'sp/resource/style';
  $javascript_path = 'sp/resource/script';
}

$meta = array(
    'site_name' => '',
    'pages' => array(
        'index' => array(
            'title' => '',
            'description' => '',
            'keywords' => '',
            'image' => $http_host . '/' . $image_path . '/og.png',
            'url' => ($canonical_path ? $http_host . '/' . $canonical_path . '/' : $http_host),
            'type' => 'article',
        ),
    ),
);

$common = array(
    'sns' => array(
        'fb' => 'href="http://www.facebook.com/share.php?u=' . rawurlencode($meta['pages'][$page]['url']) . '" onclick="window.open(this.href, \'fbwindow\', \'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1\'); return false;"',
        'tw' => 'href="http://twitter.com/share?count=horizontal&amp;original_referer=' . rawurlencode($meta['pages'][$page]['url']) . '&amp;text=' . rawurlencode($meta['pages'][$page]['title']) . '&amp;url=' . rawurlencode($meta['pages'][$page]['url']) . '" onclick="window.open(this.href, \'twwindow\', \'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1\'); return false;"',
        'line' => 'href="line://msg/text/' . rawurlencode($meta['pages'][$page]['title']) . '%0d%0a' . rawurlencode($meta['pages'][$page]['url']) . '"',
    ),
);
