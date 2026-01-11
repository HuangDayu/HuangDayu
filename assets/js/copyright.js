// 等待DOM加载完成后执行代码
document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').innerHTML = currentYear;
});