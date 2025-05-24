<?php
$requestUri = trim($_SERVER['REQUEST_URI'], '/');

if ($requestUri === 'example' || strpos($requestUri, 'example/') === 0) {
  $category = str_replace('example', '', $requestUri);

  if ($category[0] === '/') {
    $category = substr($category, 1);
  }

  if ($category !== '') {
    $currentHeader = t("example.example-{$category}-header", $translations);
    $currentDescription = t("example.example-{$category}-description", $translations);
  } else {
    $currentHeader = t('example.example-header', $translations);
    $currentDescription = t('example.example-description', $translations);
  }
} else {
  $pageName = basename($requestUri);
  $currentHeader = t("example.example-{$pageName}-header", $translations);
  $currentDescription = t("example.example-{$pageName}-description", $translations);
}

$jsonFile = file_get_contents('assets/json/products/bags.json');
$data = json_decode($jsonFile, true);
$filteredItems = [];

if (!empty($data)) {
  foreach ($data as $item) {
    if ($category === 'logo-bags') {
      if (!in_array('branded-folders', $item['category']) && !in_array('gift-bags', $item['category'])) {
        $filteredItems[] = $item;
      }
    } elseif (empty($category) || in_array($category, $item['category'])) {
      $filteredItems[] = $item;
    }
  }
}
?>

<div class="container mt-5 mb-3 full-height example-container">
  <h1><?php echo htmlspecialchars($currentHeader); ?></h1>
  <p class="mb-5"><?php echo htmlspecialchars_decode($currentDescription); ?></p>
  <div class="row">
    <?php if (!empty($filteredItems)) : ?>
      <?php foreach ($filteredItems as $item) : ?>
        <div class="col-md-6 col-lg-4 mb-3">
          <div class="card">
            <img src="<?= htmlspecialchars($item['src']) ?>" class="card-img-top img-preview" alt="Image">
            <div class="card-body">
              <pre class="card-text"><?= t($item['description'], $translations); ?></pre>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    <?php else : ?>
      <p>Немає доступних робіт.</p>
    <?php endif; ?>
    <?php if ($category !== '') : ?>
      <div class="col-md-6 col-lg-4 mb-3">
        <a href="/example">
          <div class="card card-view-all">
            <h4>Переглянути усі приклади робіт</h4>
          </div>
        </a>
      </div>
    <?php endif; ?>
  </div>
</div>

<?php include __DIR__ . "/../includes/image-modal.php"; ?>

<script src="/assets/js/image-modal.js"></script>