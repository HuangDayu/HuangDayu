// 等待DOM加载完成后执行代码
document.addEventListener('DOMContentLoaded', function () {
    if (isValid('text', 12)) {
        if (showDecryptContentForSession('text')) {
            document.querySelector("main").style.display = "block";
            return;
        }
    }
    validateCode();
});
