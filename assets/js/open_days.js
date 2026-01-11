window.onload = function () {
    //window.setTimeout("show_date_time()", 1000);
    BirthDay = new Date("12/11/2012 12:56:57");
    today = new Date();
    timeold = (today.getTime() - BirthDay.getTime());
    sectimeold = timeold / 1000
    secondsold = Math.floor(sectimeold);
    msPerDay = 24 * 60 * 60 * 1000
    e_daysold = timeold / msPerDay
    daysold = Math.floor(e_daysold);
    //years=Math.floor((daysold/365))
    //days=Math.floor((daysold%365))
    //e_hrsold=(e_daysold-daysold)*24;
    //hrsold=setzero(Math.floor(e_hrsold));
    //e_minsold=(e_hrsold-hrsold)*60;
    //minsold=setzero(Math.floor((e_hrsold-hrsold)*60));
    //seconds=setzero(Math.floor((e_minsold-minsold)*60));
    //document.getElementById('run_days').innerHTML=daysold;
    //document.getElementById('run_time').innerHTML=years+"年"+days+"天"+hrsold+"小时"+minsold+"分"+seconds+"秒";
    document.getElementById('blog_open_days').innerHTML = daysold;

    // 正确处理异步函数返回的Promise对象
    getSiteUpdateDate().then(function(updateDate) {
        document.getElementById('update_date').innerHTML = updateDate;
    });
}

//  function setzero(i){
//    if (i<10){
//      i="0" + i
//    };
//    return i;
//  }

//  show_date_time();

/**
 * 读取网站更新时间
 * @returns {Promise<string>} 返回一个Promise，resolve包含更新时间的字符串
 */
async function getSiteUpdateDate() {
    try {
        const response = await fetch('/update_date.txt');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updateDate = await response.text();
        return updateDate.trim();
    } catch (error) {
        console.error('获取更新时间失败:', error);
        return '未知';
    }
}

// 兼容旧版本浏览器的回调方式
function getSiteUpdateDateCallback(callback) {
    fetch('/update_date.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(text => {
            callback(text.trim());
        })
        .catch(error => {
            console.error('获取更新时间失败:', error);
            callback('未知');
        });
}