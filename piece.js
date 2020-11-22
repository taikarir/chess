class Piece {
    constructor(pt,px,py) {
        if (pt[0]=="b") {
            this.color="black";
        } else if (pt[0]=="w") {
            this.color="white";
        }
        var ptype={"p":"pawn","q":"queen","k":"king","b":"bishop","n":"knight","r":"rook"};
        this.type=ptype[pt[1]];
        this.px=px;
        this.py=py;
    }
    possiblemoves() {
        this.possmoves=[];
        if (this.type=="king") {
            if (this.py>0) {
                this.possmoves.push([this.px+1,this.py]);
                if (this.px>0) {
                    this.possmoves.push([this.px,this.py]);
                }   
                if (this.px<7) {
                    this.possmoves.push([this.px+2,this.py]);
                }   
            }   
            if (this.py<7) {
                this.possmoves.push([this.px+1,this.py+2]);
                if (this.px>0) {
                    this.possmoves.push([this.px,this.py+2]);
                }   
                if (this.px<7) {
                    this.possmoves.push([this.px+2,this.py+2]);
                }   
            }   
            if (this.px<7) {
                this.possmoves.push([this.px+2,this.py+1]);
            }   
            if (this.px>0) {
                this.possmoves.push([this.px,this.py+1]);
            }   
        } else if (this.type=="rook") {
            for (var i=0;i<8;i++) {
                if (i!=this.px) {
                    this.possmoves.push([i+1,this.py+1]);
                }   
                if (i!=this.py) {
                    this.possmoves.push([this.px+1,i+1]);
                }   
            }   
        }
        return this.possmoves;
    }   
    draw() {
        if (this.color=="black") {
            fill(0,0,0);
            stroke(255,255,255);
        } else if (this.color=="white") {
            fill(255,255,255);
            stroke(0,0,0);
        }
        text(this.type,this.px*TILESIZE+TILESIZE/2,this.py*TILESIZE+TILESIZE/2)
    }
}
