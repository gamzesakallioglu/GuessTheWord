let movies = {0: ["CARS", "YABANCI-ANİMASYON-FİLM"],
1: ["HARRY POTTER", "YABANCI-FANSTASTİK-FİLM"],
2: ["HABABAM SINIFI", "YERLİ-KOMEDİ-FİLM"],
3: ["TRANSFORMERS", "YABANCI-FANTASTİK-FİLM"],
4: ["ALACAKARANLIK", "YABANCI-FANTASTİK-FİLM"],
5: ["TWO WORLDS", "YABANCI-FANTASTİK-DİZİ"],
6: ["AVRUPA YAKASI", "YERLİ-KOMEDİ-DİZİ"],
7: ["SOUL", "YABANCI-ANİMASYON-FİLM"]};

//var words = ["CARS", "HARRY POTTER", "RUN LOLA RUN", "HABABAM SINIFI", "TRANSFORMERS", "ALACAKARANLIK", "TWO WORLDS"];
var wordsLength = Object.keys(movies).length;

var wordToGuessInd = Math.floor(Math.random() * wordsLength);
var wordToGuess = movies[wordToGuessInd][0];
var wordToGuessType = movies[wordToGuessInd][1];

// wordToGuessWo = wordToGuess.replace(/ /g,'');
wordToGuessSpace = [];
var i = 0 ;
while(i<wordToGuess.length){
    if(wordToGuess[i]==' '){
        wordToGuessSpace.push("/");}
    else if(wordToGuess[i]=="'" | wordToGuess[i]=="-"){
        wordToGuessSpace.push(wordToGuess[i]);
    }
    else{
        wordToGuessSpace.push('_');
    }
    i+=1;
}

function startTheGame(){
    setArea(guessArea, wordToGuessSpace, ' ');
    setAreaWo(guessType, "TÜR: "+wordToGuessType);
}

const guessType = document.getElementById("guess-type");
const guessArea = document.getElementById("guess-area");

function setArea(area, str, j){
    area.innerHTML = str.join(j);
}

function setAreaWo(area, str){
    area.innerHTML = str;
}

// OYUNU BAŞLAT
window.addEventListener('load',()=> {
    startTheGame();
})

function cleanTheGuess(){
    guessInput.value='';
}

console.log(wordToGuessType);
console.log(wordToGuess);
var adams = ["  /-  ", "  O  ",  "  /|\\  ", "  |  ", "  /\\  "];
var lives = 5;

var guessedArray = [];

// HARF TAHMİNİ YAP
const guessBtn = document.getElementById('guessBtn');
const guessInput = document.getElementById('guessInput');
const guessMan = document.getElementById('guess-man');
const guessedAlready = document.getElementById('guess-footer');

guessInput.addEventListener('keyup', (event) => {
    if(event.keyCode == 13) guessBtn.click();
})

guessBtn.addEventListener('click', ()=>{
    var guessedChar = guessInput.value;
    var charCode = guessedChar.charCodeAt(0);
    if(!((charCode>=65 && charCode<=90) || (charCode>=97 && charCode<=122))){
        alert("Lütfen bir harf giriniz..");
    }
    
    else{
        guessedChar = guessedChar.toUpperCase();
        if(wordToGuess.includes(guessedChar)){
            // DOĞRU TAHMİN, TAHMİN STRINGINI DEĞİŞTİR
            i=0;
            while(i<wordToGuess.length){
                if(wordToGuess[i] == guessedChar){
                    wordToGuessSpace[i] = guessedChar;
                }
                i+=1;
            }
            
            setArea(guessArea, wordToGuessSpace, ' ');
            cleanTheGuess();

            if(! wordToGuessSpace.includes("_")){
                swal({
                    title: "TEBRİKLER KAZANDINIZ..",
                    text: "Tekrar oynamak için lütfen TAMAM'a basın",
                    icon: "success",
                    confirmButtonClass: "btn-success",
                    button: "TAMAM",
                  }).then((value) => {
                      location.reload();
                  });
                
            }
            
        }

        // YANLIŞ TAHMİN, UYARI VER VE ADAM ASMACA EKLE
        // DAHA ÖNCEDEN YANLIŞ TAHMİN EDİLEN HARFLERİ BİR YERDE TOPLA
        else{
            if(guessedArray.includes(guessedChar)){
                alert("Bu tahmini daha önce yaptınız. Lütfen başka bir harf giriniz..");
                cleanTheGuess();
            }
            else{
            guessedArray.push(guessedChar);
            setArea(guessedAlready, guessedArray, "-");
            cleanTheGuess();

            lives-=1;

            setArea(guessMan, adams.slice(0, 5-lives), "<br />");
            if(lives<=0){
                swal({
                    title: "MAALESEF KAZANAMADINIZ..",
                    text: "Doğru Cevap: "+wordToGuess+"\nTekrar oynamak için lütfen TAMAM'a basın",
                    icon: "sad.jpg",
                    confirmButtonClass: "btn-success",
                    button: "TAMAM",
                  }).then((value) => {
                      location.reload();
                  });
                }
             
            else{
            alert("YANLIŞ TAHMİN:(\nLütfen tekrar dene..");}}
            
            
        }
    }
})

