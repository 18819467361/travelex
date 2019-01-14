$(document).ready(function () {
    if (isCRGIncluded == "True") {
        $("#removeCRG").show();
        $("#addCRG").hide();
        
    }
    else {
        $("#removeCRG").hide();
        $("#addCRG").show();
    }

    if (isSecondaryCardAdded == "True") {
        $("#removeSecondaryCard").show();
        $("#addSecondaryCard").hide();
        $('label[for=addSecondaryCardLabelForOther]').show();
    }
    else {
        $("#removeSecondaryCard").hide();
        $("#addSecondaryCard").show();
        $('label[for=addSecondaryCardLabelForOther]').hide();
    }

    $("#addCRG").click(function () {
        $("#IsCRGIncluded").val("True");
        $("#removeCRG").show();
        $("#addCRG").hide();
    });
    $("#removeCRG").click(function () {
        $("#IsCRGIncluded").val("False");
        $("#addCRG").show();
        $("#removeCRG").hide();
    });

    $("#addSecondaryCard").click(function () {
        $("#IsSecondaryCardAdded").val("True");
        $("#removeSecondaryCard").show();
        $("#addSecondaryCard").hide();
        $('label[for=addSecondaryCardLabelForOther]').show();
    });
    $("#removeSecondaryCard").click(function () {
        $("#IsSecondaryCardAdded").val("False");
        $("#addSecondaryCard").show();
        $("#removeSecondaryCard").hide();
        $('label[for=addSecondaryCardLabelForOther]').hide();
    });


});