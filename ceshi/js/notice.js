function loadfile(filename,filetype){

    if(filetype == "js"){
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src",filename);
    }else if(filetype == "css"){
        var fileref = document.createElement('link');
        fileref.setAttribute("rel","stylesheet");
        fileref.setAttribute("type","text/css");
        fileref.setAttribute("href",filename);
    }
    if(typeof fileref != "undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }

}

function crossDomainAjax (url,successCallback) {

    url = encodeURI(url);
    // IE8 & 9 only Cross domain JSON GET request
    if ('XDomainRequest' in window && window.XDomainRequest !== null) {
        var xdr = new XDomainRequest(); // Use Microsoft XDR
        xdr.open('get', url);
        xdr.onload = function () {
            var dom  = new ActiveXObject('Microsoft.XMLDOM'),
                JSON = $.parseJSON(xdr.responseText);

            dom.async = false;

            if (JSON == null || typeof (JSON) == 'undefined') {
                JSON = $.parseJSON(data.firstChild.textContent);
            }

            successCallback(JSON); // internal function
        };

        xdr.onerror = function() {
            _result = false;
        };

        xdr.send();
    }

    // IE7 and lower can't do cross domain
    else if (navigator.userAgent.indexOf('MSIE') != -1 &&
        parseInt(navigator.userAgent.match(/MSIE ([\d.]+)/)[1], 10) < 8) {
        return false;
    }

    // Do normal jQuery AJAX for everything else
    else {
        $.ajax({
            url: url,
            cache: false,
            dataType: 'json',
            type: 'GET',
            async: false, // must be set to false
            success: function (data, success) {
                successCallback(data);
            }
        });
    }
}

//loadfile("http://static.mbalib.com/common/bang-ad_v0104.css","css");
//loadfile("http://static.mbalib.com/common/bang-ad_v0104.js","js");
//loadfile("http://static.mbalib.com/common/top_notice.js","js");
(function(){
    var host=document.domain;
    loadfile("http://static.mbalib.com/common/ad/ad.css","css");
    loadfile("http://static.mbalib.com/common/ad/ad2.js","js");
    if(host == 'wiki.mbalib.com')
    {
        loadfile("http://static.mbalib.com/common/reward.css","css");
        loadfile("http://static.mbalib.com/common/reward.js","js");
    }
})();
