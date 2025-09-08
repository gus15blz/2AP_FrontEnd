var ptJog = document.getElementById('ptsJog');
var ptPc = document.getElementById('ptsPc');
var escPc = 0;
var ptsP1 = 0;
var ptsPc = 0;
var controle = false;

function novoJogo(){
    ptsP1 = 0;
    ptsPc = 0;
    ptJog.innerHTML = ptsP1;
    ptPc.innerHTML = ptsPc;
    controle = false;
}