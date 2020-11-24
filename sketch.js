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
var br;var wr;var bp;var wp;var bq;var wq;var bk;var wk;var wn;var bn;var wb;var bb;var imgs;
function setup() {
    createCanvas(800,800);
    textSize(32);
    textAlign(CENTER,CENTER);
    strokeWeight(3);
    var br=loadImage("pieceassets/Chess_rdt60.png");
    var wr=loadImage("pieceassets/Chess_rlt60.png");
    var bp=loadImage("pieceassets/Chess_pdt60.png");
    var wp=loadImage("pieceassets/Chess_plt60.png");
    var bq=loadImage("pieceassets/Chess_qdt60.png");
    var wq=loadImage("pieceassets/Chess_qlt60.png");
    var bk=loadImage("pieceassets/Chess_kdt60.png");
    var wk=loadImage("pieceassets/Chess_klt60.png");
    var bn=loadImage("pieceassets/Chess_ndt60.png");
    var wn=loadImage("pieceassets/Chess_nlt60.png");
    var bb=loadImage("pieceassets/Chess_bdt60.png");
    var wb=loadImage("pieceassets/Chess_blt60.png");
    imgs={"br":br,"bn":bn,"bb":bb,"bq":bq,"bk":bk,"bp":bp,"wr":wr,"wn":wn,"wb":wb,"wq":wq,"wk":wk,"wp":wp};
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
