function cat() {
    this.cat = document.querySelector('.cat');
    this.cat.style.left = "90%";
    this.cat.style.top = "89%";

    this.catStat = document.createElement('div');
    this.catStat.classList.add('dashcat');
    this.cat.appendChild(this.catStat);
    console.log(this.cat);

    this.direction;

    this.init();
    this.runningState = false;
    this.xPos = 95;
    this.rafID;
}

cat.prototype = {
    constructor: cat,
    init : function() {
        const self = this;

        window.addEventListener('keydown', function(e) {
            if (self.runningState) return;
            if (e.keyCode == 37) {
                if (self.catStat.classList.contains('backcat')){
                    self.catStat.classList.remove('backcat');
                }
                    
                self.catStat.classList.remove('stopcat');
                self.catStat.classList.add('standcat');
                setTimeout(function() {
                    cancelAnimationFrame(self.rafID)
                    self.catStat.classList.remove('standcat');
                    self.catStat.classList.add('movecat');
                    self.run(self);
                    
                }, 700);

                self.direction = 'left';
                self.catStat.setAttribute('runningstate', 'true');
                self.runningState = true;
                
            }
            if (e.keyCode == 39) {
                self.catStat.classList.add('backcat');
                self.catStat.classList.remove('stopcat');
                self.catStat.classList.add('standcat');

                setTimeout(function() {
                    cancelAnimationFrame(self.rafID)
                    self.catStat.classList.remove('standcat');
                    self.catStat.classList.add('movecat');
                    self.run(self);
                    console.log("1")
                }, 700);

                self.direction = 'right';
                self.catStat.setAttribute('runningstate', 'true');
                // self.catStat.setAttribute('data-direction', 'right');
                self.runningState = true;
                console.log("runningState")

            }
            // 시프트
            if(e.keycode == 16){
                if(self.catStat.classList.contains('movecat')){
                    self.catStat.classList.remove('movecat');
                    self.catStat.classList.add('dashcat');
                }
            }
        })

        window.addEventListener('keyup', function(e) {
            if(e.keycode == 16){
                self.catStat.classList.remove('dashcat');
                self.catStat.classList.add('movecat');
            }
            if(self.catStat.classList.contains('movecat')){
                self.catStat.classList.remove('movecat');
            }
            
            self.catStat.classList.add('stopcat');
            self.catStat.setAttribute('runningstate', 'false');
            cancelAnimationFrame(self.rafID)
            self.runningState = false;
        });
    },
    run : function(self) {
        if(self.runningState == true){
            if(self.direction == 'left') {
                self.xPos -= 0.08;
            } else if (self.direction == 'right'){
                self.xPos += 0.08;
            }
            console.log(self.xPos);
            // if(self.xPos < 2) {
            //     self.xPos = 2;
            // }
    
            // if(self.xPos > 88) {
            //     self.xPos = 88;
            // }
            self.cat.style.left = self.xPos + '%';
    
            self.rafID = requestAnimationFrame(function() {
                self.run(self);
            });
        }
    }
}
//     //멈추게하기
//     const stopHandler = useCallback((e) => {
//         setChangeMove(false);
//         let cat = e.target;
//         cat.style.pointerEvents = 'none';
//         cat.classList.remove('movecat');
//         cat.classList.add('stopcat');
//         setTimeout(() => {
//             cat.style.pointerEvents = 'auto';
//         }, 700);
//         console.log(e.target);

//     });
//     //움직이게 하기
//     const moveHandler = useCallback((e) => {
        
//         let cat = e.target;
//         cat.style.pointerEvents = 'none';
//         cat.classList.remove('stopcat');
//         cat.classList.add('standcat');

//         setTimeout(() => {
//             cat.classList.remove('standcat');
//             cat.classList.add('movecat');
//             setChangeMove(true);
//             cat.style.pointerEvents = 'auto';
//             console.log(e.target);
//         }, 700);
        
//     });
// };
