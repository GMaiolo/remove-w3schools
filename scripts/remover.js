(function() {
    var W3SchoolsRemover = {
        currentUrl: {}, 
        constants: {
            queries: {
                result_links: 'div.g .r > a[href*="www.w3schools.com"]', 
                main_google_node: 'main'
            }, 
            events: {
                get_info: 'get_tId_and_wId', 
                inactive: 'inactive', 
                active: 'active'
            }, 
            console: {
                removed: 'W3Schools links were removed from this search.'
            }, 
            observerConfig: { childList: true, subtree: true }
        }, 
        init: function() {
            var mainGoogleNode = document.getElementById(this.constants.queries.main_google_node);
            /* avoiding google new tab page and other variations */
            if(!mainGoogleNode) {
                return chrome.runtime.sendMessage({ event: this.constants.events.inactive, url: window.location.href });
            } 
            chrome.runtime.sendMessage({ event: this.constants.events.get_info }, function(info) {
                var tId = info.tId;
                var wId = info.wId;
                this.currentUrl[wId] = this.currentUrl[wId] ? this.currentUrl[wId] : {};
                this.currentUrl[wId][tId] = window.location.href;
                this.remove(info);
                this.createResultsObserver(mainGoogleNode);
            }.bind(this))
        }, 
        getAllW3Links: function() {
            return document.querySelectorAll(this.constants.queries.result_links);
        }, 
        remove: function(info) {
            var tId = info.tId;
            var wId = info.wId;
            var links = this.getAllW3Links();
            var count = links.length;
            if(!count) {
                if(!this.isSameUrl(window.location.href, info)) {
                    chrome.runtime.sendMessage({ event: this.constants.events.inactive });
                    this.currentUrl[wId][tId] = window.location.href;
                }
                return;
            }
            this.currentUrl[wId][tId] = window.location.href;
            chrome.runtime.sendMessage({ event: this.constants.events.active, count: count });
            console.info(count + ' ' + this.constants.console.removed);
            links.forEach(deleteOldGrandpaNode);
        }, 
        createResultsObserver: function(mainGoogleNode) {
            this.resultsObserver = new MutationObserver(function() {
                chrome.runtime.sendMessage({ event: this.constants.events.get_info }, function(info) {
                    var tId = info.tId;
                    var wId = info.wId;
                    this.currentUrl[wId] = this.currentUrl[wId] ? this.currentUrl[wId] : {};
                    this.remove(info);
                }.bind(this));
            }.bind(this))
            this.resultsObserver.observe(mainGoogleNode, this.constants.observerConfig);
        }, 
        isSameUrl: function(currentUrl, info) {
            var tId = info.tId;
            var wId = info.wId;
            return this.currentUrl[wId][tId] === currentUrl;
        }
    };

    function deleteOldGrandpaNode(el) {
        var parent = el.parentNode;
        if(!parent) return;
        parent = parent.parentNode;
        if(!parent) return;
        parent = parent.parentNode;
        if(!parent) return;
        parent.remove();
    }

    W3SchoolsRemover.init();

})();
