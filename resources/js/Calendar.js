var Travelex = Travelex || {};
Travelex.PurchaseFunnel = Travelex.PurchaseFunnel || {};

Travelex.PurchaseFunnel.Calendar = function (hidFieldId, divId, minDate, maxDate, postbackFunction, dates, regionSettings, isJapan) {

    this.hidFieldId = hidFieldId;
    this.divId = divId;
    this.minDate = minDate;
    this.maxDate = maxDate;
    this.postbackFunction = postbackFunction;
    this.dateDictionary = [];

    var dateJson = eval('(' + dates + ')');
    var me = this;

    this.Init = function () {

        for (var i = 0; i < dateJson.length; i++) {
            me.dateDictionary[i] = [new Date(dateJson[i]['Year'], dateJson[i]['Month'] - 1, dateJson[i]['Day'], 0, 0, 0, 0), dateJson[i]['Colour'], dateJson[i]['Id']];
        }

        var dPick = $('#' + me.divId);
        if (isJapan == "True") {
            isJapan = true;
        }
        else {
            isJapan = false;
        }

        var calanderSettings =
            {
                changeMonth: false,
                changeYear: false,
                minDate: me.minDate,
                maxDate: me.maxDate,
                showOtherMonths: false,
                beforeShowDay: me.OnDayShow,
                onSelect: me.OnSelect,
                showMonthAfterYear: isJapan
            }

        var property;
        for (property in regionSettings)
            calanderSettings[property] = regionSettings[property];

        dPick.datepicker(calanderSettings);
        var hidVal = $('#' + me.hidFieldId).val();
        if (hidVal != undefined && hidVal != '' && hidVal != null)
            dPick.datepicker('setDate', hidVal);
    };

    this.OnDayShow = function (date) {

        for (var i = 0; i < me.dateDictionary.length; i++) {
            if (me.dateDictionary[i][0].toString() == date.toString()) {
                return [true, 'fulfilmentOption' + (me.dateDictionary[i][1])];
            }
        }
        return [false, ''];
    };

    this.OnSelect = function (date) {
        var selectedDate = $('#' + me.divId).datepicker('getDate');
        var i;
        window.location.href='./Order.html'
        for (i = 0; i < me.dateDictionary.length; i++) {
            if (me.dateDictionary[i][0].toString() == selectedDate.toString()) {
                $('#' + me.hidFieldId).val(date);
                $('#fulfilmentOptionId').val('');
                $('#fulfilmentOptionId').val(me.dateDictionary[i][2]);
                $('#fulfilmentDateNextBtn').css('display', 'inline');
                return;
            }
        }
    };

    this.AddCss = function (colour) {
        var sheet = document.styleSheets[(document.styleSheets.length - 1)];

        for (var i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].href && (document.styleSheets[i].href.indexOf("calendar.css") >= 0)) {
                sheet = document.styleSheets[i];
                break;
            }
        }

        if (sheet.insertRule) {
            // sheet.insertRule('.fulfilment_date .ui-datepicker .fulfilmentOption' + colour + ' a {background: #' + colour + '}', 0);
            //HACK!
            //In Firefox in HTTPS mode "insertRule" for css fails with security error: ns_error_dom_security_err.
            //$("header").append("<style>.fulfilment_date .ui-datepicker .fulfilmentOption" + colour + " a {background: #" + colour + "}</style>");
            $("header").append("<style>.ui-datepicker .fulfilmentOption" + colour + "{background: #" + colour + "}</style>");
        }
        else if (sheet.addRule) {
            //sheet.addRule('.fulfilment_date .ui-datepicker .fulfilmentOption' + colour + ' a', 'background: #' + colour, 0);
            sheet.addRule('.ui-datepicker .fulfilmentOption' + colour, 'background: #' + colour, 0);
        }
    };

    this.Init();
};



$(function () {
    if (typeof (Sys) !== 'undefined') {
        Sys.Application.notifyScriptLoaded();
    }
});


/*document ready scripts*/
$(document).ready(function () {
    if ($('#fulfilmentOptionId').val().length != 0 && $('#fulfilmentOptionId').val().length != 0) {
        $('#fulfilmentDateNextBtn').css('display', 'inline');
    }

    $(".submit").click(function (ev) {
        ev.preventDefault();
        if ($('#fulfilmentOptionId').val().length == 0 || $('#fulfilmentOptionId').val().length == 0) {
            alert('Please select a Date!');
        } else {
            document.forms[0].submit();
        }


    });
});