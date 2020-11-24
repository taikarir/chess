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
        } else if (this.type=="r") {
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
