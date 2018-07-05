var generator = (function(){
    var module = {};
    
    module.generateNList = function (array, code, injector){
        // Makes sure the passed array is not mutated
        array = array.slice(0);
        let result = [array.slice(0)];

        let handler = {
            get: function(target, property) {
                return target[property];
            },
            set: function(target, key, value){
                target[key] = value;
                if (key !== "length") result.push(target.slice(0));
                return true;
            },
            deleteProperty: function(target, property) {
                let res = delete target[property];
                
                // I'm just gonna set the length here for the slice that is being pushed
                // if there is a better alternative we can implement that later
                let array = target.slice(0);
                array["length"] = array.length ? array.length - 1 : 0;

                result.push(array);
                return res;
            }
        };
        // eslint-disable-next-line
        let arrayProxy = new Proxy(array, handler);
        
        // eslint-disable-next-line
        eval(code + ";" + injector+"(arrayProxy);");

        return result.slice(0);
    }
    
    return module;
})();

export default generator;
