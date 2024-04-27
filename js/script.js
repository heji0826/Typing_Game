let score=0;
const GAME_TIME=5;
let isPlaying=false;
let timeInterval;
let words=[];
let checkInterval;

const wordInput=document.querySelector('.word-input');			//단어 입력 input
const wordDisplay=document.querySelector('.word-display');		//단어 보여주는 div
const scoreView=document.querySelector('.score');				//점수
const timeView=document.querySelector('.time');					//시간
const button=document.querySelector('.button');					//시작 버튼


init();
//맨처음 실행될
function init(){
	buttonChange('게임로딩중...')
	getwords()	
	wordInput.addEventListener( "input",checkMatch);
}

//버튼 클릭시 시작
function run(){	
	if(isPlaying){
		return;
	}
	isPlaying=true;
	time=GAME_TIME;
	wordInput.focus();
	timeInterval=setInterval(countDown,1000);
	checkInterval=setInterval(checkStatus,50);
	buttonChange('게임중');
}

// setInterval에서 체크할 현 상황
function checkStatus(){
	if(!isPlaying && time===0){
		buttonChange('게임시작');
		clearInterval(checkInterval);
	}
}


// 단어 불러오기
function getwords(){
axios.get('https://random-word-api.herokuapp.com/word?number=100')  // 단어 랜덤 api
  .then(function (response) {
  	response.data.forEach((word)=>{
  	if(word.length<10){
  		words.push(word);
  	}
  	})
    // handle success
   buttonChange('게임시작');
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
	
}
// 단어 일치 체크
function checkMatch(){
	if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
		wordInput.value="";
		if(!isPlaying){
			return;
		}
		score++;
		scoreView.innerText=score;
		time=GAME_TIME;
		const randomIndex= Math.floor( Math.random()*words.length);
		wordDisplay.innerText=words[randomIndex];
}
}


//초 계산
function countDown() {
	time>0?time--:isPlaying=false;
	if(!isPlaying){
		clearInterval(timeInterval);
	}
	timeView.innerText=time;
}

// 버튼 이름 및 클래스 추가,삭제
function buttonChange(text){
	button.innerText=text;
	text==='게임시작'? button.classList.remove('loading'):button.classList.add('loading');
}