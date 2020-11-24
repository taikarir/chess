const BOARDSIZE=800;
const TILESIZE=BOARDSIZE/8;
const ptype={"k":"king","q":"queen","r":"rook","b":"bishop","n":"knight","p":"pawn"};
var gamestate=[["br","bn","bb","bq","bk","bb","bn","br"],
               ["bp","bp","bp","bp","bp","bp","bp","bp"],
               ["  ","  ","  ","  ","  ","  ","  ","  "],
               ["  ","  ","  ","  ","  ","  ","  ","  "],
               ["  ","  ","  ","  ","  ","  ","  ","  "],
               ["  ","  ","  ","  ","  ","  ","  ","  "],
               ["wp","wp","wp","wp","wp","wp","wp","wp"],
               ["wr","wn","wb","wq","wk","wb","wn","wr"]];
var pieces=[];
var heldpiece="";
function setup() {
    createCanvas(800,800);
    textSize(32);
    textAlign(CENTER,CENTER);
    strokeWeight(3);
}
function draw() {
    background(0,0,0);
    pieces=[];
    for (var i=0;i<8;i++)  {
        pieces.push([]);
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
            pieces[i].push(new Piece(gamestate[i][j],j,i));
        }
    }
    for (var i=0;i<pieces.length;i++) {
        for (var j=0;j<pieces[i].length;j++) {
            pieces[i][j].draw();
        }
    }
}
function mousePressed() {
    if (heldpiece=="") {
        if (pieces[floor(mouseY/TILESIZE)][floor(mouseX/TILESIZE)].type!=" ") {
            heldpiece=pieces[floor(mouseY/TILESIZE)][floor(mouseX/TILESIZE)];
        }
    } else {
        gamestate[heldpiece.py][heldpiece.px]="  ";
        gamestate[floor(mouseY/TILESIZE)][floor(mouseX/TILESIZE)]=heldpiece.color+heldpiece.type;
        heldpiece="";
    }
}
