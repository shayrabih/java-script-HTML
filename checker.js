<html>
<head>
<script src="http://code.jquery.com/jquery-1.10.2.js"></script>
<script src="http://code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
<style>
#score{
  border: 2px solid gray;
  width: 200px;
  background-color: white;
}
.scoreboard{

width: 300px;
height: 300px;
float: left;
font-size: 180%;
margin-left: 50px;
padding: 5px;

}
#firstline{
text-align: center;
font-size: 200%
color: #755752;
font-weight: bolder;
}
.secondrow1{
  left: 50px;
  position: absolute;
  
  }
.secondrow2{
    left:  200px;
    position: absolute;
   
   }
#forthrow{
text-align: center;

}

td {
  width: 70px;
  height: 75px;
  padding: 3px;
  border: 1px solid #000;
}

#container {
  width: 100%; 
}

#board {
 border:  2px solid #333;
  padding: 10px;
  background: #000;
  float: left;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #000;
  font-size: 150%;
  font-weight: bolder;
}
</style>
<script>
var humanflag = 1;
var compcanmove = 1;
var humancanmove = 1;
var humaneatcounter = 0 ;
var compeatcounter = 0 ;
var random_computer = 1; // 1 = move left , 2 = move right 
function humanturn()
{
   var origin;
   var x,y,new_x,new_y;
   var element1;
   for (var i = 0 ; i < 7 ; i++)
   {
    for (var j = 0 ; j < 7; j++)
    {
       if (board[i][j] == 1 && (board[i+1][j-1]==0 || board[i+1][j+1]==0))
            {humanflag = 1;}
       else if ((board[i][j] == 1 && board[i+1][j+1]==2 && board[i+2][j+2]==0) ||
                (board[i][j] == 1 && board[i+1][j-1]==2 && board[i+2][j-2]==0))
                {humanflag = 1;}                                                     
  
      }
    }
    if (humanflag == 1)
    {
   //start with drag and drop element
  $('.humansoldier').draggable({containment: 'table',
  start:function(event,ui)
  {//first find origin x & y   
   //take this x & y positions 
   origin=$(this).parent().attr('id'); 
   x=parseInt(origin/10);
   console.log(x);
   y=parseInt(origin%10);
   console.log(y);
 

   },//here we check if the condition to drop is ok
   stop: function(event,ui){
   
if (board[new_x][new_y] == 0 && new_x==x+1 && (new_y == y+1 || new_y == y-1) )//
   {
    //standart move
   element1 = $("#"+x+y).find('img').detach();
   $("#"+new_x+new_y).append(element1);
   $(element1).css('top', '00');
   $(element1).css('left', '00');
   board[new_x][new_y] = 1;
   board[x][y] = 0; 
   console.log(board[x][y]);
   console.log(board[new_x][new_y]);
   humanflag = 0;
   computer_turn();
   } 
   else
   {//revert
    element1 = $("#"+x+y).find('img').detach();
    $("#"+x+y).append(element1);
   $(element1).css('top', '00');
   $(element1).css('left', '00');
   console.log(element1);
  
   }
   // if human eating mov is leagle
   if (board[new_x][new_y]==0  && (board[x+1][y+1]==2||board[x+1][y-1]==2))
   {
    element1 = $("#"+x+y).find('img').detach();
   $(element1).css('top', '00');
   $(element1).css('left', '00');
   $("#"+new_x+new_y).append(element1);
   board[x][y] = 0;
   board[new_x][new_y] = 1
   console.log(element1);
   
   if (board[x+1][y+1]==2)//rigth eationg
   {
     $("#"+(x+1)+(y+1)).find('img').remove();
        board[x+1][y+1]=0;
        humaneatcounter++;
        console.log("human count = " + humaneatcounter);
        $('#humaneat').text(humaneatcounter);
        console.log('human eat right');
        if(humaneatcounter == 12)
          {$('#forthrow').text("human win!!!!!!!!");}
        humanflag = 0;
        computer_turn();
   }
 
  else if(board[x+1][y-1]==2)//left eating
      {
        $("#"+(x+1)+(y-1)).find('img').remove();
        board[x+1][y-1]=0;
        humaneatcounter++;
        console.log("human count = " + humaneatcounter);
        
        console.log('human eat left');

        $('#humaneat').text(humaneatcounter);
        if(humaneatcounter == 12)
          {$('#forthrow').text("human win!!!!!!!!");}
         humanflag = 0 ;
        computer_turn();
      }

      if (humaneatcounter==12)//winning check
        {alert("human win");
         initchekersGame(); //restart game
        }    
    
    else
    {//revert 
   element1 = $("#"+x+y).find('img').detach();
   $(element1).css('top', '00');
   $(element1).css('left', '00');
   $("#"+x+y).append(element1);
   return;
    }  
   humancanmove = 0;
}
   } });
  //make  the drop element
   $('td').droppable({ drop:function(event,ui){
   var destination = $(this).attr('id');//destination = td's id
   new_x = parseInt(destination/10);
   console.log(new_x);
   new_y = parseInt(destination%10); 
   console.log(new_y);

   humanflag = 0;

  }});
  }
else if (humanflag == 0 || compcanmove == 0)
    {alert("teko");}
  else{if (humaneatcounter > compeatcounter)
         {$('#forthrow').text("human win!!!!!!!!");}
      else if (humaneatcounter < compeatcounter)
        {$('#forthrow').text("computer win!!!!!!!!");}
      else
         {$('#forthrow').text("TEKO!!!!!!!!");}

  }
}


function computer_turn()
{ 
  
  var element2;
  var new_i = 0;
  var new_j = 0;
  console.log('computer turn');
 for(var i = 2 ;i <= 6 ;i++)
{
for(var j = 0;j <= 7 ;j++)
{     // if computer is in danger from left

     if(board[i][j] == 2 && board[i-1][j-1]==1 && board[i+1][j+1] == 0)
     {
      // if comuter is in danger from  left and can eat left
        if( board[i-2][j-2] == 0  )
        {
        new_i = i;
        new_j = j;
           compuereatleft(new_i,new_j);
           return;
        }
        // if comuter is in danger from left and can move right
        else if(board[i-1][j+1] == 0)
        {
           new_i = i;
           new_j = j;   
           computer_mov_right(new_i,new_j); 
           return;
        }

     }

     if(board[i][j] == 2 && board[i-1][j+1]==1 && board[i+1][j-1] == 0)
     {   // if computer is in danger from right
       if(board[i-2][j+2] == 0)
        {  // if comuter is in danger from  right and can eat right
        new_i = i;
        new_j = j;
         compuereatright(new_i,new_j);
         return;
      }
      else if(board[i-1][j-1] == 0)
      {  // if comuter is in danger from right and can move left
        new_i = i;
        new_j = j;
       computer_mov_left(new_i,new_j);
       return;
      }
     }
     }
   }
     for(var i = 2 ;i <= 7 ;i++)
      {
         for(var j = 0;j <= 7 ;j++)
         {
    if(board[i][j] == 2 && board[i-1][j+1]==1 && board[i-2][j+2] == 0)
    { //if computer can eat right
        new_i = i;
        new_j = j;
      compuereatright (new_i,new_j);
      return;
    } 
    else if (board[i][j] == 2 && board[i-1][j-1]==1 && board[i-2][j-2] == 0)
    {   //if computer can eat left
        new_i = i;
        new_j = j;
        compuereatleft(new_i,new_j);
        return;
    }
  }
 }


 //if no danger and not can eat , standart move
   for(var i = 7 ;i >= 1 ;i--)
    {
    for(var j = 0;j <= 7 ;j++)
  {
        if (board[i][j] == 2 && board[i-1][j-1]==0  && random_computer == 2 )
    {
        random_computer = 1;
        new_i = i;
        new_j = j;
         computer_mov_left(new_i,new_j) ;
          return;
        
    }
    else  if(board[i][j] == 2 && board[i-1][j+1]==0 && random_computer == 1 )
    {
        random_computer = 2;
        new_i = i;
        new_j = j;
        computer_mov_right(new_i,new_j);
        return;
    } 
  }
   }
   compcanmove = 0;
   if (compcanmove == 0 &&  humaneatcounter == compeatcounter)
    {alert("teko");
      initchekersGame();}
   if(compcanmove == 0  && humaneatcounter > compeatcounter)
  { alert("human win");
     initchekersGame();}
   if(compcanmove == 0 &&humaneatcounter < compeatcounter)
  {alert("computer win");
     initchekersGame();} 
}  
  function compuereatright(new_i,new_j)
         {    // computer right eat
            console.log('eat right');
             element2 = $("#"+new_i+new_j).find('img').detach();
            $("#"+(new_i-2)+(new_j+2)).append(element2);
            $("#"+(new_i-1)+(new_j+1)).find('img').remove();
             board[new_i][new_j] = 0 ;
             board[new_i-1][new_j+1] = 0;
             board[new_i-2][new_j+2] = 2;
             console.log(board[new_i][new_j]);
             console.log(board[new_i-1][new_j+1]);
             console.log(board[new_i-2][new_j+2]);
             compeatcounter++;
             $('#compeat').text(compeatcounter);
             console.log("computer count = " + compeatcounter);
             if (compeatcounter==12)//winning check
             {
                $('#forthrow').text("computer win!!!!!!!!");
               
               location.reaload();
                    initchekersGame(); //restart game
                  }
         
            return;
         }
       function compuereatleft(new_i,new_j)
         {   // computer left eat
            console.log('eat left');
              element2 = $("#"+new_i+new_j).find('img').detach();
            $("#"+(new_i-2)+(new_j-2)).append(element2);
            $("#"+(new_i-1)+(new_j-1)).find('img').remove();
             board[new_i][new_j] = 0 ;
             board[new_i-1][new_j-1] = 0;
             board[new_i-2][new_j-2] = 2;
             console.log(board[new_i][new_j]);
             console.log(board[new_i-1][new_j-1]);
             console.log(board[new_i-2][new_j-2]);
             compeatcounter++;
             $('#compeat').text(compeatcounter);
             console.log("computer count = " + compeatcounter);
             if (compeatcounter==12)//winning check
             {
                 $('#forthrow').text("computer win!!!!!!!!");
               
               location.reaload();
                    initchekersGame(); //restart game
                  }

          return;
         }

      
     function computer_mov_left(new_i,new_j)  
         { 
          console.log('move left');
          element2 = $("#"+new_i+new_j).find('img').detach();
          $("#"+(new_i-1)+(new_j-1)).append(element2);
          board[new_i][new_j] = 0 ;
          board[new_i-1][new_j-1] = 2;
          return;
        }
      function computer_mov_right(new_i,new_j)
         {
            console.log('move right');
            element2 = $("#"+new_i+new_j).find('img').detach();
            $("#"+(new_i-1)+(new_j+1)).append(element2);
             board[new_i][new_j] = 0 ;
             board[new_i-1][new_j+1] = 2;
            return;
         }    
   

function initchekersGame() 
{  

//0-empty cell 1-human 2-comp -1 white cells
 board=[[-1,1,-1,1,-1,1,-1,1],
        [1,-1,1,-1,1,-1,1,-1],
        [-1,1,-1,1,-1,1,-1,1],
        [0,-1,0,-1,0,-1,0,-1],
        [-1,0,-1,0,-1,0,-1,0],
        [2,-1,2,-1,2,-1,2,-1],
        [-1,2,-1,2,-1,2,-1,2],
        [2,-1,2,-1,2,-1,2,-1]];

humanturn();


}
  $(document).ready(initchekersGame);//as ready go to human turn

</script>
   <title>Checkers</title>
</head>
<body>
<h1>CHEKER GAME</h1>
  <div id="main">

  <table id="board" border=1>
      <tr>
         <td bgcolor="BurlyWood" id="00" class="non-dropable" >
         </td>
         <td bgcolor="DarkGoldenRod" id="01" class="dropable">
           <img src="pl1.png" class="humansoldier">
         </td>
          <td bgcolor="BurlyWood" id="02"  class="non-dropable"  >
         </td>
         <td bgcolor="DarkGoldenRod" id="03" class="dropable">
           <img src="pl1.png" class="humansoldier">
         </td>
          <td bgcolor="BurlyWood" id="04" class="non-dropable" >
           
         </td>
         <td bgcolor="DarkGoldenRod" id="05" class="dropable">
           <img class="humansoldier" src="pl1.png">
         </td>
          <td bgcolor="BurlyWood" id="06" class="non-dropable">
           
         </td>
       <td bgcolor="DarkGoldenRod" id="07"  class="dropable">
          <img  src="pl1.png" class="humansoldier">
         </td>
      </tr>
      <tr>
         <td bgcolor="DarkGoldenRod" id="10" class="dropable">
           <img  src="pl1.png" class="humansoldier">
         </td>
         <td bgcolor="BurlyWood" id="11" class="non-dropable">
         </td>
         <td bgcolor="DarkGoldenRod" id="12" class="dropable">
           <img  src="pl1.png"  class="humansoldier">
         </td>
         <td bgcolor="BurlyWood" id="13" class="non-dropable">
           </td>
         <td bgcolor="DarkGoldenRod" id="14" class="dropable">
           <img  src="pl1.png" class="humansoldier">
         </td>
         <td bgcolor="BurlyWood" id="15" class="non-dropable">
          
         </td>
        <td bgcolor="DarkGoldenRod" id="16" class="dropable">
           <img  src="pl1.png" class="humansoldier">
         </td>
          <td bgcolor="BurlyWood" id="17" class="non-dropable">
         </td>
      </tr>
      <tr>
         <td bgcolor="BurlyWood" id="20" class="non-dropable">
         </td>
         <td bgcolor="DarkGoldenRod" id="21" class="dropable">
           <img  src="pl1.png" class="humansoldier">
         </td>
          <td bgcolor="BurlyWood" id="22" class="non-dropable">
         </td>
         <td bgcolor="DarkGoldenRod" id="23" class="dropable">
           <img  src="pl1.png" class="humansoldier">
         </td>
          <td bgcolor="BurlyWood" id="24" class="non-dropable">
         </td>
         <td bgcolor="DarkGoldenRod" id="25" class="dropable">
           <img  src="pl1.png" class="humansoldier">
         </td>
          <td bgcolor="BurlyWood" id="26" class="non-dropable">
         </td>
         <td bgcolor="DarkGoldenRod"  id="27" class="dropable">
           <img src="pl1.png" class="humansoldier">
         </td>
      </tr>
      <tr>
         <td  bgcolor="DarkGoldenRod" id="30" class="dropable">
       
         </td>
         <td bgcolor="BurlyWood" id="31" class="non-dropable">
          
         </td>
         <td bgcolor="DarkGoldenRod" id="32" class="dropable">
        
         </td>
         <td bgcolor="BurlyWood" id="33" class="non-dropable">
         
         </td>
         <td bgcolor="DarkGoldenRod" id="34" class="dropable">
         
         </td>
         <td bgcolor="BurlyWood" id="35" class="non-dropable">
         </td>
         <td bgcolor="DarkGoldenRod" id="36" class="dropable">
           
           </td>
        <td bgcolor="BurlyWood" id="37" class="non-dropable" >
         </td>
      </tr>
      <tr>
         <td bgcolor="BurlyWood" id="40" class="non-dropable" >
         </td>
         <td bgcolor="DarkGoldenRod" id="41" class="dropable">
        
         </td>
          <td bgcolor="BurlyWood" id="42"  dclass="non-dropable">
         </td>
         <td bgcolor="DarkGoldenRod" id="43"  class="dropable">
          
         </td>
          <td bgcolor="BurlyWood" id="44" class="non-dropable">
         </td>
         <td bgcolor="DarkGoldenRod" id="45"  class="dropable">
          
         </td>
          <td bgcolor="BurlyWood" id="46" daclass="non-dropable">
         </td>
         <td bgcolor="DarkGoldenRod" id="47" class="dropable">
           
         </td>
      </tr>
      <tr>
         <td bgcolor="DarkGoldenRod" id="50" class="dropable" >
           <img  src="pl2.png" class="compsoldier">
         </td>
         <td bgcolor="BurlyWood" id="51" class="non-dropable">
          </td>
         <td bgcolor="DarkGoldenRod" id="52" class="dropable">
           <img  src="pl2.png" class="compsoldier">
         </td>
         <td bgcolor="BurlyWood" id="53" class="non-dropable">
          </td>
         <td bgcolor="DarkGoldenRod" id="54" class="dropable">
             <img  src="pl2.png" class="compsoldier">
         </td>
         <td bgcolor="BurlyWood" id="55" class="non-dropable">
          </td>
        <td bgcolor="DarkGoldenRod" id="56"  class="dropable">
           <img  src="pl2.png" class="compsoldier">
         </td>
          <td bgcolor="BurlyWood" id="57" class="non-dropable" >
         </td>
      </tr>
      <tr>
         <td bgcolor="BurlyWood" id="60" class="non-dropable">
         </td>
         <td bgcolor="DarkGoldenRod" id="61" class="dropable">
           <img  src="pl2.png" class="compsoldier">
         </td>
          <td bgcolor="BurlyWood" id="62"  class="non-dropable">
         </td>
         <td bgcolor="DarkGoldenRod" id="63" class="dropable" >
           <img src="pl2.png"  class="compsoldier">
         </td>
          <td bgcolor="BurlyWood" id="64" class="non-dropable">
         </td>
         <td bgcolor="DarkGoldenRod"  id="65" class="dropable">
          <img src="pl2.png"  class="compsoldier">
         </td>
          <td bgcolor="BurlyWood" id="66" class="non-dropable">
         </td>
         <td bgcolor="DarkGoldenRod" id="67" class="dropable">
          <img src="pl2.png"  class="compsoldier">
         </td>
      </tr>
      <tr>
         <td bgcolor="DarkGoldenRod" id="70" class="dropable">
           <img  src="pl2.png" class="compsoldier" >
         </td>
         <td bgcolor="BurlyWood" id="71" class="non-dropable">
         </td>
         <td bgcolor="DarkGoldenRod" id="72" class="dropable">
           <img src="pl2.png" class="compsoldier" >
         </td>
         <td bgcolor="BurlyWood" id="73" class="non-dropable">
         </td>
         <td bgcolor="DarkGoldenRod" id="74"  class="dropable">
           <img src="pl2.png"  class="compsoldier">
         </td>
         <td bgcolor="BurlyWood" id="75" class="non-dropable">
         </td>
        <td bgcolor="DarkGoldenRod" id="76" class="dropable">
           <img  src="pl2.png" class="compsoldier">
         </td>
          <td bgcolor="BurlyWood" id="77" class="non-dropable">
        </td>
      </tr>



  </table>
</div>
  <div class="scoreboard" >
  <div class="headline">SCORE BOARD</div>  
<br>
<table id="score">
  <tr>
    <td>
<div id="secondrow1" class="discimg">
  <img src="pl1.png">
</div>
</td>
<td>
<div id="secondrow2" class="discimg">
  <img src="pl2.png">
</div>
</td>
</tr>
<tr>
  <td>
<div id="humaneat">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp0</div>
</td>
<td>
<div id="compeat">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp0</div>
</td>
</tr>
<tr>
<td colspan="2" border="0" >
<div id="forthrow"> </div>                    
 </td>    
   </tr>
</table>
  
   
    </div>

</body>
</html>
