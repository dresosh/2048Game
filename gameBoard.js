var boxArray = [ 
			[ 0, 0, 0, 0 ],
			[ 0, 0, 0, 0 ],
			[ 0, 0, 0, 0 ],
			[ 0, 0, 0, 0 ]
		   ];

var lastBoxArray = [];
var player = true;

var player1 = 0;
var player2 = 0;

var boxes = document.querySelectorAll( ".number" );
var hText = document.querySelectorAll( ".tileNumber");
var player1Div = document.getElementById( "player1" );
var player2Div = document.getElementById( "player2" );

//SHORTCUT PRINT FUNCTION
function p( word ) {
	console.log( word );
}

//PRINTS ARRAYS TO CONSOLE FOR TROUBLESHOOTING
function printArray( array ) {
	for ( var row = 0; row < array.length; row++ ) {
		if( array.hasOwnProperty(row) ){
			p( array[ row ] );
		}
	}
}

//KEEPS TRACK OF ZEROES ON BOARD
function getZeroes( array ) {
	zeroes = [];
	for ( var row = 0; row < array.length; row++ ) {
		for ( var col = 0; col < boxArray[ row ].length; col++ ) {
			if ( array[ row ][ col ] === 0 ) {
				zeroes.push( [ row, col ] );
			}
		}
	}

	return zeroes;
}

//MAKE A COPY OF AN ARRAY FOR USEAGE
function copyArray( array ) {
	var copyArray = [];
	for (var i = 0; i < array.length; i++) {
    	copyArray[i] = array[i].slice();
    }
    return copyArray;
}

//CHECK FOR IF TILES ARE EQUAL FOR MERGING
function areEqual( arrOne, arrTwo ) {
	for ( var row = 0; row < arrOne.length; row++ ) {
		for ( var col = 0; col < arrOne[ row ].length; col++ ) {
			if ( arrOne[ row ][ col ] !== arrTwo[ row ][ col ] ) {
				return false;
			}
		}
	}

	return true;
}

//USING THE ZEROES LIST, ADDS A RANDOM NEW TILE
function addRandom() {
	arry = getZeroes( boxArray );
	randPlace = arry[ Math.floor( Math.random() * arry.length ) ];
	boxArray[ randPlace[ 0 ] ][ randPlace[ 1 ] ] = 2;
}

//CHECK FOR WINNER
function isWin() {
	if ( player1 >= 2567241678 ) {
		alert( "Player 1 you're really bored!" );
	} else if ( player2 >= 2567241678 ) {
		alert( "Holy crap, dude when did you last go outside?" );
	}
}

//ANYTIME A MERGE OCCURS ADD TO CURRENT PLAYER'S SCORE
function addPlayerScore( num ) {
	if ( player ) {
		player1 += num;
	} else {
		player2 += num;
	}
}

//MOVE TILES TO LEFT AND MERGE
function leftMove( arrayLeft ) {
	var cnt = 0;
	for ( var row = 0; row < arrayLeft.length; row++ ) {
		//Checks rows for zeroes and moves them to end of row.
		cnt = 0;
		for ( var col = 0; col < arrayLeft[ row ].length; col++ ) {
			//If box at location is a zero and you haven't checked the same place more than 4 times
			if ( arrayLeft[ row ][ col ] === 0 && cnt < 5 ) {
				arrayLeft[ row ].splice( col, 1 );
				arrayLeft[ row ].push( 0 );
				col--;
				cnt++;
			} else {
				cnt = 0;
			}
		}


		//Cycle through each col to see if adds can happen.
		for ( var col = 0; col < arrayLeft[ row ].length; col++ ) {
			//If box at next col is equal to current and col + isn't out of range of array and box at col isn't 0.
			if ( ( col + 1 < arrayLeft.length ) && ( arrayLeft[ row ][ col ] === arrayLeft[ row ][ col + 1 ] ) && ( arrayLeft[ row ][ col ] !== 0 ) ) {
				arrayLeft[ row ][ col ] *= 2;
				addPlayerScore( arrayLeft[ row ][ col ] );
				isWin();
				arrayLeft[ row ].splice( col + 1, 1 );
				arrayLeft[ row ].push( 0 );
			}
		}
	}

	return arrayLeft;
}

//MOVE TILES TO RIGHT AND MERGE
function rightMove( arrayRight ) {
	var cnt = 0;
	for ( var row = 0; row < arrayRight.length; row++ ) {
		//Checks rows for zeroes and moves them to end of row.
		cnt = 0;
		for ( var col = arrayRight[ row ].length - 1 ; col >= 0; col-- ) {
			//p("column = " + col );
			//If box at location is a zero and you haven't checked the same place more than 4 times
			//p( "Outside rightMove zeroes check if, row = " + row + " col = " + col + "cnt = " + cnt );
			if ( arrayRight[ row ][ col ] === 0 && cnt < 5 ) {
				arrayRight[ row ].splice( col, 1 );
				arrayRight[ row ].unshift( 0 );
				col++;
				cnt++;
			} else {
				cnt = 0;
			}
		}
		//Cycle through each col to see if adds can happen.
		for ( var col = arrayRight[ row ].length; col >= 0; col-- ) {
			//If box at next col is equal to current and col + isn't out of range of array and box at col isn't 0.
			if ( ( col - 1 >= 0 ) && ( arrayRight[ row ][ col ] === arrayRight[ row ][ col - 1 ] ) && ( arrayRight[ row ][ col ] !== 0 ) ) {
				arrayRight[ row ][ col ] *= 2;
				addPlayerScore( arrayRight[ row ][ col ] );
				arrayRight[ row ].splice( col - 1, 1 );
				arrayRight[ row ].unshift( 0 );
			}
		}
	}

	return arrayRight;
}

//ROTATE ARRAY COUNTERCLOCKWISE
function rotate( rotateArray ) {

	var tempArray = copyArray( rotateArray );

	for ( var rotateRow = 0, tempCol = 0; rotateRow < rotateArray.length; rotateRow++, tempCol++ ) {
		for ( var rotateCol = 0, tempRow = tempArray.length - 1; rotateCol < rotateArray[ rotateRow ].length; rotateCol++, tempRow-- ) {
			//p( "rotate = " + rotateArray[ rotateRow ][ rotateCol ] );
			tempArray[ tempRow ][ tempCol ] = rotateArray[ rotateRow ][ rotateCol ];
			//p( " temp = " + tempArray[ tempRow ][ tempCol ] );
		}
	}
	return tempArray;
}

//ROTATE ARRAY CLOCKWISE
function unRotate( unRotateArray ) {
	var tempArray = copyArray( unRotateArray );

	for ( var tempRow = 0, unRotateCol = 0; tempRow < tempArray.length; tempRow++, unRotateCol++ ) {
		for ( var tempCol = 0, unRotateRow = unRotateArray.length - 1; tempCol < tempArray[ tempRow ].length; tempCol++, unRotateRow-- ) {
			tempArray[ tempRow ][ tempCol ] = unRotateArray[ unRotateRow ][ unRotateCol ];
			//p( "temp[ Row ][ Col ] = [ " + tempRow + " ][ " + tempCol + " ]  Unrotate = [ " + unRotateRow + " ][ " + unRotateCol + " ]");
		
		}
	}
	return tempArray;
}

//REFRESH THE DIVS ON PAGE TO EMULATE CURRENT BOXARRAY AND PLAYER SCORES
function setDivs() {
	var cnt = 0;
	for ( var row = 0; row < boxArray.length; row++ ) {
		for ( var col = 0; col < boxArray.length; col++ ) {
			if ( boxArray[ row ][ col ] === 0 ) {
				boxes[ cnt ].className = "number";
				cnt++;
			} else {
				boxes[ cnt ].className = "number tile";
				hText[ cnt ].innerText = boxArray[ row ][ col ];
				cnt++;
			}
		}
	}

	printArray( boxArray );

	player1Div.innerText = player1;
	player2Div.innerText = player2;
}

//UNDO ONE MOVE FOR USE IN TROUBLESHOOTING
function undo() {
	boxArray = copyArray( lastBoxArray );
	setDivs();
}

//PLAYER 1 CONTROL SWITCH
function arrows( keyNum ) {
	
	lastBoxArray = copyArray( boxArray );

	switch( keyNum ) {
		case 38 :
			//p( "move up hasn't been made yet" );
			//printBox();
			boxArray = rotate( boxArray );
			boxArray = leftMove( boxArray );
			//printArray( boxArray );
			boxArray = unRotate( boxArray );
			// printArray( boxArray );
			break;
		case 37 :
			//p( "move left hasn't been made yet" );
			boxArray = leftMove( boxArray );
			// printArray( boxArray );
			break;
		case 40 :
			boxArray = rotate( boxArray );
			boxArray = rightMove( boxArray );
			boxArray = unRotate( boxArray );
			// printArray( boxArray );
			break;
		case 39 :
			//p( "move right hasn't been made yet" );
			boxArray = rightMove( boxArray );
			// printArray( boxArray );
			break;
		default : 
			p( "Invalide key input...I think" );

	}
	
	if ( !areEqual( boxArray, lastBoxArray ) ) {
		player = !player;
		setTimeout( addRandom(), 5000);
		setDivs();
	}

	p("player1 = " + player1);
}

//PLAYER 2 CONTROLS
function letters( keyNum ) {
	
	lastBoxArray = copyArray( boxArray );

	switch( keyNum ) {
		case 87 :
			boxArray = rotate( boxArray );
			boxArray = leftMove( boxArray );
			boxArray = unRotate( boxArray );
			break;
		case 65 :
			boxArray = leftMove( boxArray );
			break;
		case 83 :
			boxArray = rotate( boxArray );
			boxArray = rightMove( boxArray );
			boxArray = unRotate( boxArray );
			break;
		case 68 :
			boxArray = rightMove( boxArray );
			break;
		default : 
			p( "Invalide key input...I think" );
	}

	if ( !areEqual( boxArray, lastBoxArray ) ) {
		player = !player;
		setTimeout( addRandom(), 5000);
		setDivs();
	}

	p("player2 = " + player2);
}

//LOAD GAME
addRandom();
addRandom();
setDivs();

//GET KEY INPUTS
document.addEventListener( "keydown", function( key ) {
	//console.log( this );
	console.log( key.keyCode )
	//player ? arrows( key.keyCode ) : letters( key.keyCode );
	player ? arrows( key.keyCode ) : letters( key.keyCode );
	//arrows( key.keyCode );
})