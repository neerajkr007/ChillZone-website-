const cells = document.querySelectorAll('.cell');
var N = 9;
var K = 30;
var SRN = 3;
var mat = new Array(9);
var notfirsttime = false;
for (var i = 0; i < mat.length; i++) { 
    mat[i] = new Array(9); 
} 
function fillValues() 
    { 
        // Fill the diagonal of SRN x SRN matrices 
        fillDiagonal(); 
  
        // Fill remaining blocks 
        fillRemaining(0, SRN);
  
        // Remove Randomly K digits to make game 
        removeKDigits(); 
    } 
  
    // Fill the diagonal SRN number of SRN x SRN matrices 
function fillDiagonal() 
    { 
  
        for (var i = 0; i<N; i=i+SRN) 
  
            // for diagonal box, start coordinates->i==j 
            fillBox(i, i); 
    } 


  
    // Fill a 3 x 3 matrix. 
function fillBox(row,col) 
    { 
        var num; 
        for (var i=0; i<SRN; i++) 
        { 
            for (var j=0; j<SRN; j++) 
            { 
                do
                { 
                    num = randomGenerator(N); 
                } 
                while (!unUsedInBox(row, col, num)); 
  
                mat[row+i][col+j] = num; 

            } 
        }
        //console.log(mat); 
    } 

function unUsedInBox(rowStart, colStart, num) 
    { 
        for (var i = 0; i<SRN; i++) 
            for (var j = 0; j<SRN; j++) 
                if (mat[rowStart+i][colStart+j]==num) 
                    return false; 
        return true; 
    } 
///BE AWARE OF BRACKETS
function randomGenerator(num) 
    { 
        return Math.floor((Math.random()*num+1)); 
    } 
  
    // Check if safe to put in cell 
function CheckIfSafe( i, j, num) 
    { 
        return (unUsedInRow(i, num) && 
                unUsedInCol(j, num) && 
                unUsedInBox(i-i%SRN, j-j%SRN, num)); 
    } 
  
    // check in the row for existence 
function unUsedInRow(i, num) 
    { 
        for (var j = 0; j<N; j++) 
           if (mat[i][j] == num) 
                return false; 
        return true; 
    } 
  
    // check in the row for existence 
function unUsedInCol( j, num) 
    { 
        for ( var i = 0; i<N; i++) 
            if (mat[i][j] == num) 
                return false; 
        return true; 
    } 

function fillRemaining(i,j) //0,3
    {//  System.out.println(i+" "+j); 
        if (j>=N && i<N-1) 
        { 
            i = i + 1; 
            j = 0; 
        } 
        if (i>=N && j>=N) 
            return true; 
  
        if (i < SRN) 
        { 
            if (j < SRN) 
                j = SRN; 
        } 
        else if (i < N-SRN) 
        { 
            if (j==Math.floor(i/SRN)*SRN) 
                j =  j + SRN; 
        } 
        else
        { 
            if (j == N-SRN) 
            { 
                i = i + 1; 
                j = 0; 
                if (i>=N) 
                    return true; 
            } 
        } 
  
        for (var num = 1; num<=N; num++) 
        { 
            if (CheckIfSafe(i, j, num)) 
            { 
                mat[i][j] = num; 
                if (fillRemaining(i, j+1)) 
                    return true; 
  
                mat[i][j] = 0; 
            } 
        } 
        return false; 
    } 

  
    // Remove the K no. of digits to 
    // complete game 
function removeKDigits() 
    { 
        var count = K; 
        while (count != 0) 
        { 
            var cellId = randomGenerator((N*N)); 
  
            // System.out.println(cellId); 
            // extract coordinates i  and j 
            var i = Math.floor(cellId/N);
            var j = cellId%9; 
            if (j != 0) {
                j = j - 1; 
            }
  
            // System.out.println(i+" "+j); 
            if (i==9) {
                	
            if (mat[i-1][j] != 0) 
            { 
                count--; 
                mat[i-1][j] = "";
            } }
            else{
            	if (mat[i][j] != 0) 
            { 
                count--; 
                mat[i][j] = "";
            } 
            }
        } 
    } 
				


function startGame(){
	if(notfirsttime){
			for (var i = 0; i < 9; i++) 
			{
				for(var j = 0; j<9; j++)
				{
					//if(mat[i][j]==null){
						//document.getElementById(i*9 + j + 1).innerText = 0;
					//}
					//else{
						mat[i][j] = null;
					//}
				}
			}
		}
	fillValues();
	for (var i = 0; i < 9; i++) 
	{
		for(var j = 0; j<9; j++)
		{
			//if(mat[i][j]==null){
				//document.getElementById(i*9 + j + 1).innerText = 0;
			//}
			//else{
				document.getElementById(i*9 + j + 1).innerText = mat[i][j];
			//}
		}
	}
	notfirsttime = true;
}

