<div class="home-hero-container mar-48">
    <div id="hero" class="container home-hero">
        <div class="home-hero-text">
            <h1><?= t('home.home-hero-header', $translations) ?></h1>
            <h5><?= t('home.home-hero-services', $translations) ?></h5>
            <p>
                <a href="tel:+380992340083">+380 (99) 234 0083</a>
                ⋅
                <a href="tel:+380992340083">+380 (67) 930 8951</a>
            </p>
        </div>
    </div>
</div>
<div class="container mt-5 mb-5">
    <div class="home-services-container">
        <h2 class="mb-4"><?= t('home.home-services-header', $translations) ?></h2>
        <div class="container">
            <div class="row">
                <?php
                $services = [
                    ['service-link' => 'paper-bags-laminated', 'image' => '/assets/images/services/lamination.png', 'header' => 'home.home-services-paper-bags-laminated-header', 'description' => 'home.home-services-paper-bags-laminated-description'],
                    ['service-link' => 'logo-bags', 'image' => '/assets/images/services/logo.png', 'header' => 'home.home-services-logo-bags-header', 'description' => 'home.home-services-logo-bags-description'],
                    ['service-link' => 'cardboard-bags', 'image' => '/assets/images/services/cardboard.png', 'header' => 'home.home-services-cardboard-bags-header', 'description' => 'home.home-services-cardboard-bags-description'],
                    ['service-link' => 'kraft-bags', 'image' => '/assets/images/services/craft.png', 'header' => 'home.home-services-kraft-bags-header', 'description' => 'home.home-services-kraft-bags-description'],
                    ['service-link' => 'gift-bags', 'image' => '/assets/images/services/present.png', 'header' => 'home.home-services-gift-bags-header', 'description' => 'home.home-services-gift-bags-description'],
                    ['service-link' => 'branded-folders', 'image' => '/assets/images/services/folder.png', 'header' => 'home.home-services-branded-folders-header', 'description' => 'home.home-services-branded-folders-description'],
                    ['service-link' => 'designer-paper-bags', 'image' => '/assets/images/services/design.png', 'header' => 'home.home-services-designer-paper-bags-header', 'description' => 'home.home-services-designer-paper-bags-description'],
                    ['service-link' => 'uv-lacquer-bags', 'image' => '/assets/images/services/ultraviolet_varnish.png', 'header' => 'home.home-services-uv-lacquer-bags-header', 'description' => 'home.home-services-uv-lacquer-bags-description'],
                    ['service-link' => 'embossed-bags', 'image' => '/assets/images/services/embossing.png', 'header' => 'home.home-services-embossed-bags-header', 'description' => 'home.home-services-embossed-bags-description'],
                ];

                foreach ($services as $service) : ?>
                    <div class="col-12 col-sm-12 col-lg-6 col-xl-4 mb-4">
                        <a href="/example/<?= $service['service-link'] ?>" class="home-services-link">
                            <div class="home-services-item">
                                <img src="<?= $service['image'] ?>" class="card-img-top" alt="">
                                <div class="card-body">
                                    <h5 class="card-title"><?= t($service['header'], $translations) ?></h5>
                                    <p class="card-text"><?= t($service['description'], $translations) ?></p>
                                </div>
                            </div>
                        </a>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
    <div class="home-contact-container" id="contact-form">
        <h2 class="text-center mb-4"><?= t('home.home-contact-form-header', $translations) ?></h2>

        <form id="contactForm" class="needs-validation" novalidate>
            <div class="form-group">
                <label for="name"><?= t('home.home-contact-form-name-label', $translations) ?></label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    class="form-control"
                    placeholder="<?= t('home.home-contact-form-name-placeholder', $translations) ?>"
                    required>
                <div class="invalid-feedback"><?= t('home.home-contact-form-name-error', $translations) ?></div>
            </div>

            <div class="form-group">
                <label for="phone"><?= t('home.home-contact-form-phone-label', $translations) ?></label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    class="form-control"
                    placeholder="<?= t('home.home-contact-form-phone-placeholder', $translations) ?>"
                    pattern="^\+?[0-9]{10,15}$">
                <div class="invalid-feedback"><?= t('home.home-contact-form-phone-error', $translations) ?></div>
            </div>

            <div class="form-group">
                <label for="mail"><?= t('home.home-contact-form-mail-label', $translations) ?></label>
                <input
                    type="email"
                    name="mail"
                    id="mail"
                    class="form-control"
                    placeholder="<?= t('home.home-contact-form-mail-placeholder', $translations) ?>">
                <div class="invalid-feedback"><?= t('home.home-contact-form-mail-error', $translations) ?></div>
            </div>

            <div class="form-group">
                <label for="message"><?= t('home.home-contact-form-message-label', $translations) ?></label>
                <textarea
                    name="message"
                    id="message"
                    rows="7"
                    class="form-control"
                    placeholder="<?= t('home.home-contact-form-message-placeholder', $translations) ?>"
                    required></textarea>
                <div class="invalid-feedback"><?= t('home.home-contact-form-message-error', $translations) ?></div>
            </div>

            <p class="submit-result"></p>

            <button type="submit" class="btn btn-primary btn-block" id="submit-button"><?= t('home.home-contact-form-button', $translations) ?></button>
        </form>
    </div>
</div>
<div id="scroll-button">
    <button class="scroll-btn" onclick="scrollToNextSection()">
        <span class="arrow"></span>
    </button>
</div>

<script>
    const translations = {
        contactSuccess: "<?= t('home.home-contact-form-success', $translations) ?>",
        contactError: "<?= t('home.home-contact-form-error', $translations) ?>",
        sendingError: "<?= t('home.home-contact-form-sending-error', $translations) ?>"
    };
</script>
<script src="/assets/js/contact-form.js"></script>
<script src="/assets/js/scroll-bottom-arrow.js"></script>