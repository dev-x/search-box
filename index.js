(function(){

    function SearchBox(data){
        var timeOut = 500;
        var secondaryTimeOut = 3000;
        var input = null;
        var action = null;
        var secondaryAction = null;
        var minLength = 2;
        
        var timer;
        var secondaryTimer;

        var oldValue = '';
        
        function fireAction(type){
            var currentAction;
            if (type == 'secondary'){
                clearInterval(secondaryTimer);
                currentAction = secondaryAction;
            } else {
                clearInterval(timer);
                currentAction = action;
            }
            if (typeof currentAction == 'function' 
                && input 
                && typeof input.value == 'string' 
                && input.value.length >= minLength) {
                    console.log(oldValue)
                    if (oldValue != input.value){
                        currentAction();
                    }
            }
        }
        
        function inputKeyDown(e) {
            if (!timer){
                oldValue = e.target.value;
            }
        }
        function inputKeyUp(e) {
            if (!timer){
                timer = setInterval(fireAction.bind(null, 'main'), timeOut);
            } else {
                clearInterval(timer);
                timer = setInterval(fireAction.bind(null, 'main'), timeOut);
            }
            if (!secondaryTimer){
                secondaryTimer = setInterval(fireAction.bind(null, 'secondary'), secondaryTimeOut);
            } else {
                clearInterval(secondaryTimer);
                secondaryTimer = setInterval(fireAction.bind(null, 'secondary'), secondaryTimeOut);
            }
        }
    
        this.init = function (data) {
            
            if (data.timeOut){
                timeOut = data.timeOut;
            }

            if (data.secondaryTimeOut){
                timeOut = data.secondaryTimeOut;
            }
            
            if (data.minLength){
                minLength = data.minLength;
            }
            
            if (data.inputId){
                input = document.getElementById(data.inputId);
            }

            if (data.input){
                input = data.input;
            }
            
            if (input){
                input.addEventListener('keyup', inputKeyUp, true);
                input.addEventListener('keydown', inputKeyDown, true);
            }
            
            if (data.action){
                action = data.action;
            }
            
            if (data.secondaryAction){
                secondaryAction = data.secondaryAction;
            }
            
        }
        
        this.init(data);
        
    }
    
    var root = this;
    var previous_mymodule = root.SearchBox;
    
    if( typeof exports !== 'undefined' ) {
        if( typeof module !== 'undefined' && module.exports ) {
          exports = module.exports = SearchBox
        }
        exports.SearchBox = SearchBox
    } else {
        root.SearchBox = SearchBox
    }
    

})(this);