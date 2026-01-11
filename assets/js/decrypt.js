// 解密函数
// 用于解密 Base64 编码的 AES 加密文本
function decryptContent(base64Encrypted, key) {
    // 首先，解析 Base64 编码的文本
    const decoded = CryptoJS.enc.Base64.parse(base64Encrypted);

    // 初始化向量为前 16 字节
    const iv = CryptoJS.lib.WordArray.create(decoded.words.slice(0, 4));

    // 密文为剩余的部分
    const ciphertext = CryptoJS.lib.WordArray.create(decoded.words.slice(4));

    // 使用 AES 解密
    const decrypted = CryptoJS.AES.decrypt(
        {ciphertext: ciphertext},
        CryptoJS.enc.Utf8.parse(key),
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    // 将解密后的字节数组转换为 UTF-8 字符串
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedText;
}

function showDecryptContentForSession(type) {
    return showDecryptContent(sessionStorage.getItem('password-' + type));
}

function showDecryptContent(key) {
    // 获取加密后的内容
    const contentDiv = document.getElementById('content');
    if (contentDiv != null) {
        const encryptedText = contentDiv.textContent.trim();
        if (isBase64(encryptedText)) {
            // 解密并替换显示内容
            try {
                contentDiv.innerHTML = decryptContent(encryptedText, key);
                return true;
            } catch (e) {
                return false;
            }
        }
        return false;
    }
    return true;
}

function isBase64(str) {
    // Base64 编码的正则表达式
    const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

    return base64Regex.test(str);
}