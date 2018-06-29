var generator = (function(){
    "use strict";
    
    var module = {};
    
    module.generateNList = function (array, code, injector){
        var result = [];

        let handler = {
            get: function(target, property) {
                return target[property];
            },
            set: function(target, key, value){
                target[key] = value;
                result.push(target.slice(0));
                return true;
            }
        };
        
        var arrayProxy = new Proxy(array, handler);
        eval(code + injector+"(arrayProxy);");
        return result;
    }
    
    return module;
})();
