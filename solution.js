{ 
    init: function(elevators, floors) {
        for (var floornumber = 0; floornumber < floors.length;floornumber++){

            floors[floornumber].on("up_button_pressed", function() {
                var elevator = elevators[0];
                var queue = elevator.destinationQueue.length;

                for (var i = 0 ; i < elevators.length; i++){
                    //looking for most suitable elevators (least busy)
                    if (isNaN(elevators[i].destinationQueue.length) || elevators[i].destinationQueue.length < queue){
                        elevator = elevators[i];
                        queue = elevators[i].destinationQueue.length;
                    }   
                }

                elevator.goToFloor(this.floorNum());
            });

            floors[floornumber].on("down_button_pressed", function() {
                var elevator = elevators[0];
                var queue = elevator.destinationQueue.length;

                for (var i = 0 ; i < elevators.length; i++){
                    //looking for the most suitable elevator (least busy)
                    if (isNaN(elevators[i].destinationQueue.length) ||elevators[i].destinationQueue.length < queue){
                        elevator = elevators[i];
                        queue = elevators[i].destinationQueue.length;
                    }   
                }

                elevator.goToFloor(this.floorNum());
            });        

        }

        for (var elevatornumber = 0; elevatornumber < elevators.length;elevatornumber++){
            //append the destination floor
            elevators[elevatornumber].on("floor_button_pressed", function(floorNum) {
                if (this.destinationQueue.indexOf(floorNum)<0)
                    this.goToFloor(floorNum);
            });
            //stop when passing by
            elevators[elevatornumber].on("passing_floor", function(floorNum, direction) { 
                if (this.destinationQueue.indexOf(floorNum)>0)
                    this.goToFloor(floorNum, true)
                    });
            //making sure there are not any unused stop
            elevators[elevatornumber].on("stopped_at_floor", function(floorNum) {
                for(var i = this.destinationQueue.length - 1; i >= 0; i--) {
                    if(this.destinationQueue[i] === floorNum) {
                        this.destinationQueue.splice(i, 1);
                    }
                }
            })
        }

    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here //
        }
}

