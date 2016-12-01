(function() {
    
    var W3SchoolsRemover = {
        constants: {
            queries: {
                result_links: 'div.g .r > a[href*="www.w3schools.com"]', 
                results_node: 'rcnt', 
                main_google_node: 'main'
            }, 
            console: {
                removed: 'W3Schools links were removed from this search.'
            }, 
            search_location: '/search', 
            observerConfig: { childList: true, subtree: true }
        }, 
        init: function() {
            /* avoiding google new tab page and other variations */
            if(window.location.pathname !== this.constants.search_location) return;
            this.remove();
            this.createResultsObserver();
        }, 
        getAllW3Links: function() {
            return document.querySelectorAll(this.constants.queries.result_links);
        }, 
        remove: function() {
            var links = this.getAllW3Links();
            if(!links.length) return;
            console.info(links.length + ' ' + this.constants.console.removed);
            links.forEach(deleteOldGrandpaNode);
        }, 
        createResultsObserver: function() {
            var mainGoogleNode = document.getElementById(this.constants.queries.main_google_node);
            if(!mainGoogleNode) return;
            this.resultsObserver = new MutationObserver(this.remove.bind(this));
            this.resultsObserver.observe(mainGoogleNode, this.constants.observerConfig);
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
