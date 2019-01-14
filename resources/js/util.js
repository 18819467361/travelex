function setItem(k,v) {
    sessionStorage.setItem(k, JSON.stringify(v));
}

//本地获取数据
function getItem(k) {
    return JSON.parse(sessionStorage.getItem(k));
}

//本地删除某个数据
function removeItem(k) {
    localStorage.removeItem(k);
}

//本地删除所有数据
function removeAllItem() {
    sessionStorage.clear();
}

//验证输入金额是否正确

function verifyMoney(val) {
    if(!val){
        $('.validation-summary-valid li').html('总金额必须大于人民币¥3,000.00元。').show().removeClass('validation-summary-valid').addClass('validation-summary-errors');
        $('.validation-summary-valid').addClass('validation-summary-errors').removeClass('validation-summary-valid');
        return false
    }
    if(val<3000){
        $('.validation-summary-valid li').html('您预订的金额已根据所选外币可供应的最小面额进行调整。<br/>总金额必须大于人民币¥3,000.00元。').show();
        $('.validation-summary-valid').addClass('validation-summary-errors').removeClass('validation-summary-valid');
        return false
    } else if(val>28000) {
        $('.validation-summary-valid li').html('总金额需低于人民币¥28,000.00元。').show();
        $('.validation-summary-valid').addClass('validation-summary-errors').removeClass('validation-summary-valid');
        return false
    } else {
        return true
    }
}

//获取取币网点信息

function getChangeAddress() {
    var address = $('.branch-info-hidden-map p').html();
    setItem('address',address);
}