<?php
define('PARTIAL_DIR', './../partial');
$page = 'index';
$device = 'pc';
header('Content-Type: text/html; charset=UTF-8');
require_once PARTIAL_DIR . '/data.php';
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<?php require_once PARTIAL_DIR . '/head.php'; ?>
</head>
<body>
  <p>This is template.</p>

<?php require_once PARTIAL_DIR . '/foot.php'; ?>
</body>
</html>
