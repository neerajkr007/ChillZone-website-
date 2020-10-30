const cells = document.querySelectorAll('.cell');
var N = 9;
var K = 30;
var SRN = 3;
var mat = new Array(9);
var notfirsttime = false;
for (var i = 0; i < mat.length; i++) { 
    mat[i] = new Array(9); 
} 


var deletedElements = new Array(K);
var deletedPosi = new Array(K);


for (var i = 0; i < deletedPosi.length; i++) {
	deletedPosi[i] = new Array(2);
}


function fillValues() 
    { 
        fillDiagonal(); 
        fillRemaining(0, SRN);
        removeKDigits(); 
    } 


function fillDiagonal() 
    { 
  
        for (var i = 0; i<N; i=i+SRN) 
            fillBox(i, i); 
    } 


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


//BE AWARE OF BRACKETS
function randomGenerator(num) 
    { 
        return Math.floor((Math.random()*num+1)); 
    } 
  
    
function CheckIfSafe( i, j, num) 
    { 
        return (unUsedInRow(i, num) && 
                unUsedInCol(j, num) && 
                unUsedInBox(i-i%SRN, j-j%SRN, num)); 
    } 


function unUsedInRow(i, num) 
    { 
        for (var j = 0; j<N; j++) 
           if (mat[i][j] == num) 
                return false; 
        return true; 
    } 
  

function unUsedInCol( j, num) 
    { 
        for ( var i = 0; i<N; i++) 
            if (mat[i][j] == num) 
                return false; 
        return true; 
    } 


function fillRemaining(i,j)
    {
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
        //console.log(mat);
        return false; 
    } 


function removeKDigits() 
    { 
        var count = K; 
        while (count != 0) 
        { 
            var cellId = randomGenerator((N*N)); 
            var i = Math.floor(cellId/N);
            var j = cellId%9; 
            if (j != 0) {
                j = j - 1; 
            }
            if (i==9) {
                	
            if (mat[i-1][j] != 0) 
            { 
            	deletedPosi[K-count][0] = i-1;
            	deletedPosi[K-count][1] = j;
            	deletedElements[K-count] = mat[i-1][j];
                count--;
                mat[i-1][j] = "";
            } }
            else{
            	if (mat[i][j] != 0) 
            { 
            	deletedPosi[K-count][0] = i;
            	deletedPosi[K-count][1] = j;
            	deletedElements[K-count] = mat[i][j];
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
                    mat[i][j] = null;
                    document.getElementById(i*9 + j + 1).style.background = "none";
				}
			}
		}
		else{
			document.getElementById("restartButton").innerText = "New Game";
		}
		fillValues();
		//console.log(deletedPosi);
		//console.log(deletedElements);
		for (var i = 0; i < 9; i++) 
		{
			for(var j = 0; j<9; j++)
			{
				document.getElementById(i*9 + j + 1).innerText = mat[i][j];
			}
		}
		makeusable();
		notfirsttime = true;
}



function makeusable()
{
    var m;
    var n;
    //console.log(deletedPosi.length);
	for(var i = 0; i < deletedPosi.length; i++){
        var input = document.createElement("input");
        input.type = "number";
        input.maxLength = 1;
        input.oninput="this.value=this.value.slice(0,this.maxLength)"
        input.max = "9";
        input.min = "1";
        m = deletedPosi[i][0];
        n = deletedPosi[i][1];
        //console.log(m,n);
        //console.log(input.maxLength);
        document.getElementById(m*9 + n + 1).appendChild(input);
    }
    document.getElementById("start").style.display = "none";
    document.getElementById("check").style.display = "flex";
    document.getElementById("restartButton").style.display = "flex";

}


function check()
{
    for(var i = 1; i<=81;i++)
    {
        
        //console.log(document.getElementById(1).childNodes);
        //console.log(document.getElementById(2).childElementCount);
        try {
            document.getElementById(i).onblur(document.getElementById(i).nodeValue = document.getElementById(i).nodeValue/(Math.pow(10, (document.getElementById(i).nodeValue.length))));
          }
          catch(err) {
              if(err == "TypeError: Cannot read property 'length' of null")
                    alert("please fill the full table");
                    break;
          }
    }
    var m;
    var n;
    for(var i = 0; i<deletedElements.length; i++)
    {
        m = deletedPosi[i][0];
        n = deletedPosi[i][1];
        //console.log(document.getElementById(m*9 + n + 1).firstChild.nodeValue);
        if(document.getElementById(m*9 + n + 1).firstChild.value != deletedElements[i]){
            document.getElementById(m*9 + n + 1).style.background = "red";
        }
    }
}