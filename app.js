"use strict";
  
var app = new Vue({
    mounted(){
        
        let container = document.querySelector('.container');
        
        if (!window.DeviceOrientationEvent) {
            alert('device orientation not supported');
         } else {
           
            window.addEventListener('deviceorientation', function(event) {
                let scrollTop = container.scrollTop;
                if(!app.$data.isTouched){
                // scroll goes to bottom when beta more than 30
                   container.scroll(0, (event.beta-30) + scrollTop);
                   
                }
              
            });
         }
        
        

            
    },
    el: "#app",
    data: {
        isTouched: false,
    },
    methods: {
        clearAllIntervals: function(){
            for(let i=0; i< 9999; i++){
                window.clearInterval(i);
            }
        },
        animate: function(side){
            let container = document.querySelector('.container');
            let scrollTop = container.scrollTop;
            let clientHeight = container.clientHeight;
            let scrollHeight = container.scrollHeight;
            if(side == "top"){
                this.clearAllIntervals();
                let i=0;
                
                setInterval(() => {
                    container.scroll(0, scrollTop-i);
                    i+=2;
                  
                }, 1);
                if(scrollTop <= 0){
                    this.clearAllIntervals();  
                }
            }
            else if(side == "bottom"){
                this.clearAllIntervals();
                let i=0;
                
                setInterval(() => {
                    container.scroll(0, scrollTop+i);
                    i+=2;
                
                }, 1);

                if(scrollTop + clientHeight+30 >= scrollHeight){
                    this.clearAllIntervals();
                    console.log(true);
                }
            }
            else {
                this.clearAllIntervals();
            }
            
           
          
        },
        mouseMove: function(e){
            let container = document.querySelector('.container')
            let height = document.querySelector('.container').clientHeight
            let rect = e.currentTarget.getBoundingClientRect();
            let offsetY = e.clientY - rect.top;
            if(offsetY <= height/3){
                this.animate('top');
            }
            else if(offsetY >= height/1.5){
                this.animate('bottom');
            }
            else {
                this.animate('stop');
            }
        
        
        },
        mouseLeave: function(){
            this.clearAllIntervals();
        },
        touchStart: function(){
            this.isTouched = true;
            
        },
        touchEnd: function(){
            this.isTouched = false;
            
        }
    }
});