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

//获取上次选择的币种
function setMoneySelect(val) {
    var $select = $('.dropdown-info-button');
    switch (val){
        case 'USD':
            $select.val('USD/USD');
            break;
        case 'HKD':
            $select.val('HKD/HKD');
            break;
        case 'JPY':
            $select.val('JPY/JPY');
            break;
        case 'AED':
            $select.val('AED/AED');
            break;
        case 'AUD':
            $select.val('AUD/AUD');
            break;
        case 'MOP':
            $select.val('MOP/MOP');
            break;
        case 'BRL':
            $select.val('BRL/BRL');
            break;
        case 'DKK':
            $select.val('DKK/DKK');
            break;
        case 'RUB':
            $select.val('RUB/RUB');
            break;
        case 'PHP':
            $select.val('PHP/PHP');
            break;
        case 'KRW':
            $select.val('KRW/KRW');
            break;
        case 'CAD':
            $select.val('CAD/CAD');
            break;
        case 'MYR':
            $select.val('MYR/MYR');
            break;
        case 'NOK':
            $select.val('NOK/NOK');
            break;
        case 'EUR':
            $select.val('EUR/EUR');
            break;
        case 'SEK':
            $select.val('SEK/SEK');
            break;
        case 'CHF':
            $select.val('CHF/CHF');
            break;
        case 'TWD':
            $select.val('TWD/TWD');
            break;
        case 'THB':
            $select.val('THB/THB');
            break;
        case 'SGD':
            $select.val('SGD/SGD');
            break;
        case 'NZD':
            $select.val('NZD/NZD');
            break;
        case 'INR':
            $select.val('INR/INR');
            break;
        case 'IDR':
            $select.val('IDR/IDR');
            break;
        case 'GBP':
            $select.val('GBP/GBP');
            break;
        case 'VND':
            $select.val('VND/VND');
            break;
        default:
            break;
    }
}

//设置选择兑换币种的弱提示
function setRateTip(val) {
    var $tip = $('#Items_0__CurrencyConverter_ExchangeRateText')
    console.log(val)
    switch (val){
        case 'USD':
            $tip.html('1 USD = 6.8523 CNY');
            break;
        case 'HKD':
            $tip.html('1 HKD = 0.8835 CNY');
            break;
        case 'JPY':
            $tip.html('100 JPY = 6.3602 CNY');
            break;
        case 'AED':
            $tip.html('1 AED = 1.9854 CNY');
            break;
        case 'AUD':
            $tip.html('1 AUD = 5.1339 CNY');
            break;
        case 'MOP':
            $tip.html('1 MOP = 0.8838 CNY');
            break;
        case 'BRL':
            $tip.html('1 BRL = 2.0501 CNY');
            break;
        case 'DKK':
            $tip.html('1 DKK = 1.0850 CNY');
            break;
        case 'RUB':
            $tip.html('1 RUB = 0.1044 CNY');
            break;
        case 'PHP':
            $tip.html('1 PHP = 0.1360 CNY');
            break;
        case 'KRW':
            $tip.html('100 KRW = 0.6573 CNY');
            break;
        case 'CAD':
            $tip.html('1 CAD = 5.2693 CNY');
            break;
        case 'MYR':
            $tip.html('1 MYR = 1.7557 CNY');
            break;
        case 'NOK':
            $tip.html('1 NOK = 0.8265 CNY');
            break;
        case 'EUR':
            $tip.html('1 EUR = 8.0944 CNY');
            break;
        case 'SEK':
            $tip.html('1 SEK = 0.7831 CNY');
            break;
        case 'CHF':
            $tip.html('1 CHF = 7.0762 CNY');
            break;
        case 'TWD':
            $tip.html('1 TWD = 0.2345 CNY');
            break;
        case 'THB':
            $tip.html('1 THB = 0.2293 CNY');
            break;
        case 'SGD':
            $tip.html('1 SGD = 5.1980 CNY');
            break;
        case 'NZD':
            $tip.html('1 NZD = 4.7603 CNY');
            break;
        case 'INR':
            $tip.html('1 INR = 0.1016 CNY');
            break;
        case 'IDR':
            $tip.html('100 IDR = 0.0521 CNY');
            break;
        case 'GBP':
            $tip.html('1 GBP = 8.9685 CNY');
            break;
        case 'VND':
            $tip.html('100 VND = 0.0326 CNY');
            break;
        default:
            break;
    }
}

//格式化金钱
function moneyFormat(v) {
    return parseInt(v).toString().replace(/\B(?=(?:\d{3})+\b)/g, ',')
}
//格式化金钱（带2位小数）
function formatMoney(s, type) {
    if (/[^0-9\.]/.test(s))
        return "0";
    if (s == null || s == "")
        return "0";
    s = s.toString().replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s))
        s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    if (type == 0) {// 不带小数位(默认是有小数位)
        var a = s.split(".");
        if (a[1] == "00") {
            s = a[0];
        }
    }
    return s;
}

//格式化电话号码
function phoneFormat(v) {
    var reg =/(\d{4})/g;
    return v.replace(reg,"$1"+' ');

}

//验证邮箱
function verifyEmail(val1,val2) {

    if(val1===val2){
        $('#ContactDetails_EmailAddressConfirm').removeClass('input-validation-error');
        var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(val1.match(reg)){
            $('#ContactDetails_EmailAddress').removeClass('input-validation-error');
            $('#ContactDetails_EmailAddressConfirm').removeClass('input-validation-error');
            return true
        }else {
            $('#ContactDetails_EmailAddress').addClass('input-validation-error');
            $('#ContactDetails_EmailAddressConfirm').addClass('input-validation-error');
            return false
        }
    } else {
        //提示语 我们无法处理您的订单。请确认您已正确填写所有信息。 红框提示
        $('#ContactDetails_EmailAddressConfirm').addClass('input-validation-error');
        return false
    }
}

//验证移动电话
function verifyPhone(val) {
    var reg =/^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/;
    if(val && val.match(reg)){
        $('#ContactDetails_PhoneNumber').removeClass('input-validation-error');
        return true
    } else {
        $('#ContactDetails_PhoneNumber').addClass('input-validation-error');
        return false
    }
}

// 验证客户提交的表单
function verifyPerSonForm(data) {
    var passVerify = true;
    if(!data.title || data.title.length<=0){
        $('#ContactDetails_Title').addClass('input-validation-error')
        passVerify = false;
    } else {
        $('#ContactDetails_Title').removeClass('input-validation-error')
    }
    if(!data.firstName || data.firstName.length<=0){
        $('#ContactDetails_FirstName').addClass('input-validation-error')
        passVerify = false;
    } else {
        $('#ContactDetails_FirstName').removeClass('input-validation-error')
    }
    if(!data.lastName || data.lastName.length<=0){
        $('#ContactDetails_LastName').addClass('input-validation-error')
        passVerify = false;
    } else {
        $('#ContactDetails_LastName').removeClass('input-validation-error')
    }
    if(data.email && data.emailConfirm){
        passVerify = verifyEmail(data.email,data.emailConfirm) ? passVerify : false;
    } else {
        passVerify = false;
        if (data.email){
            $('#ContactDetails_EmailAddressConfirm').addClass('input-validation-error');
            $('#ContactDetails_EmailAddress').removeClass('input-validation-error');
        } else {
            $('#ContactDetails_EmailAddress').addClass('input-validation-error');
            if(!data.emailConfirm){
                $('#ContactDetails_EmailAddressConfirm').addClass('input-validation-error');
            }
        }
    }
    if(data.phone){
        $('#ContactDetails_PhoneNumber').removeClass('input-validation-error')
        passVerify = verifyPhone(data.phone) ? passVerify : false;
    } else {
        $('#ContactDetails_PhoneNumber').addClass('input-validation-error')
    }
    return passVerify;
}

// 获取随机数
function GetRandomNum(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

function getRandomStap() {
    var str = 'CN70'
    for (var i=0;i<6;i++){
        str = str + GetRandomNum(0,9)
    }
    return str;
}