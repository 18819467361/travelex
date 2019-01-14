
function registerCurrencyConverter(_idProductCode, _idFrom, _idTo, _idExchangeRate, _idToCurrency, _idExchangeRateText, _isStatesAvailable, _restrictedProductStates, _foreignCurrencyAsBase, _idrateLastUpdatedText) {
    var idProductCode = "#" + _idProductCode;
    var idFrom = "#" + _idFrom;
    var idTo = "#" + _idTo;
    var idExchangeRate = "#" + _idExchangeRate;
    var idToCurrency = "#" + _idToCurrency;
    var idExchangeRateText = "#" + _idExchangeRateText;
    var idIsStatesAvailable = "#" + _isStatesAvailable;
    var idRestrictedProductStates = "#" + _restrictedProductStates;
    var idforeignCurrencyAsBase = "#" + _foreignCurrencyAsBase;
    var idRateLastUpdatedText = "#" + _idrateLastUpdatedText;

    var previousProductCode = $(idProductCode).val();


    $(idFrom).keydown(on_key_down);
    $(idTo).keydown(on_key_down);

    $(idFrom).keyup(function (ev) {
        on_from_amount_changed(ev, idProductCode, idFrom, idTo, idExchangeRate, idforeignCurrencyAsBase);
    });

    $(idTo).keyup(function (ev) {
        on_to_amount_changed(ev, idProductCode, idTo, idFrom, idExchangeRate, idforeignCurrencyAsBase);
    });

    $(idFrom).blur(function (ev) {
        format_field(idFrom, idProductCode, false);
    });

    $(idTo).blur(function (ev) {
        format_field(idTo, idProductCode, true);
    });

    $(idProductCode).change(function (ev) {
        if ($(idProductCode).val() == "") {
            $(idProductCode).val(previousProductCode);
            return false;
        }
        previousProductCode = $(idProductCode).val();
        on_change_product(idProductCode, idFrom, idTo, idExchangeRate, idToCurrency, idExchangeRateText, idIsStatesAvailable, idRestrictedProductStates, idforeignCurrencyAsBase, idRateLastUpdatedText, false);
    });

    on_change_product(idProductCode, idFrom, idTo, idExchangeRate, idToCurrency, idExchangeRateText, idIsStatesAvailable, idRestrictedProductStates, idforeignCurrencyAsBase, idRateLastUpdatedText, true);
    format_field(idFrom, idProductCode, false);
    format_field(idTo, idProductCode, true);
}

function on_key_down(e) {
    var n = e.keyCode;
    var hit = (n == 8) ||               // backspace 
                (n == 9) ||               // tab
                (n == 46) ||              // delete 
                (n == 110) ||             // decimal point
                (n == 190) ||             // period
                (n >= 35 && n <= 40) ||   // arrow keys/home/end 
                (n >= 48 && n <= 57) ||   // numbers on keyboard 
                (n >= 96 && n <= 105);    // number on keypad 
    return hit;
}

function on_from_amount_changed(e, idProductCode, idFrom, idTo, idExchangeRate, idforeignCurrencyAsBase) {
    update(idProductCode, idFrom, idTo, idExchangeRate, idforeignCurrencyAsBase, false);
}

function on_to_amount_changed(e, idProductCode, idFrom, idTo, idExchangeRate, idforeignCurrencyAsBase) {
    update(idProductCode, idFrom, idTo, idExchangeRate, idforeignCurrencyAsBase, true);
}

function format_field(idField, idProductCode, fromOrTo) {
    var amount = parse_amount($(idField).val());
    var productInfo = find_product_info($(idProductCode).val());
    var numDecimalDigits = fromOrTo ? productInfo.ProductNumDecimalDigits : decimalDigits;
    //TODO: fix numDecimalDigits
    $(idField).val(format_amount(amount, numDecimalDigits));
}

function update(idProductCode, idFrom, idTo, idExchangeRate, idforeignCurrencyAsBase, ForeignToLocal) {
    var foreignCurrencyAsBase = null;
    if ($(idforeignCurrencyAsBase).val() == "True")
        foreignCurrencyAsBase = true;
    else
        foreignCurrencyAsBase = false;

    var amount = parse_amount($(idFrom).val());
    var rate = parse_amount($(idExchangeRate).val());
    var productInfo = find_product_info($(idProductCode).val());
    var value = null;
    if (ForeignToLocal) {
        value = foreignCurrencyAsBase ? (amount / productInfo.RateDenomination) * rate : (amount / productInfo.RateDenomination) / rate;
    }
    else {
        value = foreignCurrencyAsBase ? (amount * productInfo.RateDenomination) / rate : (amount * productInfo.RateDenomination) * rate;
    }
    var numDecimalDigits = foreignCurrencyAsBase ? decimalDigits : productInfo.ProductNumDecimalDigits;
    //TODO: fix numDecimalDigits
    $(idTo).val(format_amount(value, numDecimalDigits));
}

function parse_amount(str) {
    str = replace(str, decimalSeparator, '.');
    return parseFloat(str);
}

function replace(str, strFind, strReplace) {
    return str.split(strFind).join(strReplace);
}

function format_amount(amount, numDecimalDigits) {
    var c = numDecimalDigits;
    var n = parseFloat(amount);
    c = isNaN(c = Math.abs(c)) ? 2 : c;
    var s = n < 0 ? "-" : "";
    var i = Math.abs(+n || 0).toFixed(c) + "";
    return (s + i);
}

function on_change_product(idProductCode, idFrom, idTo, idExchangeRate, idToCurrency, idExchangeRateText, idIsStatesAvailable, idRestrictedProductStates, idforeignCurrencyAsBase, idRateLastUpdatedText, isPageLoad) {
    var productCode = $(idProductCode).val();
    var productInfo = find_product_info(productCode);

    if (productInfo == null)
        return false;

    change_product(productInfo, idFrom, idTo, idExchangeRate, idToCurrency, idExchangeRateText, idRateLastUpdatedText);
    if (!isPageLoad) {
        update(idProductCode, idFrom, idTo, idExchangeRate, idforeignCurrencyAsBase, false);
    }
    var restrictedStates = find_state_info(productCode, idIsStatesAvailable);
    change_restricted_states(restrictedStates, idRestrictedProductStates);
}

function change_product(productInfo, idFrom, idTo, idExchangeRate, idToCurrency, idExchangeRateText, idRateLastUpdatedText) {
    if (productInfo == null) {
        alert("Could not find product rate for: " + productCode);
        return;
    }

    productDecimalDigits = productInfo.ProductNumDecimalDigits;
    $(idExchangeRate).val(productInfo.ExchangeRate);
    $(idRateLastUpdatedText).html(ratesLastUpdatedText.replace('[LastUpdated]', productInfo.ProductRateDateReviewed));
    $(idToCurrency).text(productInfo.CurrencyCode);
    $(idExchangeRateText).text(productInfo.ExchangeRateText);
}

function change_restricted_states(restrictedStates, idRestrictedProductStates) {
    if (restrictedStates == null) {
        return;
    }
    $(idRestrictedProductStates).text(restrictedStates.States);
}

function find_product_info(productCode) {
    for (i in productInformation) {
        if (productInformation[i].ProductCode == productCode) {
            return productInformation[i];
        }
    }
    return null;
}

function find_state_info(productCode, idIsStatesAvailable) {
    for (i in restrictedStates) {
        if (restrictedStates[i].ProductCode == productCode) {
            $(idIsStatesAvailable).show();
            return restrictedStates[i];
        }
        else {
            $(idIsStatesAvailable).hide();
        }
    }
    return null;
}
