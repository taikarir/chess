const BOARDSIZE=800;
const TILESIZE=BOARDSIZE/8;
var gamestate=[["br","bn","bb","bq","bk","bb","bn","br"],
               ["bp","bp","bp","bp","bp","bp","bp","bp"],
               ["  ","  ","  ","  ","  ","  ","  ","  "],
               ["  ","  ","  ","  ","  ","  ","  ","  "],
               ["  ","  ","  ","  ","  ","  ","  ","  "],
               ["  ","  ","  ","  ","  ","  ","  ","  "],
               ["wp","wp","wp","wp","wp","wp","wp","wp"],
               ["wr","wn","wb","wq","wk","wb","wn","wr"]];
var pieces=[];
function setup() {
    createCanvas(800,800);
    textSize(32);
    textAlign(CENTER,CENTER);
    strokeWeight(5);
}
function draw() {
    background(0,0,0);
    pieces=[];
    for (var i=0;i<8;i++)  {
        for (var j=0;j<8;j++) {
            if ((i+j)%2==0) {
                fill(255,255,255);
            } else {
                fill(0,0,0);
            }
            noStroke();
            rect(j*TILESIZE,i*TILESIZE,TILESIZE,TILESIZE);
            fill(255,0,0);
            stroke(255,0,0);
            if (gamestate[i][j]!="  ") {
                pieces.push(new Piece(gamestate[i][j],j,7-i));
            }
        }
    }
    for (var i=0;i<pieces.length;i++) {
        pieces[i].draw();
    }
}
