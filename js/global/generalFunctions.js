function getSingleValue(key, fn){
    chrome.storage.local.get(key, function(e) {
        if(JSON.stringify(e) == JSON.stringify({})){
            fn(null);
            return;
        }
        try {
            e[key]=JSON.parse(e[key]);
        }
        catch(err) {

        }
        fn(e[key]);
    });
}
function setSingleValue(key, value, fn){
    //console.log("user value", value);
    try {
        value=JSON.stringify(value);
        //console.log("parsed as", value);
    }
    catch(err) {
        //console.log("parsing error");
    }
    var obj = {};
    obj[key] = value;
    //console.log("final object to store", obj);
    chrome.storage.local.set(obj, function() {
        fn();
    });
}