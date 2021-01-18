class Piece {
    constructor(pt,px,py) {
        this.color=pt[0]
        this.type=pt[1];
        this.px=px;
        this.py=py;
    }
    bishopmoves(tp) {
        var posy=this.py;
        if (this.py<7) {
            if (this.px<7) {
                posy=this.py+1;
                for (var i=this.px+1;i<=7;i++) {
                    if (tp[posy][i].color==this.color) {break;}
                    this.possmoves.push([i,posy]);
                    if (tp[posy][i].type!=" ") {break;}
                    posy+=1;
                    if (posy>7) {break;}
                }
            }
            if (this.px>0) {
                posy=this.py+1;
                for (var i=this.px-1;i>=0;i--) {
                    if (tp[posy][i].color==this.color) {break;}
                    this.possmoves.push([i,posy]);
                    if (tp[posy][i].type!=" ") {break;}
                    posy+=1;
                    if (posy>7) {break;}
                }
            }
        }
        if (this.py>0) {
            if (this.px<7) {
                posy=this.py-1;
                for (var i=this.px+1;i<=7;i++) {
                    if (tp[posy][i].color==this.color) {break;}
                    this.possmoves.push([i,posy]);
                    if (tp[posy][i].type!=" ") {break;}
                    posy-=1;
                    if (posy<0) {break;}
                }
            }
            if (this.px>0) {
                posy=this.py-1;
                for (var i=this.px-1;i>=0;i--) {
                    if (tp[posy][i].color==this.color) {break;}
                    this.possmoves.push([i,posy]);
                    if (tp[posy][i].type!=" ") {break;}
                    posy-=1;
                    if (posy<0) {break;}
                }
            }
        }
    }
    rookmoves(tp) {
        for (var i=this.px+1;i<=7;i++) {
            if (tp[this.py][i].color==this.color) {break;}
            this.possmoves.push([i,this.py]);
            if (tp[this.py][i].type!=" ") {break;}
        }
        for (var i=this.px-1;i>=0;i--) {
            if (tp[this.py][i].color==this.color) {break;}
            this.possmoves.push([i,this.py]);
            if (tp[this.py][i].type!=" ") {break;}
        }
        for (var i=this.py+1;i<=7;i++) {
            if (tp[i][this.px].color==this.color) {break;}
            this.possmoves.push([this.px,i]);
            if (tp[i][this.px].type!=" ") {break;}
        }
        for (var i=this.py-1;i>=0;i--) {
            if (tp[i][this.px].color==this.color) {break;}
            this.possmoves.push([this.px,i]);
            if (tp[i][this.px].type!=" ") {break;}
        }
    }
    possiblemoves(tp=pieces,tn=0) {
        this.possmoves=[];
        if (tn==1 || (this.color=="w" && turn%2==0) || (this.color=="b" && turn%2==1)) {
            if (this.type=="k") {
                for (var i=0;i<8;i++) {
                    for (var j=0;j<8;j++) {
                        if (abs(i-this.px)<=1 && abs(j-this.py)<=1) {
                            if (j==this.py && i==this.px) {} else {
                                if (tp[j][i].color!=this.color) {
                                    this.possmoves.push([i,j]);
                                }
                            }
                        }
                    }
                }
                if (this.px==4) {
                    if (this.py==0 && bkm==0) {
                        if (tp[0][5].type==" " && tp[0][6].type==" " && hbrm==0) {
                            this.possmoves.push([6,0]);
                        }
                        if (tp[0][1].type==" " && tp[0][2].type==" " && tp[0][3].type==" " && abrm==0) {
                            this.possmoves.push([2,0]);
                        }
                    } else if (this.py==7 && wkm==0) {
                        if (tp[7][5].type==" " && tp[0][6].type==" " && hwrm==0) {
                            this.possmoves.push([6,7]);
                        }
                        if (tp[7][1].type==" " && tp[7][2].type==" " && tp[7][3].type==" " && awrm==0) {
                            this.possmoves.push([2,7]);
                        }
                    }
                }
            } else if (this.type=="r") {
                this.rookmoves(tp);
            } else if (this.type=="b") {
                this.bishopmoves(tp);
            } else if (this.type=="q") {
                this.rookmoves(tp);
                this.bishopmoves(tp);
            } else if (this.type=="n") {
                for (var i=0;i<8;i++) {
                    for (var j=0;j<8;j++) {
                        if ((abs(i-this.px)==2 && abs(j-this.py)==1) || (abs(i-this.px)==1 && abs(j-this.py)==2)) {
                            if (tp[j][i].color!=this.color) {
                                this.possmoves.push([i,j]);
                            }
                        }
                    }
                }
            } else if (this.type=="p") {
                if (this.color=="w") {
                    if (this.py==0) {
                        return [];
                    }
                    if (tp[this.py-1][this.px].type==" ") {
                        this.possmoves.push([this.px,this.py-1]);
                        if (this.py==6 && tp[this.py-2][this.px].type==" ") {
                            this.possmoves.push([this.px,this.py-2]);
                        }
                    }
                    if (this.px>0) {
                       if (tp[this.py-1][this.px-1].color=="b") {
                            this.possmoves.push([this.px-1,this.py-1]);
                        }
                    }
                    if (this.px<7) {
                        if (tp[this.py-1][this.px+1].color=="b") {
                            this.possmoves.push([this.px+1,this.py-1]);
                        }
                    }
                } else if (this.color=="b") {
                    if (this.py==7) {
                        return [];
                    }
                    if (tp[this.py+1][this.px].type==" ") {
                        this.possmoves.push([this.px,this.py+1]);
                        if (this.py==1 && tp[this.py+2][this.px].type==" ") {
                            this.possmoves.push([this.px,this.py+2]);
                        }
                    }
                    if (this.px>0) {
                        if (tp[this.py+1][this.px-1].color=="w") {
                            this.possmoves.push([this.px-1,this.py+1]);
                        }
                    }
                    if (this.px<7) {
                        if (tp[this.py+1][this.px+1].color=="w") {
                        this.possmoves.push([this.px+1,this.py+1]);
                        }
                    }
                }
            }
        }
        return this.possmoves;
    }
    removemoves() {
        var todelete=[];
        for (var i=0;i<this.possmoves.length;i++) {
            game2=[];
            bking=0;
            wking=0;
            pieces2=[];
            for (var ii=0;ii<8;ii++) {
                game2.push([]);
                for (var iii=0;iii<8;iii++) {
                    game2[ii].push(gamestate[ii][iii]);
                }
            }
            game2[this.py][this.px]="  ";
            game2[this.possmoves[i][1]][this.possmoves[i][0]]=this.color+this.type;
            for (var ii=0;ii<8;ii++) {
                pieces2.push([]);
                for(var iii=0;iii<8;iii++) {
                    if (game2[ii][iii]=="bk") {
                        bking=[ii,iii];
                    } else if (game2[ii][iii]=="wk") {
                        wking=[ii,iii];
                    }
                    pieces2[ii].push(new Piece(game2[ii][iii],iii,ii));
                }
            }
            if ((pieces2[wking[0]][wking[1]].isincheck(pieces2) && turn%2==0) || (pieces2[bking[0]][bking[1]].isincheck(pieces2) && turn%2==1)) {
                todelete.push(i);
            }
        }
        for (i=todelete.length;i>0;i--) {
            this.possmoves.splice(todelete[i-1],1);
        }
        return this.possmoves;
    }
    isincheck(tp=pieces) {
        var pm=0;
        if (this.type!="k") {
            console.log("nani");
            return;
        }
        for (var ii2=0;ii2<8;ii2++) {
            for (var jj2=0;jj2<8;jj2++) {
                if (tp[ii2][jj2].color==this.color) {
                    continue;
                }
                pm=tp[ii2][jj2].possiblemoves(tp,1);
                for (var z=0;z<pm.length;z++) {
                    if (pm[z][1]==this.py && pm[z][0]==this.px) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    showmoves(x) {
        fill(0,255,0,200);
        noStroke();
        rect(this.px*TILESIZE,this.py*TILESIZE,TILESIZE,TILESIZE);
        for (var i=0;i<x.length;i++) {
            if (promote[0]==0 && floor(mouseX/TILESIZE)==x[i][0] && floor(mouseY/TILESIZE)==x[i][1]) {
                rect(x[i][0]*TILESIZE,x[i][1]*TILESIZE,TILESIZE,TILESIZE);
            } else {
                ellipse((x[i][0]+0.5)*TILESIZE,(0.5+x[i][1])*TILESIZE,TILESIZE*0.3,TILESIZE*0.3);
            }
        }
    }
    draw() {
        if (this.type!=" ") {
            var thisimg=imgs[this.color+this.type];
            image(thisimg,(this.px+0.5)*TILESIZE-40,(this.py+0.5)*TILESIZE-40,80,80);
        }
    }
}
