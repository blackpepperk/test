const itemInputs = document.querySelectorAll('.item-input');
const rouletteWheel = document.querySelector('.roulette-wheel');
const spinButton = document.getElementById('spin-button');

let isSpinning = false;
let rotation = 0;

// 3. 입력값에 따라 룰렛 섹션을 동적으로 생성하고 업데이트하는 함수
function updateRoulette() {
    const items = Array.from(itemInputs).map(input => input.value.trim()).filter(val => val.length > 0);
    const numItems = items.length;

    if (numItems === 0) {
        rouletteWheel.innerHTML = '항목을 입력하세요.';
        return;
    }

    const anglePerItem = 360 / numItems;
    rouletteWheel.innerHTML = ''; // 기존 섹션 제거

    items.forEach((item, index) => {
        const section = document.createElement('div');
        section.classList.add('roulette-section');

        // 각 섹션의 배경색 지정 (임의의 색상 패턴)
        const bgColor = index % 2 === 0 ? '#ff6347' : '#ffa07a'; // 토마토 vs 연어색
        
        section.style.backgroundColor = bgColor;
        section.style.transform = `rotate(${anglePerItem * index}deg) skewY(-${90 - anglePerItem}deg)`;

        // 텍스트는 섹션 내에서 다시 회전하여 똑바로 보이도록 조정
        const textContainer = document.createElement('div');
        textContainer.classList.add('section-text');
        textContainer.textContent = item;
        textContainer.style.transform = `rotate(${anglePerItem / 2}deg) skewY(${90 - anglePerItem}deg) translate(-50%)`;

        section.appendChild(textContainer);
        rouletteWheel.appendChild(section);
    });
}

// 2. 버튼 클릭 시 룰렛 회전 또는 정지 함수
function toggleSpin() {
    if (isSpinning) {
        // 정지 로직 (터치/클릭 시 멈춤)
        stopSpin();
    } else {
        // 회전 시작 로직
        startSpin();
    }
}

function startSpin() {
    isSpinning = true;
    spinButton.textContent = '멈추기';
    
    // 무작위로 5~10바퀴 (1800도 ~ 3600도) 회전
    const randomTurns = Math.floor(Math.random() * 6) + 5; 
    const randomStopAngle = Math.floor(Math.random() * 360); // 멈출 최종 각도

    rotation += 360 * randomTurns + randomStopAngle; 
    
    // CSS transition을 이용하여 회전 적용
    rouletteWheel.style.transition = 'transform 5s cubic-bezier(0.2, 0.8, 0.7, 0.99)';
    rouletteWheel.style.transform = `rotate(${rotation}deg)`;
}

function stopSpin() {
    isSpinning = false;
    spinButton.textContent = '룰렛 돌리기';
    
    // 회전 애니메이션이 끝난 후 (5초 후) 멈춤 처리
    setTimeout(() => {
        // 실제 멈춘 위치를 계산하고 하이라이트 표시 등 추가 가능
        // 현재는 멈춤 상태만 처리
    }, 5000); 
}

// 초기 로드 시 룰렛 생성 및 입력값 변경 시 업데이트 리스너 추가
updateRoulette();
itemInputs.forEach(input => {
    input.addEventListener('input', updateRoulette);
});
spinButton.addEventListener('click', toggleSpin);

// 터치 이벤트도 클릭 이벤트와 동일하게 작동
spinButton.addEventListener('touchend', (e) => {
    e.preventDefault(); // 모바일 환경에서 터치 이벤트가 중복 실행되는 것을 방지
    toggleSpin();
});
