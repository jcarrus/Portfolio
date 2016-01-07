function mouseover(el){
    if (!el.classList.contains("hidden")){
	el.classList.add('mouseon');
    }
}

function mouseout(el){
    if (!el.classList.contains("hidden")){
	el.classList.remove('mouseon');
    }
}

var transitioning = false;
function showInfo(el){
    // don't do anything if we are mid transition
    if (transitioning) return;

    // set the transitioning flag
    transitioning = true;
    
    // get the tiles and make hidden
    var tiles = document.getElementsByClassName("tile");
    for (var i = 0; i < tiles.length; i++){
	tiles[i].classList.remove("mouseon");
	tiles[i].classList.add("hidden");
    }

    // remove tiles after transition
    setTimeout(function(){
	for (var i = 0; i < tiles.length; i++){
	    tiles[i].classList.add("noDisplay");
	}
	// reset the transitioning flag
	transitioning = false;
    }, 300);
    
    // show the detailed information page
    el.parentElement.getElementsByClassName("info")[0].classList.remove("noDisplay");
    setTimeout(function(){
	el.parentElement.getElementsByClassName("info")[0].classList.remove("hidden");
    }, 10);
}

function hideInfo(el){
    transitioning = true;
    
    // hide the detailed information page
    el.parentElement.classList.add("hidden");
    setTimeout(function(){
	el.parentElement.classList.add("noDisplay");
	transitioning = false;
    }, 300);

    // show the tiles
    var tiles = document.getElementsByClassName("tile");
    for (var i = 0; i < tiles.length; i++){
	tiles[i].classList.remove("noDisplay");
    }
    setTimeout(function(){
	for (var i = 0; i < tiles.length; i++){
	    tiles[i].classList.remove("hidden");
	}}, 10);
}
