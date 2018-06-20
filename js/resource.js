

;(function() {

    var resourceCache = {};
    var loading = []
    var readyCallbacks = []

    function load(images){
        if (Array.isArray(images)){
            images.forEach(function(url){
                if(resourceCache[url]){
                    return resourceCache[url]
                }else {
                    var img = new Image();
                    img.onload = function() {
                        resourceCache[url] = img;
                    if(isItemReady()) {
                        readyCallbacks.forEach(function(func) { func(); });
                    }

                    }
                resourceCache[url] = false;
                img.src = url;
                }
            })
        }


    }

    function isItemReady(){
        var ready = true;
        for(var item in resourceCache){
            if(resourceCache.hasOwnProperty(item) && !resourceCache[item]) {
                ready = false;
            }
        }
        return ready;
    }


    function get(url) {
        return resourceCache[url];
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }


    return resources = {
        get: get,
        load: load,
        isItemReady:isItemReady,
        onReady:onReady
    }

})();

