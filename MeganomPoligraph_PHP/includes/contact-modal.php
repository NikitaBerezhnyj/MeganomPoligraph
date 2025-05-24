<div id="contact-modal" class="contact-modal-container">
    <div class="contact-modal">
        <span class="contact-modal-close" onclick="closeContactModal()">&times;</span>
        <div class="contact-modal-content">
            <h2 class="text-center mb-4"><?= t('home.home-contact-form-header', $translations) ?></h2>

            <form id="contactForm" class="needs-validation" novalidate>
                <div class="form-group">
                    <label for="contact-modal-name"><?= t('home.home-contact-form-name-label', $translations) ?></label>
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
                    <label for="contact-modal-phone"><?= t('home.home-contact-form-phone-label', $translations) ?></label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        class="form-control"
                        placeholder="<?= t('home.home-contact-form-phone-placeholder', $translations) ?>"
                        pattern="^\+?[0-9]{10,15}$"
                        required>
                    <div class="invalid-feedback"><?= t('home.home-contact-form-phone-error', $translations) ?></div>
                </div>

                <div class="form-group">
                    <label for="contact-modal-mail"><?= t('home.home-contact-form-mail-label', $translations) ?></label>
                    <input
                        type="email"
                        name="mail"
                        id="mail"
                        class="form-control"
                        placeholder="<?= t('home.home-contact-form-mail-placeholder', $translations) ?>"
                        required>
                    <div class="invalid-feedback"><?= t('home.home-contact-form-mail-error', $translations) ?></div>
                </div>

                <div class="form-group">
                    <label for="contact-modal-message"><?= t('home.home-contact-form-message-label', $translations) ?></label>
                    <textarea
                        name="message"
                        id="message"
                        rows="5"
                        class="form-control"
                        placeholder="<?= t('home.home-contact-form-message-placeholder', $translations) ?>"
                        required></textarea>
                    <div class="invalid-feedback"><?= t('home.home-contact-form-message-error', $translations) ?></div>
                </div>

                <p class="submit-result"></p>

                <button type="submit" class="btn btn-primary btn-block" id="submit-button">
                    <?= t('home.home-contact-form-button', $translations) ?>
                </button>
            </form>
        </div>
    </div>
</div>

<script>
    const translations = {
        contactSuccess: "<?= t('home.home-contact-form-success', $translations) ?>",
        contactError: "<?= t('home.home-contact-form-error', $translations) ?>",
        sendingError: "<?= t('home.home-contact-form-sending-error', $translations) ?>"
    };
</script>