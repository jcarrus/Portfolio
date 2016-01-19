function mouseover(el){
    if (!el.classList.contains('hidden')){
	el.classList.add('mouseon');
    }
}

function mouseout(el){
    if (!el.classList.contains('hidden')){
	el.classList.remove('mouseon');
    }
}

var transitioning = 0;

function goto(id){
    // don't do anything if we are mid transition
    if (transitioning > 0) return;

    // don't do anything if we are on main and going to main
    if (id == 'main' && document.getElementsByClassName('tile')[0]
	.classList.contains('shown')) return;
    
    // hide all shown elements
    var tohide = document.getElementsByClassName('shown');
    while (tohide.length > 0){
	hide(tohide[0]);
    }
    
    if (id == 'main'){
	// show the tiles
	var tiles = document.getElementsByClassName('tile');
	for (var i = 0; i < tiles.length; i++){
	    show(tiles[i]);
	}
    } else {
	// show the detailed information page
	show(document.getElementById(id));
    }
}

function show(el){
    transitioning++;
    el.classList.remove('noDisplay');
    el.classList.add('shown');
    setTimeout(function(){
	el.classList.remove('hidden');
	transitioning--;
    }, 10);
}

function hide(el){
    transitioning++;
    el.classList.remove('shown', 'mouseon');
    el.classList.add('hidden');
    setTimeout(function(){
	el.classList.add('noDisplay');
	transitioning--;
    }, 300);
}
