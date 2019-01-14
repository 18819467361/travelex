function SetIdTypeCountryDropDown() {
    var identificationTypeId = $('#IdentificationDetails_IdentificationTypeId').val();
    var identificationStateid = $('#IdentificationDetails_IdentificationTypeStateId');
    var idenSelectCountry = $('#IdentificationDetails_SelectCountry').val();

    if (identificationTypeId == '') {
        identificationStateid.hide('slow'); $('#imgstateofissue').hide('slow');
        return;
    }
    var idInfo = identificationTypeInfos[identificationTypeId];
    var defaultOption = $('select[id*="IdentificationDetails_IdentificationTypeCountryId"] option:first');
    var target = $('select[id*="IdentificationDetails_IdentificationTypeCountryId"]');
    var html = '<option value="">' + idenSelectCountry + '</option>';
    var hiddenCountryId = $('input[id*="IdentificationDetails_IdentificationTypeCountryId"]').val();

    if (identificationTypeId == '') {
        target.attr("disabled", true);
    } else {
        target.attr("disabled", false);
        for (var i in idInfo.Countries) {
            var country = idInfo.Countries[i];
            html += '<option value="' + country.CountryId + '">' + country.InternalName + '</option>';
        }
    }
    if (idInfo.Countries.length == 1) {
        html = '<option value="' + country.CountryId + '">' + country.InternalName + '</option>';
    }
    target.html(html);

    if ((hiddenCountryId != '' || idInfo.Countries.length == 1) && hiddenCountryId != 'undefined') {
        target.val(hiddenCountryId);
        SetIdTypeStateDropDown();
    }
    else {
        if (identificationTypeId != '') {
            identificationStateid.hide('slow'); $('#imgstateofissue').hide('slow');
        }
    }
}

function SetIdTypeStateDropDown() {
    var identificationTypeId = $('#IdentificationDetails_IdentificationTypeId').val();
    var idInfo = identificationTypeInfos[identificationTypeId];
    var countryId = $('select[id*="IdentificationDetails_IdentificationTypeCountryId"]').val();
    var defaultOption = $('#IdentificationDetails_IdentificationTypeStateId option:first');
    var target = $('#IdentificationDetails_IdentificationTypeStateId');
    var html = '<option value="">' + defaultOption.html() + '</option>';
    var country;
    var hiddenStateId = $('input[id*="IdentificationDetails_IdentificationTypeStateId"]').val();

    if (identificationTypeId == '' || countryId == '') {
        target.hide('slow');
    } else {
        for (var i in idInfo.Countries) {
            if (idInfo.Countries[i].CountryId == countryId) {
                country = idInfo.Countries[i];
                break;
            }
        }
        if (country.States.length > 0) {
            for (var j in country.States) {
                html += '<option value="' + country.States[j].StateId + '">' + country.States[j].InternalName + '</option>';
            }
            target.show('slow'); $('#imgstateofissue').show('slow');
        } else {
            target.hide('slow'); $('#imgstateofissue').hide('slow');
        }
    }

    target.html(html);

    if ((hiddenStateId != '' || idInfo.Countries.length == 1) && hiddenStateId != 'undefined') {
        target.val(hiddenStateId);
    }
}

function SetIdTypeCheckBox() {
    var identificationTypeId = $('#IdentificationDetails_IdentificationTypeId').val();
    var additionalId = $('#IdentificationDetails_IdentificationIsAdditionalIdChecked')
    var x = $('label[for=IdentificationDetails_IdentificationIsAdditionalIdChecked]');

    if (identificationTypeId == '') {
        additionalId.hide('slow');
        x.hide('slow');
        $('#IdentificationDetails_IdentificationIsAdditionalIdChecked').prop('checked', false);
        return;
    }
    if (identificationTypeId == 'DriversLicence') {
        additionalId.show('slow');
        x.show('slow');
    }
    else {
        additionalId.hide('slow');
        x.hide('slow');
        $('#IdentificationDetails_IdentificationIsAdditionalIdChecked').prop('checked', false);
    }

}

SetIdTypeCheckBox();

$('#IdentificationDetails_IdentificationTypeId').change(function (ev) {
    SetIdTypeCountryDropDown();
    SetIdTypeCheckBox();
});

$('select[id*="IdentificationDetails_IdentificationTypeCountryId"]').change(function (ev) {
    $('input[id*="IdentificationDetails_IdentificationTypeCountryId"]').val($('select[id*="IdentificationDetails_IdentificationTypeCountryId"]').val());
    SetIdTypeStateDropDown();
});

$('select[id*="IdentificationDetails_IdentificationTypeStateId"]').change(function (ev) {
    $('input[id*="IdentificationDetails_IdentificationTypeStateId"]').val($('select[id*="IdentificationDetails_IdentificationTypeStateId"]').val());
});

