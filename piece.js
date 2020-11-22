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
