class Piece {
    constructor(pt,px,py) {
        this.color=pt[0]
        this.type=pt[1];
        this.px=px;
        this.py=py;
    }
    possiblemoves() {
        this.possmoves=[];
        if (this.type=="king") {
            if (this.py>0) {
                this.possmoves.push([this.px,this.py-1]);
                if (this.px>0) {
                    this.possmoves.push([this.px-1,this.py-1]);
                }   
                if (this.px<7) {
                    this.possmoves.push([this.px+1,this.py-1]);
                }   
            }   
            if (this.py<7) {
                this.possmoves.push([this.px,this.py+1]);
                if (this.px>0) {
                    this.possmoves.push([this.px-1,this.py+1]);
                }   
                if (this.px<7) {
                    this.possmoves.push([this.px+1,this.py+1]);
                }   
            }   
            if (this.px<7) {
                this.possmoves.push([this.px+1,this.py]);
            }   
            if (this.px>0) {
                this.possmoves.push([this.px-1,this.py]);
            }   
        } else if (this.type=="rook") {
            for (var i=0;i<8;i++) {
                if (i!=this.px) {
                    this.possmoves.push([i,this.py]);
                }   
                if (i!=this.py) {
                    this.possmoves.push([this.px,i]);
                }   
            }   
        }
        return this.possmoves;
    }
    /*showmoves() {
        var x=this.possiblemoves();
        for (var i=0;i<x.length;i++) {
            fill(255,0,0);
            ellipse((x[i][0]+0.5)*TILESIZE,(7.5-x[i][1])*TILESIZE,TILESIZE*0.3,TILESIZE*0.3);
        }
    }*/
    draw() {
        if (this.color=="b") {
            fill(0,0,0);
            stroke(255,255,255);
        } else if (this.color=="w") {
            fill(255,255,255);
            stroke(0,0,0);
        }
        text(ptype[this.type],this.px*TILESIZE+TILESIZE/2,this.py*TILESIZE+TILESIZE/2)
    }
}
