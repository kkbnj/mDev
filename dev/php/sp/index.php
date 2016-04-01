<?php
define('PARTIAL_DIR', './../partial');
$page = 'index';
header('Content-Type: text/html; charset=UTF-8');
require_once PARTIAL_DIR . '/data.php';
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<?php require_once PARTIAL_DIR . '/head_sp.php'; ?>
  <link href="/<?php echo $sp_css_path; ?>/index.css" rel="stylesheet" type="text/css" />
</head>
<body id="<?php echo $page; ?>">
  <p>This is template.</p>

<?php require_once PARTIAL_DIR . '/foot_sp.php'; ?>
  <script src="/<?php echo $sp_javascript_path; ?>/index.js" type="text/javascript" charset="UTF-8"></script>
</body>
</html>
