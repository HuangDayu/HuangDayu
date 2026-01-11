document.addEventListener("DOMContentLoaded", function () {
    if (isValid('password', 1)) {
        if (showDecryptContentForSession('password')) {
            document.querySelector("main").style.display = "block";
            return;
        }
    }
    validatePassword();
});