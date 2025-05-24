<?php
$currentPage = $_SERVER['REQUEST_URI'];
$isHomePage = ($currentPage === '/' || $currentPage === '/home');
$onClickFunction = $isHomePage ? 'scrollToContact()' : 'showContactModal()';
?>

<button class="contact-button btn btn-primary" onclick="<?php echo $onClickFunction; ?>">
    <img src="/assets/images/mail.png" alt="">
    <span>
        <?= t('home.home-contact-form-button', $translations) ?>
    </span>
</button>

<?php if (!$isHomePage): ?>
    <?php include __DIR__ . '/contact-modal.php'; ?>
<?php endif; ?>

<script src="/assets/js/contact-modal.js"></script>
<?php if (!$isHomePage): ?>
    <script src="/assets/js/contact-form.js"></script>
<?php endif; ?>