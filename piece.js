class Piece {
    constructor(pt,px,py) {
        this.color=pt[0]
        this.type=pt[1];
        this.px=px;
        this.py=py;
    }
    bishopmoves() {
        var posy=this.py;
        if (this.py<7) {
            if (this.px<7) {
                posy=this.py+1;
                for (var i=this.px+1;i<=7;i++) {
                    if (pieces[posy][i].color==this.color) {break;}
                    this.possmoves.push([i,posy]);
                    if (gamestate[posy][i]!="  ") {break;}
                    posy+=1;
                    if (posy>7) {break;}
                }
            }
            if (this.px>0) {
                posy=this.py+1;
                for (var i=this.px-1;i>=0;i--) {
                    if (pieces[posy][i].color==this.color) {break;}
                    this.possmoves.push([i,posy]);
                    if (gamestate[posy][i]!="  ") {break;}
                    posy+=1;
                    if (posy>7) {break;}
                }
            }
        }
        if (this.py>0) {
            if (this.px<7) {
                posy=this.py-1;
                for (var i=this.px+1;i<=7;i++) {
                    if (pieces[posy][i].color==this.color) {break;}
                    this.possmoves.push([i,posy]);
                    if (gamestate[posy][i]!="  ") {break;}
                    posy-=1;
                    if (posy<0) {break;}
                }
            }
            if (this.px>0) {
                posy=this.py-1;
                for (var i=this.px-1;i>=0;i--) {
                    if (pieces[posy][i].color==this.color) {break;}
                    this.possmoves.push([i,posy]);
                    if (gamestate[posy][i]!="  ") {break;}
                    posy-=1;
                    if (posy<0) {break;}
                }
            }
        }
    }
    rookmoves() {
        for (var i=this.px+1;i<=7;i++) {
            if (pieces[this.py][i].color==this.color) {break;}
            this.possmoves.push([i,this.py]);
            if (gamestate[this.py][i]!="  ") {break;}
        }
        for (var i=this.px-1;i>=0;i--) {
            if (pieces[this.py][i].color==this.color) {break;}
            this.possmoves.push([i,this.py]);
            if (gamestate[this.py][i]!="  ") {break;}
        }
        for (var i=this.py+1;i<=7;i++) {
            if (pieces[i][this.px].color==this.color) {break;}
            this.possmoves.push([this.px,i]);
            if (gamestate[i][this.px]!="  ") {break;}
        }
        for (var i=this.py-1;i>=0;i--) {
            if (pieces[i][this.px].color==this.color) {break;}
            this.possmoves.push([this.px,i]);
            if (gamestate[i][this.px]!="  ") {break;}
        }
    }
    possiblemoves() {
        this.possmoves=[];
        if (this.type=="k") {
            for (var i=0;i<8;i++) {
                for (var j=0;j<8;j++) {
                    if (abs(i-this.px)<=1 && abs(j-this.py)<=1) {
                        if (j==this.py && i==this.px) {} else {
                            if (pieces[j][i].color!=this.color) {
                                this.possmoves.push([i,j]);
                            }
                        }
                    }
                }
            }
        } else if (this.type=="r") {
            this.rookmoves();
        } else if (this.type=="b") {
            this.bishopmoves();
        } else if (this.type=="q") {
            this.rookmoves();
            this.bishopmoves();
        } else if (this.type=="n") {
            for (var i=0;i<8;i++) {
                for (var j=0;j<8;j++) {
                    if ((abs(i-this.px)==2 && abs(j-this.py)==1) || (abs(i-this.px)==1 && abs(j-this.py)==2)) {
                        if (pieces[j][i].color!=this.color) {
                            this.possmoves.push([i,j]);
                        }
                    }
                }
            }
        } else if (this.type=="p") {
            if (this.color=="w") {
                if (gamestate[this.py-1][this.px]=="  ") {
                    this.possmoves.push([this.px,this.py-1]);
                    if (gamestate[this.py-2][this.px]=="  " && this.py==6) {
                        this.possmoves.push([this.px,this.py-2]);
                    }
                }
                if (this.px>0) {
                   if (pieces[this.py-1][this.px-1].color=="b") {
                        this.possmoves.push([this.px-1,this.py-1]);
                    }
                }
                if (this.px<7) {
                    if (pieces[this.py-1][this.px+1].color=="b") {
                        this.possmoves.push([this.px+1,this.py-1]);
                    }
                }
            } else if (this.color=="b") {
                if (gamestate[this.py+1][this.px]=="  ") {
                    this.possmoves.push([this.px,this.py+1]);
                    if (gamestate[this.py+2][this.px]=="  " && this.py==1) {
                        this.possmoves.push([this.px,this.py+2]);
                    }
                }
                if (this.px>0) {
                    if (pieces[this.py+1][this.px-1].color=="w") {
                        this.possmoves.push([this.px-1,this.py+1]);
                    }
                }
                if (this.px<7) {
                   if (pieces[this.py+1][this.px+1].color=="w") {
                        this.possmoves.push([this.px+1,this.py+1]);
                    }
                }
            }
        }
        return this.possmoves;
    }
    isincheck() {
        for (var ii=0;ii<8;ii++) {
            for (var jj=0;jj<8;jj++) {
                var pm=pieces[ii][jj].possiblemoves();
                for (var z=0;z<pm.length;z++) {
                    if (pm[z][1]==this.px && pm[z][0]==this.py) {
                        fill(255,0,0,200);
                        noStroke();
                        ellipse((pm[z][0]+0.5)*TILESIZE,(0.5+pm[z][1])*TILESIZE,TILESIZE*0.3,TILESIZE*0.3);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    showmoves() {
        var x=this.possiblemoves();
        for (var i=0;i<x.length;i++) {
            fill(0,255,0,200);
            noStroke();
            ellipse((x[i][0]+0.5)*TILESIZE,(0.5+x[i][1])*TILESIZE,TILESIZE*0.3,TILESIZE*0.3);
        }
    }
    draw() {
        if (this.type!=" ") {
            if (this.color=="b") {
                fill(255,255,255);
                noStroke();
                rect((this.px+0.5)*TILESIZE-33,(this.py+0.5)*TILESIZE-33,66,66);
            }
            var thisimg=imgs[this.color+this.type];
            image(thisimg,(this.px+0.5)*TILESIZE-40,(this.py+0.5)*TILESIZE-40,80,80);
        }
    }
}
