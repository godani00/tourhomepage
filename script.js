// 로그인 버튼 클릭 이벤트
document.querySelector('.login-btn').addEventListener('click', function() {
    // 로그인 기능은 추후 구현
    alert('로그인 기능은 현재 준비중입니다.');
});

// 스크롤 이벤트에 따른 헤더 스타일 변경
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // 스크롤 방향 감지
    if (currentScroll > lastScroll) {
        // 아래로 스크롤
        header.style.transform = 'translateY(-100%)';
    } else {
        // 위로 스크롤
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// 캐러셀 기능 구현
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    const slideInterval = 5000; // 5초마다 슬라이드 전환
    let slideTimer;

    // 슬라이드 표시 함수
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    // 다음 슬라이드로 이동
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // 이전 슬라이드로 이동
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // 자동 슬라이드 시작
    function startSlideTimer() {
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    // 자동 슬라이드 정지
    function stopSlideTimer() {
        clearInterval(slideTimer);
    }

    // 이벤트 리스너 등록
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideTimer();
        startSlideTimer();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideTimer();
        startSlideTimer();
    });

    // 초기 슬라이드 표시
    showSlide(currentSlide);
    startSlideTimer();

    // 마우스가 캐러셀 위에 있을 때 자동 전환 멈춤
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopSlideTimer);
    carousel.addEventListener('mouseleave', startSlideTimer);
});

// 더보기 버튼 기능
document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productInfo = this.closest('.product-info');
            const fullDescription = productInfo.querySelector('.product-description-full');
            const shortDescription = productInfo.querySelector('.product-description');

            if (fullDescription.style.display === 'none' || !fullDescription.style.display) {
                fullDescription.style.display = 'block';
                shortDescription.style.display = 'none';
                this.textContent = '접기';
            } else {
                fullDescription.style.display = 'none';
                shortDescription.style.display = 'block';
                this.textContent = '더보기';
            }
        });
    });
});

// CEO 인사말 더보기/접기 기능
document.addEventListener('DOMContentLoaded', function() {
    const greetingMoreBtn = document.querySelector('.greeting .read-more-btn');
    const greetingLessBtn = document.querySelector('.greeting .read-less-btn');
    const messagePreview = document.querySelector('.message-preview');
    const messageFull = document.querySelector('.message-full');

    if (greetingMoreBtn && greetingLessBtn) {
        greetingMoreBtn.addEventListener('click', function() {
            messagePreview.style.display = 'none';
            messageFull.style.display = 'block';
            greetingMoreBtn.style.display = 'none';
            greetingLessBtn.style.display = 'inline-block';
        });

        greetingLessBtn.addEventListener('click', function() {
            messagePreview.style.display = 'block';
            messageFull.style.display = 'none';
            greetingMoreBtn.style.display = 'inline-block';
            greetingLessBtn.style.display = 'none';
        });
    }
});

// Q&A 질문 접수 메시지 기능
document.addEventListener('DOMContentLoaded', function() {
    const qnaForm = document.querySelector('.qna-form');
    const qnaReply = document.querySelector('.qna-reply');
    if (qnaForm && qnaReply) {
        qnaForm.addEventListener('submit', function(e) {
            e.preventDefault(); // 폼 제출 막기
            qnaReply.style.display = 'block'; // 접수 메시지 보이기
            qnaForm.reset(); // 폼 초기화
            setTimeout(() => {
                qnaReply.style.display = 'none'; // 3초 후 메시지 숨김
            }, 3000);
        });
    }
}); 