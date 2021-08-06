var words = ["CARS", "HARRY POTTER", "RUN LOLA RUN", "HABABAM SINIFI", "TRANSFORMERS", "ALACAKARANLIK", "TWO WORLDS"];
var wordsLength = words.length;
var gameContinues = true;

var wordToGuessInd = Math.floor(Math.random() * wordsLength); // 0 ve 100 arasında sayı üretir.
var wordToGuess = words[wordToGuessInd];

// wordToGuessWo = wordToGuess.replace(/ /g,'');
wordToGuessSpace = []
var i = 0 ;
while(i<wordToGuess.length){
    if(wordToGuess[i]!=' '){
        wordToGuessSpace.push("_");}
    else{
        wordToGuessSpace.push(" ");
    }
    i+=1;
}

function startTheGame(){
    setArea(guessArea, wordToGuessSpace, '');
}

const guessArea = document.getElementById("guess-area");

function setArea(area, str, j){
    area.innerHTML = str.join(j);
}

// OYUNU BAŞLAT
window.addEventListener('load',()=> {
    startTheGame();
})

function cleanTheGuess(){
    guessInput.value='';
}


console.log(wordToGuess);
var adams = ["  /-  ", "  O  ",  "  /|\\  ", "  |  ", "  /\\  "];
var lives = 5;

var guessedArray = [];

// HARF TAHMİNİ YAP
const guessBtn = document.getElementById('guessBtn');
const guessInput = document.getElementById('guessInput');
const guessMan = document.getElementById('guess-man');
const guessedAlready = document.getElementById('guess-footer');

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
            
            setArea(guessArea, wordToGuessSpace, '');
            cleanTheGuess();

            if(! wordToGuessSpace.includes("_")){
                if(confirm("TEBRİKLER!! KAZANDIN\nTEKRAR OYNAMAK İÇİN LÜTFEN TAMAM'A BAS..")){
                    location.reload();
                }
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
                  })
                }
             
            else{
            alert("YANLIŞ TAHMİN:(\nLütfen tekrar dene..");}}
            
            
        }
    }
})

