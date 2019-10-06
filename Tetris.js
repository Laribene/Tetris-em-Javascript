var NCOL= prompt ("Digite a largura do tabuleiro");//Quantidade de colunas da matriL base
var NLIN= prompt ("Digite a altura do tabuleiro");//Quantidade de linhas da matriL base

const pixel = 20;//Tamanho dos blocos da matriL base //Podemos mudar para Square ou quadrado essa const ?
const EMPTY_SQ = "WHITE";

var canvas = document.getElementById('MatriL');//Pegar a matriL principal pelo ID
var blocos = canvas.getContext("2d");//Efeito 2d
var intervalo = setInterval(tickMovimentation, 1000);
var base = []; //MatriL de base
var linha_nova=0;
var coluna_nova=0;


//Criando a MatriL base
for (linha = 0 ;linha < NLIN ; linha++){ //Gera linhas
    base[linha]= [];
    for(coluna = 0; coluna < NCOL ;coluna++){//Gera colunas
        base[linha][coluna] = EMPTY_SQ;
    }
}

function criarBlocosMatriL(linha, coluna, cor) {
    blocos.fillStyle = EMPTY_SQ ;
    blocos.fillRect(linha*pixel, coluna*pixel, pixel, pixel);
    blocos.strokeStyle = "BLACK";
    blocos.strokeRect(linha*pixel, coluna*pixel, pixel, pixel);
}

function mostrarMatriL() {
    for (linha = 0 ;linha < NLIN ; linha++){
        for(coluna = 0; coluna < NCOL ;coluna++){
              criarBlocosMatriL(coluna, linha, base[coluna][linha]);
        }
    }
}   
mostrarMatriL();

             //L[0]                     L[1] = posição girada 90 >    L[2] posição girada 180 >  L[3] posição girada 270 > 

const L = [ [ [0,0,1],[1,1,1],[0,0,0]],[ [1,0,0],[1,0,0],[1,1,0]],[ [1,1,1],[1,0,0],[0,0,0]],[ [0,1,1],[0,0,1],[0,0,1]]]; //L normal

const M = [ [ [1,1,0],[1,1,0],[0,0,0]],[ [1,1,0],[1,1,0],[0,0,0]],[ [1,1,0],[1,1,0],[0,0,0]],[ [1,1,0],[1,1,0],[0,0,0]]]; //quadrado

const N = [ [ [1,0,0],[1,1,1],[0,0,0]],[ [1,1,0],[1,0,0],[1,0,0]],[ [1,1,1],[0,0,1],[0,0,0]],[ [0,0,1],[0,0,1],[0,1,1]]]; //L invertido

const O = [ [ [0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]],[ [0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],[ [0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]],[ [0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]]]; // |

const Y = [ [ [0,1,0],[1,1,1],[0,0,0]],[ [0,1,0],[0,1,1],[0,1,0]],[ [0,0,0],[1,1,1],[0,1,0]],[ [0,1,0],[1,1,0],[0,1,0]]]; // _|_

const U = [ [ [1,0,1],[1,1,1],[0,0,0]],[ [0,1,1],[0,1,0],[0,1,1]],[ [0,0,0],[1,1,1],[1,0,1]],[ [1,1,0],[0,1,0],[1,1,0]]]; //U             







function peca_aleatoria(){ //função para gerar peça aleatoria
  
  switch((Math.floor(Math.random()*6)+1)){
    case 1:
      this.cor = "blue"
      this.Tetramino = L;
      Peca(Tetramino,cor);
      break;
    case 2:
      this.cor = "red"
      this.Tetramino = M;
      Peca(Tetramino,cor);
      break;
    case 3:
      this.cor = "green"
      this.Tetramino = N;
      Peca(Tetramino,cor);
    break;
    case 4:
      this.cor = "Gold"
      this.Tetramino = O;
      Peca(Tetramino,cor);
    break;
    case 5:
      this.cor = "DeepPink"
      this.Tetramino = Y;
      Peca(Tetramino,cor);
    break;
    case 6:
      this.cor = "purple"
      this.Tetramino = U;
      Peca(Tetramino,cor);
    break;
  }
}

peca_aleatoria(); //chamar peça aleatoria pela primeira vez

var GoTetramino; //acho q nem precisa disso aqui
//Criando um prototipo da funcao para faLer os varios tipos de blocos

function Peca(Tetramino,cor){
    this.Tetramino=Tetramino;
    this.TetraminoN=0;//Mostra a posicao inicial do bloco (no caso L[0])
    this.GoTetramino = this.Tetramino[this.TetraminoN]; //Vá bloco L = bloco [posicao0]
    this.cor=cor;
    this.linha=NLIN-4;//posicao inicial do bloco
    this.coluna=Math.floor((NCOL/2)-1);//posicao inicial acima da matriL principal (Para cair dps)
    //Geração das pecas na tela 
                    //(linha+linhaInicial) < (LinhaInicial+TamanhoDaPeca)
    GoTetramino = this.GoTetramino;
    linha_nova = this.linha;
    coluna_nova = this.coluna;
    drawPiece();    
}

function deletePiece(){
    for (linha = 0; (linha+linha_nova) < (linha_nova+ GoTetramino.length) ;  linha++) { //conta o tamanho (3x3) ou (4x4)
        //(coluna+ColunaInicial) < (ColunaInicial+TamanhoDaPeca)
        for (coluna = 0; (coluna + coluna_nova) < (coluna_nova + GoTetramino.length) ; coluna++) {
            if(GoTetramino[linha][coluna] == 1){
                blocos.fillStyle = EMPTY_SQ ; //Define a cor do bloco gerado
                blocos.fillRect((coluna_nova+coluna)*pixel, (linha+linha_nova)*pixel, pixel, pixel);//Linha*tamDoBloco,Coluna*TamDoBloco, TamDoBloco,TamDoBloco
                blocos.strokeRect((coluna_nova+coluna)*pixel, (linha+linha_nova)*pixel, pixel, pixel);
            }
        }
    }
}

function drawPiece(){
    for (linha = 0; (linha+linha_nova) < (linha_nova+ GoTetramino.length) ;  linha++) { //conta o tamanho (3x3) ou (4x4)
        //(coluna+ColunaInicial) < (ColunaInicial+TamanhoDaPeca)
        for (coluna = 0; (coluna + coluna_nova) < (coluna_nova + GoTetramino.length) ; coluna++) {
            if(GoTetramino[linha][coluna] == 1){
                blocos.fillStyle = cor ; //Define a cor do bloco gerado
                blocos.fillRect((coluna_nova+coluna)*pixel, (linha+linha_nova)*pixel, pixel, pixel);//Linha*tamDoBloco,Coluna*TamDoBloco, TamDoBloco,TamDoBloco
                blocos.strokeRect((coluna_nova+coluna)*pixel, (linha+linha_nova)*pixel, pixel, pixel);
            }
        }
    }
}

function tickMovimentation() { //Função para a movimentação constante da peça
    if(checkColision(-1, 0, GoTetramino)){
        drawPieceOnBoard();
        peca_aleatoria();
       
    }
    else{
        deletePiece(); //apagar peça antes de mover
        linha_nova--; //sobe a peça
        drawPiece(); //desenha a peça no lugar novo
    }
}

document.onkeydown = function(event) { //função para detectar as setas do teclado que sao pressionadas
    switch (event.keyCode) {
       case 37: //se for a seta <
            var arrow = 37;
            arrowMovimentation(arrow);
          break;
       case 38: //se for a seta ^
            arrow = 38;
            arrowMovimentation(arrow);
          break;
       case 39: //se for a seta >
            var arrow = 39;
            arrowMovimentation(arrow);
          break;
       case 40: //se for a seta para baixo
            rotatePiece();
          break;
    }
};

function arrowMovimentation(arrow){ // funcao de movimentaçao horizontal da peça
    if(arrow == 37)
    {
        if(checkColision(0, -1, GoTetramino)){
            return false;
        }
        else{
            deletePiece();
            coluna_nova--;
            drawPiece();
        }
    }
    else
    if(arrow == 39)
    {
        if(checkColision(0, 1, GoTetramino)){
            return false;
        }
        else{
            deletePiece();
            coluna_nova++;
            drawPiece();
        }
    }
    else
    if(arrow = 38)
    {
        if(checkColision(-1, 0, GoTetramino)){
            drawPieceOnBoard();
            peca_aleatoria();
            return false;

        }
        else{
            deletePiece();
            linha_nova--;
            drawPiece();
        }
    }
}

function checkColision(r, c, futurePiece){
    for(linha = 0 ; linha < GoTetramino.length ; linha++){
        for(coluna = 0 ; coluna < GoTetramino.length ; coluna++){
            if(futurePiece[linha][coluna] != 0){
                let nextRow;
                let nextCol;
                nextRow = linha + r + linha_nova;
                nextCol = coluna + c + coluna_nova;
                if(nextRow < 0 || nextCol < 0 || nextCol > NCOL){
                    return true;
                }
                if(base[nextRow][nextCol] != EMPTY_SQ){
                    return true;
                }
                else{
                    continue;
                }
            }
            else{
                continue;
            }
        }
    }
    return false;
}

function drawPieceOnBoard(){
    for(linha = 0 ; linha < GoTetramino.length ; linha++){
        for(coluna = 0 ; coluna < GoTetramino.length ; coluna++){
            if(GoTetramino[linha][coluna] == 1){
                base[linha+linha_nova][coluna+coluna_nova] = cor;
                blocos.fillStyle = cor ; //Define a cor do bloco gerado
                blocos.fillRect((coluna_nova+coluna)*pixel, (linha+linha_nova)*pixel, pixel, pixel);//Linha*tamDoBloco,Coluna*TamDoBloco, TamDoBloco,TamDoBloco
                blocos.strokeRect((coluna_nova+coluna)*pixel, (linha+linha_nova)*pixel, pixel, pixel);
            }
        }
    }
}

function rotatePiece(){
    let futureN = TetraminoN;
    let futureTetramino = GoTetramino;
    if(futureN == 3){
        futureN = 0;
        futureTetramino = Tetramino[futureN];
    }
    else{
        futureN++;
        futureTetramino = Tetramino[futureN];
    }
    if(checkColision(0, 0, futureTetramino)){
        return false;
    }
    else{
        deletePiece();
        TetraminoN = futureN;
        GoTetramino = futureTetramino;
        drawPiece();
    }
}