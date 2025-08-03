// Service Worker 등록 및 PWA 기능
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('[PWA] Service Worker registered successfully:', registration);
        
        // 업데이트 확인
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // 새 버전 사용 가능 알림 (선택사항)
              console.log('[PWA] New version available. Refresh to update.');
            }
          });
        });
      })
      .catch((registrationError) => {
        console.log('[PWA] Service Worker registration failed:', registrationError);
      });
  });
}

// PWA 설치 프롬프트 처리
let deferredPrompt;
const installButton = document.createElement('button');
installButton.textContent = '앱 설치';
installButton.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #333;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  cursor: pointer;
  display: none;
  z-index: 1000;
  font-family: 'NexonLv1Gothic', sans-serif;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
`;

// 설치 프롬프트 이벤트 리스너
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('[PWA] Install prompt available');
  e.preventDefault();
  deferredPrompt = e;
  
  // 설치 버튼 표시
  document.body.appendChild(installButton);
  installButton.style.display = 'block';
});

// 설치 버튼 클릭 이벤트
installButton.addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] User accepted the install prompt');
      } else {
        console.log('[PWA] User dismissed the install prompt');
      }
      deferredPrompt = null;
      installButton.style.display = 'none';
    });
  }
});

// 앱이 설치되었을 때
window.addEventListener('appinstalled', () => {
  console.log('[PWA] App was installed successfully');
  installButton.style.display = 'none';
  deferredPrompt = null;
});

// 온라인/오프라인 상태 감지
window.addEventListener('online', () => {
  console.log('[PWA] Back online');
  // 온라인 상태 UI 업데이트 (선택사항)
});

window.addEventListener('offline', () => {
  console.log('[PWA] Gone offline');
  // 오프라인 상태 UI 업데이트 (선택사항)
});

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

// CEO 인사말은 이제 전체 내용을 바로 표시하므로 더보기/접기 기능 제거됨

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