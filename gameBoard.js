var gameBoard = [ [ 0, 0, 0, 0 ],
				  [ 0, 0, 0, 0 ],
				  [ 0, 0, 0, 0 ],
				  [ 0, 0, 0, 0 ] ];

function printBoard( board ) {
	var strBoard = "";
	for ( var i = 0; i < board.length; i++ ) {
		strBoard = "";
		for ( var j = 0; j < board[ i ].length; j++ ) {
			strBoard +=  board[ i ][ j ] + " ";
		}
		console.log( strBoard );
	}
}

function randomAddTopBottom( board, row ) {
    board[ row ][ Math.floor( Math.random() * 4 ) ] = 2;
    return board;
}

function randomAddLeftRight( board, col ) {
	board[ Math.floor( Math.random() * 4 ) ][ col ] = 2;
	return board;
}


function numberZeroOrThree() {
   return ( ( Math.floor( Math.random() * 100 ) > 50 ) ? 3 : 0 );
}