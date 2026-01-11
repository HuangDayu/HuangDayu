// // 硬编码的密码
// var hardcodedPassword = "huangdayu.cn";
//
// // 验证密码函数
// function verifyPassword() {
//     document.querySelector("main").style.display = "none";
//     var password = prompt("Enter Password:");
//     if (password === hardcodedPassword) {
//         // 如果密码匹配，则显示内容
//         alert("Correct password! Access granted.");
//         // 这里可以放置显示受保护内容的代码
//         document.querySelector("main").style.display = "block";
//     } else {
//         // 如果密码不匹配，则提示错误信息
//         alert("Incorrect password! Access denied.");
//     }
// }
// // 在页面加载之前调用验证密码函数
// window.addEventListener("load", verifyPassword);


function isValid(type, time) {
    // 检查是否有缓存的验证结果存储在 sessionStorage 中
    var cachedResult = sessionStorage.getItem('valid-' + type);
    if (cachedResult !== null) {
        // 检查缓存的时间戳，如果超过一个小时则过期
        var timestamp = parseInt(sessionStorage.getItem('timestamp-' + type));
        var currentTime = new Date().getTime();
        if (currentTime - timestamp > 3600000 * time) {
            // 缓存过期，清除缓存
            sessionStorage.removeItem('valid-' + type);
            sessionStorage.removeItem('timestamp-' + type);
            return false;
        }
        return cachedResult === 'true';
    }
    return false;
}


// 显示弹窗
function showAlert(message) {
    // 创建弹窗元素
    var alertBox = document.createElement('div');
    alertBox.style.position = 'fixed';
    alertBox.style.top = '50%';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translate(-50%, -50%)';
    alertBox.style.background = '#fff';
    alertBox.style.padding = '20px';
    alertBox.style.border = '1px solid #000';
    alertBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    alertBox.style.zIndex = '9999';
    alertBox.innerText = message;

    // 添加到body中
    document.body.appendChild(alertBox);

    // 一秒后自动关闭
    setTimeout(function () {
        document.body.removeChild(alertBox);
    }, 2000);
}

// 显示自定义的密码输入框
function showPrompt(type, placeholder) {
    return new Promise(function (resolve, reject) {
        // 创建输入框元素
        var promptBox = document.createElement('div');
        promptBox.style.position = 'fixed';
        promptBox.style.top = '50%';
        promptBox.style.left = '50%';
        promptBox.style.transform = 'translate(-50%, -50%)';
        promptBox.style.background = '#fff';
        promptBox.style.padding = '20px';
        promptBox.style.border = '1px solid #000';
        promptBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
        promptBox.style.zIndex = '9999';

        var input = document.createElement('input');
        input.type = type;
        input.style.width = 'calc(100% - 24px)';
        input.style.padding = '10px';
        input.style.marginBottom = '10px';
        input.placeholder = placeholder;

        var confirmButton = document.createElement('button');
        confirmButton.innerText = '确认';
        confirmButton.style.width = '48%';
        confirmButton.style.padding = '10px';
        confirmButton.style.background = '#007bff';
        confirmButton.style.color = '#fff';
        confirmButton.style.border = 'none';
        confirmButton.style.cursor = 'pointer';
        confirmButton.style.float = 'left';

        var cancelButton = document.createElement('button');
        cancelButton.innerText = '取消';
        cancelButton.style.width = '48%';
        cancelButton.style.padding = '10px';
        cancelButton.style.background = '#dc3545';
        cancelButton.style.color = '#fff';
        cancelButton.style.border = 'none';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.float = 'right';

        // 点击确认按钮时关闭密码输入框并resolve
        confirmButton.onclick = function () {
            document.body.removeChild(promptBox);
            resolve(input.value);
        };

        // 点击取消按钮时关闭密码输入框并reject
        cancelButton.onclick = function () {
            document.body.removeChild(promptBox);
            reject(new Error('用户取消输入密码'));
        };

        // 添加到body中
        promptBox.appendChild(input);
        promptBox.appendChild(confirmButton);
        promptBox.appendChild(cancelButton);
        document.body.appendChild(promptBox);
    });
}

function validatePass(type, password) {
    // 密码正确，显示main标签的内容
    document.querySelector("main").style.display = "block";
    // 密码验证成功，将结果存储到 sessionStorage 中
    sessionStorage.setItem('valid-' + type, 'true');
    // 存储当前时间戳，用于检查过期时间
    sessionStorage.setItem('timestamp-' + type, new Date().getTime());
    // 将密码临时存储
    sessionStorage.setItem('password-' + type, password);
}

function validateFailed() {
    // 密码错误，隐藏main标签的内容（虽然默认就是隐藏的，但可以在这里处理错误情况，如重新询问密码或显示错误信息）
    // 在跳转后立即调用 alert 函数
    showAlert("抱歉，您无权限阅读该文章。");
    // 跳转到网站首页
    // 延迟一段时间后跳转到首页
    setTimeout(function () {
        window.location.href = "/";
    }, 2000); // 设置延迟时间为1秒钟（1000毫秒）
}

function validatePassword() {
    document.querySelector("main").style.display = "none";
    // 调用函数显示自定义密码输入框并直接获取用户输入的密码
    showPrompt('password', '请输入阅读密码:')
        .then(function (password) {
            // 使用MD5算法对用户输入的密码进行哈希
            var userPasswordHash = CryptoJS.MD5(password).toString().toUpperCase();
            if (showDecryptContent(userPasswordHash)) {
                validatePass('password', userPasswordHash);
            } else {
                validateFailed();
            }
        })
        .catch(function (error) {
            // 用户点击取消后会执行这里
            validateFailed();
        });
}

function validateCode() {
    document.querySelector("main").style.display = "none";
    var code = generateRandomCode();
    // 调用函数显示自定义密码输入框并直接获取用户输入的密码
    showPrompt('text', '请输入验证码:' + code)
        .then(function (password) {
            if (password === code) {
                var key = "F4CE5D334270696CF7C4DB30A2D14522"
                showDecryptContent(key);
                validatePass('text', key);
            } else {
                validateFailed();
            }
        })
        .catch(function (error) {
            // 用户点击取消后会执行这里
            validateFailed();
        });
}

function generateRandomCode() {
    // 生成一个0到9999之间的随机整数
    let randomNumber = Math.floor(Math.random() * 10000);

    // 将随机数转换为4位数字符串，并在前面补零
    let code = randomNumber.toString().padStart(4, '0');

    return code;
}

// 动态加载外部 JavaScript
function loadExternalScript(url) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true; // 异步加载
    document.head.appendChild(script); // 将脚本添加到文档头部
}

function loadExternalScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    // 脚本加载完成后调用回调函数
    script.onload = callback;

    document.head.appendChild(script);
}