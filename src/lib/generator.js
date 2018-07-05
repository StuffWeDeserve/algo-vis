var generator = (function(){
    "use strict";
    
    var module = {};
    
    module.generateNList = function (array, code, injector){
        var result = [array.slice(0)];

        let handler = {
            get: function(target, property) {
                return target[property];
            },
            set: function(target, key, value){
                target[key] = value;
                console.log(parseInt(key));
                if (key != "length") result.push(target.slice(0));
                return true;
            },
            deleteProperty: function(target, property) {
                var res = delete target[property];
                result.push(target.slice(0));
                return res;
            }
        };
        
        var arrayProxy = new Proxy(array, handler);
        eval(code + injector+"(arrayProxy);");

        return result.slice(0);
    }
    
    return module;
})();

export default generator;
