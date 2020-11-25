class Piece {
    constructor(pt,px,py) {
        this.color=pt[0]
        this.type=pt[1];
        this.px=px;
        this.py=py;
    }
    possiblemoves() {
        this.possmoves=[];
        if (this.type=="k") {
            for (var i=0;i<8;i++) {
                for (var j=0;j<8;j++) {
                    if (abs(i-this.px)<=1 && abs(j-this.py)<=1) {
                        if (j==this.py && i==this.px) {} else {
                            this.possmoves.push([i,j]);
                        }
                    }
                }
            }
        } else if (this.type=="r") {
            for (var i=0;i<8;i++) {
                if (i!=this.px) {
                    this.possmoves.push([i,this.py]);
                }   
                if (i!=this.py) {
                    this.possmoves.push([this.px,i]);
                }   
            }   
        } else if (this.type=="b") {
            for (var i=0;i<8;i++) {
                for (var j=0;j<8;j++) {
                    if ((i-this.px)==(j-this.py) || (i-this.px)==(this.py-j)) {
                        this.possmoves.push([i,j]);
                    }
                }
            }
        } else if (this.type=="q") {
            for (var i=0;i<8;i++) {
                if (i!=this.px) {
                    this.possmoves.push([i,this.py]);
                }   
                if (i!=this.py) {
                    this.possmoves.push([this.px,i]);
                }   
            }   
            for (var i=0;i<8;i++) {
                for (var j=0;j<8;j++) {
                    if ((i-this.px)==(j-this.py) || (i-this.px)==(this.py-j)) {
                        this.possmoves.push([i,j]);
                    }
                }
            }
        } else if (this.type=="n") {
            for (var i=0;i<8;i++) {
                for (var j=0;j<8;j++) {
                    if ((abs(i-this.px)==2 && abs(j-this.py)==1) || (abs(i-this.px)==1 && abs(j-this.py)==2)) {
                        this.possmoves.push([i,j]);
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
                if (pieces[this.py-1][this.px-1].color=="b") {
                    this.possmoves.push([this.px-1,this.py-1]);
                }
                if (pieces[this.py-1][this.px+1].color=="b") {
                    this.possmoves.push([this.px+1,this.py-1]);
                }
            } else if (this.color=="b") {
                if (gamestate[this.py+1][this.px]=="  ") {
                    this.possmoves.push([this.px,this.py+1]);
                    if (gamestate[this.py+2][this.px]=="  " && this.py==1) {
                        this.possmoves.push([this.px,this.py+2]);
                    }
                }
                if (pieces[this.py+1][this.px-1].color=="w") {
                    this.possmoves.push([this.px-1,this.py+1]);
                }
                if (pieces[this.py+1][this.px+1].color=="w") {
                    this.possmoves.push([this.px+1,this.py+1]);
                }
            }
        }
        return this.possmoves;
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
                rect((this.px+0.5)*TILESIZE-30,(this.py+0.5)*TILESIZE-30,60,60);
            }
            var thisimg=imgs[this.color+this.type];
            image(thisimg,(this.px+0.5)*TILESIZE-thisimg.width/2,(this.py+0.5)*TILESIZE-thisimg.height/2);
        }
    }
}
