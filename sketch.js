const BOARDSIZE=720;
const TILESIZE=BOARDSIZE/8;
const IMGSIZE=TILESIZE*8/9;
const ptype={"k":"king","q":"queen","r":"rook","b":"bishop","n":"knight","p":"pawn"};
var turn=0;
var gamestate=[["br","bn","bb","bq","bk","bb","bn","br"],
               ["bp","bp","bp","bp","bp","bp","bp","bp"],
               ["  ","  ","  ","  ","  ","  ","  ","  "],
               ["  ","  ","  ","  ","  ","  ","  ","  "],
               ["  ","  ","  ","  ","  ","  ","  ","  "],
               ["  ","  ","  ","  ","  ","  ","  ","  "],
               ["wp","wp","wp","wp","wp","wp","wp","wp"],
               ["wr","wn","wb","wq","wk","wb","wn","wr"]];
var pieces=[];
var pieces2=[];var game2=[];var bking=0;var wking=0;
var heldpiece="";
var promote=[0,0,0];
var possi;
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
    if (heldpiece!="") { 
        heldpiece.showmoves(possi);
        image(imgs[heldpiece.color+heldpiece.type],mouseX-IMGSIZE/2,mouseY-IMGSIZE/2,IMGSIZE,IMGSIZE);
    }
    if (promote[0]!=0) {
        fill(100,100,100,200);
        noStroke();
        rect(0,0,BOARDSIZE,BOARDSIZE);
    }
    if (promote[0]==1) {
        image(imgs["wq"],(promote[2][0]+0.5)*TILESIZE-IMGSIZE/2,0.5*TILESIZE-IMGSIZE/2,IMGSIZE,IMGSIZE);
        image(imgs["wr"],(promote[2][0]+0.5)*TILESIZE-IMGSIZE/2,1.5*TILESIZE-IMGSIZE/2,IMGSIZE,IMGSIZE);
        image(imgs["wb"],(promote[2][0]+0.5)*TILESIZE-IMGSIZE/2,2.5*TILESIZE-IMGSIZE/2,IMGSIZE,IMGSIZE);
        image(imgs["wn"],(promote[2][0]+0.5)*TILESIZE-IMGSIZE/2,3.5*TILESIZE-IMGSIZE/2,IMGSIZE,IMGSIZE);
    } else if (promote[0]==2) {
        image(imgs["bq"],(promote[2][0]+0.5)*TILESIZE-IMGSIZE/2,7.5*TILESIZE-IMGSIZE/2,IMGSIZE,IMGSIZE);
        image(imgs["br"],(promote[2][0]+0.5)*TILESIZE-IMGSIZE/2,6.5*TILESIZE-IMGSIZE/2,IMGSIZE,IMGSIZE);
        image(imgs["bb"],(promote[2][0]+0.5)*TILESIZE-IMGSIZE/2,5.5*TILESIZE-IMGSIZE/2,IMGSIZE,IMGSIZE);
        image(imgs["bn"],(promote[2][0]+0.5)*TILESIZE-IMGSIZE/2,4.5*TILESIZE-IMGSIZE/2,IMGSIZE,IMGSIZE);
    }
    mousex=mouseX;mousey=mouseY;
    var hop=0;
    if (mousex>=0 && mousey>=0 && mousex<BOARDSIZE && mousey<BOARDSIZE && heldpiece=="" && pieces[floor(mousey/TILESIZE)][floor(mousex/TILESIZE)].type!=" ") {
        cursor(HAND);
    } else if (promote[0]==1) {
        if (floor(mousey/TILESIZE)>=0 && floor(mousey/TILESIZE)<=3 && floor(mousex/TILESIZE)==promote[2][0]) {
            cursor(HAND);
            hop=1;
        } else {
            cursor(ARROW);
        }
    } else if (promote[0]==2) {
        if (floor(mousey/TILESIZE)<=7 && floor(mousey/TILESIZE)>=4 && floor(mousex/TILESIZE)==promote[2][0]) {
            cursor(HAND);
            hop=1;
        } else {
            cursor(ARROW);
        }
    } else if (heldpiece!="" && hop==0) {
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
        onpiece = pieces[startp[0]][startp[1]]
        if (onpiece.type!=" ") {
            if (heldpiece=="") {
                heldpiece=pieces[startp[0]][startp[1]];
                heldpiece.possiblemoves();
                heldpiece.removemoves();
                possi=heldpiece.possmoves;
                promote=[0,0,0];
            }
        }
    }
}
function mouseReleased() {
    if (mousex>=0 && mousey>=0 && mousex<BOARDSIZE && mousey<BOARDSIZE && heldpiece!="") {
        if (promote[0]==0) {
            var endp=[floor(mouseX/TILESIZE),floor(mouseY/TILESIZE)];
            if (endp[0]==heldpiece.px && endp[1]==heldpiece.py) {
                return;
            }
            var includes;
            for (var i=0;i<possi.length;i++) {
                includes=0;
                for (var j=0;j<possi[i].length;j++) {
                    if (possi[i][j]==endp[j]) {
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
                            turn+=1;
                            heldpiece="";
                            pieces=[];
                            return;
                        } else if (endp[1]==7 && endp[0]==2) {
                            gamestate[7][0]="  ";
                            gamestate[7][1]="  ";
                            gamestate[7][2]="wr";
                            gamestate[7][3]="wk";
                            gamestate[7][4]="  ";
                            turn+=1;
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
                            turn+=1;
                            heldpiece="";
                            pieces=[];
                            return;
                        } else if (endp[1]==0 && endp[0]==2) {
                            gamestate[0][0]="  ";
                            gamestate[0][1]="  ";
                            gamestate[0][2]="bk";
                            gamestate[0][3]="br";
                            gamestate[0][4]="  ";
                            turn+=1;
                            heldpiece="";
                            pieces=[];
                            return;
                        }
                        bkm=1;
                    }
                }
                gamestate[heldpiece.py][heldpiece.px]="  ";
                gamestate[endp[1]][endp[0]]=heldpiece.color+heldpiece.type;
                turn+=1;
            }
            heldpiece="";
            pieces=[];
        } else {
            promote_options=["q","r","b","n"];
            if (floor(mouseX/TILESIZE)==promote[2][0]) {
                if (promote[0]==1) {
                    var promoted=promote_options[floor(mouseY/TILESIZE)];
                } else if (promote[0]==2) {
                    var promoted=promote_options[7-floor(mouseY/TILESIZE)];
                }
                gamestate[heldpiece.py][heldpiece.px]="  ";
                gamestate[promote[2][1]][promote[2][0]]=heldpiece.color+promoted;
                turn+=1;
            }
            promote=[0,0,0];
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
