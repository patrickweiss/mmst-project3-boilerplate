export default class Diagram {
    constructor(size,ctx,shapes) {
      this.size = size;
      this.bkgd = "white";
      this.color = "black";
      this.ctx = ctx; 
      this.ctx.fillStyle = this.bkgd;
      this.ctx.fillRect(0,0,size,size);
      this.ctx.fillStyle = this.color;
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = 1.2;
      this.symbols = shapes; 
   }
   
    addSymbol(id) {
      if (this.symbols.includes(id)) return;
      this.symbols.push(id);
      this._drawSymbol(id);
    }
   
    deleteSymbol(id) {
      if (!this.symbols.includes(id)) return;
      this.symbols.splice(this.symbols.indexOf(id), 1);
      this._clear();
      this._redraw();
    }
  
    clearDiagram() {
      this.symbols = [];
      this._clear();
    }    
  
    _clear() {
      this.ctx.clearRect(0,0,this.size,this.size);
      this.ctx.fillStyle = this.bkgd;
      this.ctx.fillRect(0,0,this.size,this.size);
      this.ctx.fillStyle = this.color;
    }
  
    _redraw() {
      let s;
      for (s of this.symbols) this._drawSymbol(s);
    }
  
    _drawSymbol(id) {
      switch (id)  {
        case "A1": this._drawA1(); break;
        case "A2": this._drawA2(); break;
        case "A3": this._drawA3(); break;
        case "A4": this._drawA4(); break;
        case "B1": this._drawB1(); break;
        case "B2": this._drawB2(); break;
        case "B3": this._drawB3(); break;
        case "B4": this._drawB4(); break;
        case "C1": this._drawC1(); break;
        case "C2": this._drawC2(); break;
        case "C3": this._drawC3(); break;
        case "C4": this._drawC4(); break;
        case "D1": this._drawD1(); break;
        case "D2": this._drawD2(); break;
        case "D3": this._drawD3(); break;
        case "D4": this._drawD4(); break;
        case "E1": this._drawE1(); break;
        case "E2": this._drawE2(); break;
        case "E3": this._drawE3(); break;
        case "E4": this._drawE4(); break;
        case "F1": this._drawF1(); break;
        case "F2": this._drawF2(); break;
        case "F3": this._drawF3(); break;
        case "F4": this._drawF4(); break;
        case "Left": this._drawLeft(); break;
        case "Right": this._drawRight(); break;
        case "RightCompl": this._drawRightCompl(); break;
        case "AND": this._drawAND(); break;
        case "OR": this._drawOR(); break;
        case "XOR": this._drawXOR(); break;
        default:
     }         
   }
  
    _drawA1() {
      //Line vertical
      this.ctx.beginPath();
      this.ctx.moveTo(this.size/2, 0);
      this.ctx.lineTo(this.size/2, this.size);
      this.ctx.stroke();
    }
  
    _drawA2() {
      //Line horizontal
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.size/2);
      this.ctx.lineTo(this.size, this.size/2);
      this.ctx.stroke();
    }
  
    _drawA3() {
      //Diagonal left
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(this.size, this.size);
      this.ctx.stroke();
    }
  
    _drawA4() {
      //Diagonal right
      this.ctx.beginPath();
      this.ctx.moveTo(this.size, 0);
      this.ctx.lineTo(0, this.size);
      this.ctx.stroke();
    }
  
    _drawB1() {
      //Arc top left
      const r = this.size/2 - 6;
      this.ctx.beginPath();
      this.ctx.arc(this.size/2, this.size/2, r, 1*Math.PI, 1.5*Math.PI);
      this.ctx.stroke();
    }
  
    _drawB2() {
      //Arc top right
      const r = this.size/2 - 6;
      this.ctx.beginPath();
      this.ctx.arc(this.size/2, this.size/2, r, 1.5*Math.PI, 0);
      this.ctx.stroke();
    }
  
    _drawB3() {
      //Arc bottom left
      const r = this.size/2 - 6;
      this.ctx.beginPath();
      this.ctx.arc(this.size/2, this.size/2, r, 0.5*Math.PI, 1*Math.PI);
      this.ctx.stroke();
    }
    
    _drawB4() {
      //Arc bottom right
      const r = this.size/2 - 6;
      this.ctx.beginPath();
      this.ctx.arc(this.size/2, this.size/2, r, 0, 0.5*Math.PI);
      this.ctx.stroke();
    }
  
    _drawC1() {
      //Dot top left
      this.ctx.beginPath();
      this.ctx.arc(4,4, 2.5, 0, 2*Math.PI);
      this.ctx.fill();
    }
  
    _drawC2() {
      //Dot top right
      this.ctx.beginPath();
      this.ctx.arc(this.size-4,4, 2.5, 0, 2*Math.PI);
      this.ctx.fill();
    }
  
    _drawC3() {
      //Dot bottom right
      this.ctx.beginPath();
      this.ctx.arc(this.size-4,this.size-4, 2.5, 0, 2*Math.PI);
      this.ctx.fill();
    }
  
    _drawC4() {
      //Dot bottom left
      this.ctx.beginPath();
      this.ctx.arc(4,this.size-4, 2.5, 0, 2*Math.PI);
      this.ctx.fill();
    }
  
    _drawD1() {
      //Star small
      const r = 0.1*this.size;
      this._strokeStar(this.ctx, this.size/2, this.size/2, r, 8, 0.6)
    }
  
    _drawD2() {
      //Star medium
      const r = 0.16*this.size;
      this._strokeStar(this.ctx, this.size/2, this.size/2, r, 8, 0.6)
    }
  
    _drawD3() {
      //Star large
      const r = 0.22*this.size;
      this._strokeStar(this.ctx, this.size/2, this.size/2, r, 8, 0.6)
    }
  
    _drawD4() {
      //Square
      const a = this.size - 4;
      this.ctx.beginPath();
      this.ctx.moveTo(2, 2);
      this.ctx.lineTo(a+2, 2);
      this.ctx.lineTo(a+2, a+2);
      this.ctx.lineTo(2, a+2);
      this.ctx.closePath();
      this.ctx.stroke();
    }
  
    _drawE1() {
      //Arrow up
      this.ctx.beginPath();
      this.ctx.moveTo(this.size/2, this.size/2-8);
      this.ctx.lineTo(this.size/2+6, this.size/2);
      this.ctx.lineTo(this.size/2-6, this.size/2);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.lineWidth = 4;
      this.ctx.beginPath();
      this.ctx.moveTo(this.size/2, this.size/2);
      this.ctx.lineTo(this.size/2, this.size/2+8);
      this.ctx.stroke();
      this.ctx.lineWidth = 1;
    }
  
    _drawE2() {
    //Arrow right
    this.ctx.beginPath();
    this.ctx.moveTo(this.size/2+8, this.size/2);
    this.ctx.lineTo(this.size/2, this.size/2+6);
    this.ctx.lineTo(this.size/2, this.size/2-6);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(this.size/2, this.size/2);
    this.ctx.lineTo(this.size/2-8, this.size/2);
    this.ctx.stroke();
    this.ctx.lineWidth = 1;
    }
  
    _drawE3() {
    //Arrow down
    this.ctx.beginPath();
    this.ctx.moveTo(this.size/2, this.size/2+8);
    this.ctx.lineTo(this.size/2-6, this.size/2);
    this.ctx.lineTo(this.size/2+6, this.size/2);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(this.size/2, this.size/2);
    this.ctx.lineTo(this.size/2, this.size/2-8);
    this.ctx.stroke();
    this.ctx.lineWidth = 1;
    }
  
    _drawE4() {
    //Arrow left
    this.ctx.beginPath();
    this.ctx.moveTo(this.size/2-8, this.size/2);
    this.ctx.lineTo(this.size/2, this.size/2-6);
    this.ctx.lineTo(this.size/2, this.size/2+6);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(this.size/2, this.size/2);
    this.ctx.lineTo(this.size/2+8, this.size/2);
    this.ctx.stroke();
    this.ctx.lineWidth = 1;
    }
  
    _drawF1() {
      //Circle top
      this.ctx.beginPath();
      this.ctx.arc(this.size/2,6, 3, 0, 2*Math.PI);
      this.ctx.stroke();
    }
  
    _drawF2() {
      //Circle bottom
      this.ctx.beginPath();
      this.ctx.arc(this.size/2,this.size-6, 3, 0, 2*Math.PI);
      this.ctx.stroke();
    }
  
    _drawF3() {
      //Circle left
      this.ctx.beginPath();
      this.ctx.arc(6,this.size/2, 3, 0, 2*Math.PI);
      this.ctx.stroke();
    }
  
    _drawF4() {
      //Circle right
      this.ctx.beginPath();
      this.ctx.arc(this.size-6,this.size/2, 3, 0, 2*Math.PI);
      this.ctx.stroke();
    }
  
    _strokeStar(ctx, x, y, r, n, inset) {
    //Adaptable to any shape with rotational symmetry
    //from https://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(0,0-r);
    for (var i = 0; i < n; i++) {
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - (r*inset));
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    }

    _drawLeft() {
      //Left paranthesis
      const r = 0.8*this.size;
      this.ctx.beginPath();
      this.ctx.arc(1.5*this.size, this.size/2, r, 0.5*Math.PI, 1.5*Math.PI);
      this.ctx.stroke();
    }

    _drawRight() {
      //Right paranthesis and equality sign
      const r = 0.8*this.size;
      this.ctx.beginPath();
      this.ctx.arc(-0.5*this.size, this.size/2, r, 1.5*Math.PI, 0.5*Math.PI);
      this.ctx.moveTo(0.6*this.size, 0.45*this.size);
      this.ctx.lineTo(0.9*this.size, 0.45*this.size);
      this.ctx.moveTo(0.6*this.size, 0.55*this.size);
      this.ctx.lineTo(0.9*this.size, 0.55*this.size);
      this.ctx.stroke();
    }

    _drawRightCompl() {
      //Right paranthesis, complement symbol and equality sign
      this._drawRight();
      const r = 0.12*this.size;
      this.ctx.beginPath();
      this.ctx.arc(0.5*this.size, 0.14*this.size, r, 0.4*Math.PI, 1.6*Math.PI);
      this.ctx.stroke();            
    }

    _drawAND() {
      //Union operator
      const r = 0.25*this.size;
      this.ctx.beginPath();
      this.ctx.arc(0.6*this.size, 0.6*this.size, r, Math.PI, 2*Math.PI);
      this.ctx.moveTo(0.6*this.size+r, 0.6*this.size);
      this.ctx.lineTo(0.6*this.size+r, 0.75*this.size);
      this.ctx.moveTo(0.6*this.size-r, 0.6*this.size);
      this.ctx.lineTo(0.6*this.size-r, 0.75*this.size);
      this.ctx.stroke();       
    }

    _drawOR() {
      //Intersection operator
      const r = 0.25*this.size;
      this.ctx.beginPath();
      this.ctx.arc(0.6*this.size, 0.6*this.size, r, 0, Math.PI);
      this.ctx.moveTo(0.6*this.size+r, 0.6*this.size);
      this.ctx.lineTo(0.6*this.size+r, 0.45*this.size);
      this.ctx.moveTo(0.6*this.size-r, 0.6*this.size);
      this.ctx.lineTo(0.6*this.size-r, 0.45*this.size);
      this.ctx.stroke();   

    }

    _drawXOR() {
      //Symmetric difference operator
      this.ctx.beginPath();
      this.ctx.moveTo(0.5*this.size, 0.25*this.size);
      this.ctx.lineTo(0.8*this.size, 0.75*this.size);
      this.ctx.lineTo(0.2*this.size, 0.75*this.size);
      this.ctx.closePath();
      this.ctx.stroke();
    }
  
  }  //end of Diagram class

  export function decodePicture(hexPic) {
    //return array of symbols for display in a diagram
    let categories = ["A","B","C","D","E","F"];
    let res = [];
    
    //Padding leading zeros to get the hexPic of LENGTH 6!!!
    let padded = "0000000000" + hexPic;
    let valid = padded.substr(padded.length - 6);
    
    for (let i = 0; i < categories.length; i++)  {
      let catName = categories[i];
      let numCat = parseInt(valid.charAt(i), 16);
      let shape1 =  (numCat & 8) >> 3;
      let shape2 =  (numCat & 4) >> 2;
      let shape3 =  (numCat & 2) >> 1;
      let shape4 =  (numCat & 1);
      if (shape1) res.push(catName+"1");  
      if (shape2) res.push(catName+"2");  
      if (shape3) res.push(catName+"3");  
      if (shape4) res.push(catName+"4");  
    } 
    return res;   
  }
  
export function encodePicture(symbols) {
    //return a hexadecimal string 6-char long
    let categories = ["A","B","C","D","E","F"];
    let res = "";  
    for (let i = 0; i < categories.length; i++)  {  
      let cat =  categories[i];
      let d1 = symbols.includes(cat+"1");
      let d2 = symbols.includes(cat+"2");
      let d3 = symbols.includes(cat+"3");
      let d4 = symbols.includes(cat+"4");
      let r = (d1*8 + d2*4 + d3*2 + d4).toString(16);
      res = res + r;
    }  
    return res;  
  } 




