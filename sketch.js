const BOARDSIZE=720;
const TILESIZE=BOARDSIZE/8;
const ptype={"k":"king","q":"queen","r":"rook","b":"bishop","n":"knight","p":"pawn"};
var gamestate=[["br","  ","  ","  ","bk","  ","  ","br"],
               ["bp","bp","bp","bp","bp","bp","bp","bp"],
               ["  ","  ","  ","  ","  ","  ","  ","  "],
               ["  ","  ","  ","  ","  ","  ","  ","  "],
               ["  ","  ","  ","  ","  ","  ","  ","  "],
               ["  ","  ","  ","  ","  ","  ","  ","  "],
               ["wp","wp","wp","wp","wp","wp","wp","wp"],
               ["wr","  ","  ","  ","wk","  ","  ","wr"]];
var pieces=[];
var heldpiece="";
var promote=[0,0,0];
var br;var wr;var bp;var wp;var bq;var wq;var bk;var wk;var wn;var bn;var wb;var bb;var imgs;
var wkm=0;var bkm=0;var awrm=0;var hwrm=0;var abrm=0;var hbrm=0;
var mousex=0;var mousey=0;
function setup() {
    createCanvas(BOARDSIZE,BOARDSIZE);
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
                fill(95,158,176);
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
    for (var i=0;i<pieces.length;i++) {
        for (var j=0;j<pieces[i].length;j++) {
            if (gamestate[j][i][1]=="k") {
                pieces[i][j].isincheck();
            }
        }
    }
    if (heldpiece!="") { 
        heldpiece.showmoves();
    }
    if (promote[0]!=0) {
        fill(100,100,100,200);
        noStroke();
        rect(0,0,BOARDSIZE,BOARDSIZE);
    }
    if (promote[0]==1) {
        image(imgs["wq"],(heldpiece.px+0.5)*TILESIZE-40,0.5*TILESIZE-40,80,80);
        image(imgs["wr"],(heldpiece.px+0.5)*TILESIZE-40,1.5*TILESIZE-40,80,80);
        image(imgs["wb"],(heldpiece.px+0.5)*TILESIZE-40,2.5*TILESIZE-40,80,80);
        image(imgs["wn"],(heldpiece.px+0.5)*TILESIZE-40,3.5*TILESIZE-40,80,80);
    } else if (promote[0]==2) {
        image(imgs["bq"],(heldpiece.px+0.5)*TILESIZE-40,7.5*TILESIZE-40,80,80);
        image(imgs["br"],(heldpiece.px+0.5)*TILESIZE-40,6.5*TILESIZE-40,80,80);
        image(imgs["bb"],(heldpiece.px+0.5)*TILESIZE-40,5.5*TILESIZE-40,80,80);
        image(imgs["bn"],(heldpiece.px+0.5)*TILESIZE-40,4.5*TILESIZE-40,80,80);
    }
    mousex=mouseX;mousey=mouseY;
    if (mousex>=0 && mousey>=0 && mousex<BOARDSIZE && mousey<BOARDSIZE && heldpiece=="" && pieces[floor(mousey/TILESIZE)][floor(mousex/TILESIZE)].type!=" ") {
        cursor(HAND);
    } else if (heldpiece!="") {
        var hop=0;
        var possi=heldpiece.possiblemoves();
        for (var i=0;i<possi.length;i++) {
            if (possi[i][1]==floor(mousey/TILESIZE) && possi[i][0]==floor(mousex/TILESIZE)) {
                cursor(HAND);
                hop=1;
                break;
            }
        }
        if (hop==0) {
            cursor(ARROW);
        }
    } else {
        cursor(ARROW);
    }
}
function mousePressed() {
    if (mousex>=0 && mousey>=0 && mousex<BOARDSIZE && mousey<BOARDSIZE && heldpiece=="") {
        var startp=[floor(mouseY/TILESIZE),floor(mouseX/TILESIZE)];
        if (pieces[startp[0]][startp[1]].type!=" ") {
            heldpiece=pieces[startp[0]][startp[1]];
            promote=[0,0,0];
        }
    }
}
function mouseReleased() {
    if (mousex>=0 && mousey>=0 && mousex<BOARDSIZE && mousey<BOARDSIZE && heldpiece!="") {
        if (promote[0]==0) {
            var endp=[floor(mouseX/TILESIZE),floor(mouseY/TILESIZE)];
            var poss=heldpiece.possiblemoves();
            if (endp[0]==heldpiece.px && endp[1]==heldpiece.py) {
                return;
            }
            var includes;
            for (var i=0;i<poss.length;i++) {
                includes=0;
                for (var j=0;j<poss[i].length;j++) {
                    if (poss[i][j]==endp[j]) {
                        includes+=1;
                    }
                }
                if (includes==2) {
                    break;
                }
            }
            if (includes==2) {
                if (heldpiece.type=="p") {
                    if (endp[1]==0) {
                        promote=[1,heldpiece,endp];
                        return;
                    } else if (endp[1]==7) {
                        promote=[2,heldpiece,endp];
                        return;
                    }
                }
                if (heldpiece.type=="r") {
                    if (heldpiece.color=="w") {
                        if (heldpiece.px==7) {
                            hwrm=1;
                        } else if (heldpiece.px==0) {
                            awrm=1;
                        }
                    } else if (heldpiece.color=="b") {
                        if (heldpiece.px==7) {
                            hbrm=1;
                        } else if (heldpiece.px==0) {
                            awrm=1;
                        }
                    }
                } else if (heldpiece.type=="k") {
                    if (heldpiece.color=="w" && wkm==0) {
                        if (endp[1]==7 && endp[0]==6) {
                            gamestate[7][7]="  ";
                            gamestate[7][6]="wk";
                            gamestate[7][5]="wr";
                            gamestate[7][4]="  ";
            heldpiece="";
            pieces=[];
                            return;
                        } else if (endp[1]==7 && endp[0]==2) {
                            gamestate[7][0]="  ";
                            gamestate[7][1]="  ";
                            gamestate[7][2]="wr";
                            gamestate[7][3]="wk";
                            gamestate[7][4]="  ";
            heldpiece="";
            pieces=[];
                            return;
                        }
                        wkm=1;
                    }
                    else if (heldpiece.color=="b" && bkm==0) {
                        if (endp[1]==0 && endp[0]==6) {
                            gamestate[0][7]="  ";
                            gamestate[0][6]="bk";
                            gamestate[0][5]="br";
                            gamestate[0][4]="  ";
            heldpiece="";
            pieces=[];
                            return;
                        } else if (endp[1]==0 && endp[0]==2) {
                            gamestate[0][0]="  ";
                            gamestate[0][1]="  ";
                            gamestate[0][2]="bk";
                            gamestate[0][3]="br";
                            gamestate[0][4]="  ";
            heldpiece="";
            pieces=[];
                            return;
                        }
                        bkm=1;
                    }
                }
                gamestate[heldpiece.py][heldpiece.px]="  ";
                gamestate[endp[1]][endp[0]]=heldpiece.color+heldpiece.type;
            }
            heldpiece="";
            pieces=[];
        } else {
            promote_options=["q","r","b","n"];
            if (floor(mouseX/TILESIZE)==heldpiece.px) {
                if (promote[0]==1) {
                    var promoted=promote_options[floor(mouseY/TILESIZE)];
                } else if (promote[0]==2) {
                    var promoted=promote_options[7-floor(mouseY/TILESIZE)];
                }
                gamestate[heldpiece.py][heldpiece.px]="  ";
                gamestate[promote[2][1]][promote[2][0]]=heldpiece.color+promoted;
                promote=[0,0,0];
            }
            heldpiece="";
            pieces=[];
        }
    }
}
function movepiece(x,y) {
    var pc=gamestate[x[1]][x[0]];
    if (pc!="  ") {
        gamestate[y[1]][y[0]]=pc;
        gamestate[x[1]][x[0]]="  ";
    }
}
