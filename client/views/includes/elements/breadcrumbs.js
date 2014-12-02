Template.breadcrumbs.helpers({
    intermediateRoutes:function(){
        if(!Router.current()){
            return;
        }
        // get rid of both the first item which is always assumed to be "home",
        // and the last item which we won't display as a link
        var routes=Router.parentRoutes().slice(1,-1);
        return _.map(routes,function(route){
            // extract name and label properties from the route
            return {
                name:route.getName(),
                label:route.options.label
            };
        });
    },
    currentRouteLabel:function(){
        // return the label property from the current route options
        return Router.current() && Router.current().route.options.label;
    }
});