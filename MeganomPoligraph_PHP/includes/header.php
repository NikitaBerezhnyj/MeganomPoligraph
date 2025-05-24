<nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">
        <img src="/assets/images/logo.png" alt="">
        <?= t('header.brand', $translations) ?>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
            <?php
            $menuItems = ['home', 'about', 'example', 'contacts', 'delivery'];
            $allowedCategories = [
                'paper-bags-laminated',
                'logo-bags',
                'cardboard-bags',
                'kraft-bags',
                'gift-bags',
                'branded-folders',
                'designer-paper-bags',
                'uv-lacquer-bags',
                'embossed-bags'
            ];

            $currentPath = trim($_SERVER['REQUEST_URI'], '/');
            $currentPage = basename($currentPath, ".php");

            if ($currentPage == '' || $currentPage == 'index') {
                $currentPage = 'home';
            }

            $isExampleActive = false;
            if (strpos($currentPath, 'example/') === 0) {
                $category = str_replace('example/', '', $currentPath);
                if (in_array($category, $allowedCategories)) {
                    $isExampleActive = true;
                }
            }

            foreach ($menuItems as $item) {
                $url = ($item === 'home') ? '/' : "/$item";
                $activeClass = ($item === $currentPage || ($item === 'example' && $isExampleActive)) ? 'active' : '';
                echo "<li class='nav-item $activeClass'><a class='nav-link' href='$url'>" . t("header.$item", $translations) . "</a></li>";
            }
            ?>
            <li class="nav-item">
                <form action="" method="post">
                    <select class="custom-select" name="lang" onchange="this.form.submit()">
                        <option value="uk" <?= $lang === 'ua' ? 'selected' : '' ?>>Українська</option>
                        <option value="ru" <?= $lang === 'ru' ? 'selected' : '' ?>>Русский</option>
                        <option value="en" <?= $lang === 'en' ? 'selected' : '' ?>>English</option>
                    </select>
                </form>
            </li>
        </ul>
    </div>
</nav>