function postFrom() {
    var url = 'http://192.168.40.17:8868/postFrom';
    var changeInfo = getItem('changeCNY');
    var address = getItem('address');
    var date = getItem('date');
    var personInfo = getItem('personInfo');
    var data = {
        changeMoney:changeInfo.changeMoney,
        money:changeInfo.money,
        rate:changeInfo.rate,
        email:personInfo.email,
        name:personInfo.lastName+personInfo.firstName,
        phone:personInfo.phone,
        type:changeInfo.type,
        title:personInfo.title,
        address:address.replace(/\ +/g,"").replace(/[\r\n]/g,""),
        date:date,
    };
    $.post(url,data,function (data) {
        console.log('res:',data)
    })
}
function getTest() {
    var url = 'http://192.168.40.17:8868/data';
    // var dateType =
    $.get(url,function (data) {
        console.log('test提交成功！')
    })
}

