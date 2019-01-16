//divMap is where the map will be shown
function GoogleMapDisplay(divMap, imgGoogleMapStatic, StoreLat, StoreLong) {
    var isIE6 = IsIE6();   //ie6 will show static map.

    //IE6 vars
    var imgGoogleMapStatic, imgSrc;
    if (isIE6) {
        divMap.style.display = 'none'; //hide interactive map

        imgGoogleMapStatic.src = '../../../static/images/AjaxLoading.gif'/*tpa=https://buy.travelex.com.../../resources/Images/AjaxLoading.gif*/; //not really working
        imgSrc = '../../../maps.google.com/maps/api/staticmap-sensor=false&zoom=14&size=500x500'/*tpa=http://maps.google.com/maps/api/staticmap?sensor=false&zoom=14&size=500x500*/;
    } else {
        imgGoogleMapStatic.style.display = 'none';  //hide static image
    }

    var i;
    var latlng;
    var map;
    var markerPoint;
    var fullpath = '/view';

   

    if (document.domain == "localhost") {
         fullpath = '';
    }

    //create map and center
    if (isIE6) {
        imgSrc += '&center=' + StoreLat.toString() + ',' + StoreLong.toString();
    } else {
        latlng = new google.maps.LatLng(StoreLat, StoreLong);
        var myOptions = {
            zoom: 14,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(divMap, myOptions);
    }
    if (storeMappingData && storeMappingData.length > 0) {
        var mapData = eval(storeMappingData);
        var latitude, longitude, storeName, storeAddress, storeType;
        var storeIdx = 0;

        var storeCount = 0;
        var airportCount = 0;
        var markerImageUrl;

        storeData = mapData[storeIdx];
        while (storeData) {
            latitude = storeData.Latitude;
            longitude = storeData.Longitude;
            storeName = storeData.PrimaryText;
            storeAddress = storeData.AddressDetails;
            storeType = storeData.StoreType;  // City / Airport

            if (storeType == 'Airport') {
                airportCount++;
                markerImageUrl = fullpath + '/Content/img/GoogleMapFlags/airport' + airportCount.toString() + '.gif';
                if (isIE6) imgSrc += '&markers=color:blue|label:' + airportCount + '|';
            } else {
                storeCount++;
                markerImageUrl = fullpath + '/Content/img/GoogleMapFlags/store' + storeCount.toString() + '.gif';
                if (isIE6) imgSrc += '&markers=color:red|label:' + storeCount + '|';
            }
            if (isIE6) {
                imgSrc += latitude.toString() + ',' + longitude.toString();
            } else {
                //create google map marker
                var markerImg = new google.maps.MarkerImage(markerImageUrl); //, new google.maps.Size(32, 16));
                latlng = new google.maps.LatLng(latitude, longitude);
                markerPoint = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: storeName,
                    icon: markerImg
                });
                var gInfoWindowPopUp = new GoogleMapMarker(markerPoint, map, storeName + '<br />' + storeAddress);
                google.maps.event.addListener(markerPoint, 'click', gInfoWindowPopUp.DoPopUp);
            }
            storeIdx++;
            storeData = mapData[storeIdx];
        }

    }
    if (isIE6) {
        imgGoogleMapStatic.src = imgSrc;
    }
}

function IsIE6() {
    var isIE6 = false;
    if (navigator) {
        if (navigator.appName) {
            if (navigator.appName == 'Microsoft Internet Explorer') {
                if (navigator.appVersion) {
                    if (navigator.appVersion.indexOf('MSIE 6') > -1)
                        isIE6 = true;
                }
            }
        }
    }
    return isIE6;
}


var googlePopUpInfo = null; //used to hide the previously shown InfoWindow
GoogleMapMarker = function (markerPoint, map, storeInfo) {
    this.marker = markerPoint;
    this.map = map;
    this.storeInfo = storeInfo;

    var me = this;

    this.DoPopUp = function () {
        if (googlePopUpInfo != null)
            googlePopUpInfo.close();

        var pu = new google.maps.InfoWindow({
            content: storeInfo
        });
        pu.open(me.map, me.marker);
        googlePopUpInfo = pu;
    };

}
