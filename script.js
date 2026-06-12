document.addEventListener("DOMContentLoaded", () => {

  //////////////////////////////////////
  // 🔥 슬라이드

  let slides = document.querySelectorAll(".slide");
  let index = 0;
  let autoSlide;

  function showSlide(i) {

    slides.forEach(slide =>
      slide.classList.remove("active")
    );

    slides[i].classList.add("active");
  }

  function nextSlide() {

    index = (index + 1) % slides.length;

    showSlide(index);
  }

  function prevSlide() {

    index =
      (index - 1 + slides.length)
      % slides.length;

    showSlide(index);
  }

  if (slides.length > 0) {

    autoSlide =
      setInterval(nextSlide, 2000);

  }

  let nextBtn =
    document.querySelector(".next");

  let prevBtn =
    document.querySelector(".prev");

  if (nextBtn && prevBtn) {

    nextBtn.addEventListener("click", () => {

      nextSlide();

      resetAuto();

    });

    prevBtn.addEventListener("click", () => {

      prevSlide();

      resetAuto();

    });

  }

  function resetAuto() {

    clearInterval(autoSlide);

    autoSlide =
      setInterval(nextSlide, 2000);

  }

  
  //////////////////////////////////////
  // 🔥 스크롤 애니메이션

 window.revealOnScroll = function() {

  let reveals =
    document.querySelectorAll(".reveal");

  reveals.forEach(el => {

    let windowHeight =
      window.innerHeight;

    let elementTop =
      el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {

      el.classList.add("active");

    }

  });

}

window.addEventListener(
  "scroll",
  revealOnScroll
);

window.revealOnScroll();

  //////////////////////////////////////
  // 🔥 이미지 확대

  let lightbox =
    document.getElementById("lightbox");

  let lightboxImg =
    document.getElementById("lightbox-img");

  if (lightbox && lightboxImg) {

    let images =
      document.querySelectorAll(
        ".slide, .gallery-grid img"
      );

    images.forEach(img => {

      img.addEventListener("click", () => {

        lightbox.style.display = "flex";

        lightboxImg.src = img.src;

      });

    });

    lightbox.addEventListener("click", () => {

      lightbox.style.display = "none";

    });

    document.addEventListener("keydown", (e) => {

      if (e.key === "Escape") {

        lightbox.style.display = "none";

      }

    });

  }

});


//////////////////////////////////////
// 🌙 다크모드

function toggleDark() {

  document.body.classList.toggle("dark");

  if (
    document.body.classList.contains("dark")
  ) {

    localStorage.setItem(
      "darkMode",
      "on"
    );

  }

  else {

    localStorage.setItem(
      "darkMode",
      "off"
    );

  }

}

window.addEventListener(
  "DOMContentLoaded",
  () => {

    if (
      localStorage.getItem("darkMode")
      === "on"
    ) {

      document.body.classList.add("dark");

    }

  }
);


//////////////////////////////////////
// 🔥 Supabase import

import { createClient }
from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'


//////////////////////////////////////
// 🔥 Supabase 설정

const supabaseUrl =
'https://czpatsellvgtpvfqduek.supabase.co'

const supabaseKey =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6cGF0c2VsbHZndHB2ZnFkdWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MTgzNDksImV4cCI6MjA5NDk5NDM0OX0.WWVCU7c-NjYCOZ4gSvNCC4U_Zg1xBDRQQcB-_ndrajs'


//////////////////////////////////////
// 🔥 Supabase 시작

const supabase =
createClient(
  supabaseUrl,
  supabaseKey
)


//////////////////////////////////////
// 🔥 회원가입

window.signUp = async function() {

  const email =
    document.getElementById("email").value

  const password =
    document.getElementById("password").value

  const { error } =
    await supabase.auth.signUp({

      email: email,
      password: password

    })

  if (error) {

    alert(error.message)

  }

  else {

    alert("회원가입 완료!")

  }

}


//////////////////////////////////////
// 🔥 로그인

window.login = async function() {

  const email =
    document.getElementById("email").value

  const password =
    document.getElementById("password").value

  const { error } =
    await supabase.auth.signInWithPassword({

      email: email,
      password: password

    })

  if (error) {

    alert(error.message)

  }

  else {

    // 👑 관리자
    if (
      email ===
      "jieunpark523@gmail.com"
    ) {

      window.location.href =
        "admin.html"

    }

    // 👤 일반 사용자
    else {

      window.location.href =
        "index.html"

    }

  }

}


//////////////////////////////////////
// 🔥 관리자 확인

window.checkAdmin = async function() {

  const {
    data: { user }
  } = await supabase.auth.getUser()

  // 로그인 안 했으면
  if (!user) {

    window.location.href =
      "login.html"

  }

  // 관리자 아니면 차단
  else if (

    user.email !==
    "jieunpark523@gmail.com"

  ) {

    alert("관리자만 접근 가능!")

    window.location.href =
      "index.html"

  }

  // 관리자 이메일 표시
  else {

    const userEmail =
      document.getElementById(
        "user-email"
      )

    if (userEmail) {

      userEmail.textContent =
        user.email

    }

  }

}


//////////////////////////////////////
// 🔥 로그아웃

window.logout = async function() {

  await supabase.auth.signOut()

  window.location.href =
    "login.html"

}

// 🌍 언어 변경 함수

window.setLanguage = function(lang) {

  //////////////////////////////////////
  // 🇺🇸 ENGLISH

  if (lang === "en") {

    document.getElementById(
      "hero-title"
    ).innerText =
      "Shining the Light of Knowledge";

    document.getElementById(
      "hero-text"
    ).innerText =
      "Building character, excellence, and global leadership.";

    document.getElementById(
      "hero-btn"
    ).innerText =
      "Learn More";


    document.getElementById(
      "card1-title"
    ).innerText =
      "Strong Academics";

    document.getElementById(
      "card1-text"
    ).innerText =
      "We provide School of Tomorrow curriculum for every student.";


    document.getElementById(
      "card2-title"
    ).innerText =
      "Creative Programs";

    document.getElementById(
      "card2-text"
    ).innerText =
      "Music, art, leadership, debate, and more creative classes.";


    document.getElementById(
      "card3-title"
    ).innerText =
      "Caring Community";

    document.getElementById(
      "card3-text"
    ).innerText =
      "A safe, supportive environment for all students.";

  }


  //////////////////////////////////////
  // 🇰🇷 KOREAN

  else if (lang === "ko") {

    document.getElementById(
      "hero-title"
    ).innerText =
      "지식의 빛을 비추다";

    document.getElementById(
      "hero-text"
    ).innerText =
      "인성과 글로벌 리더십을 세우는 학교";

    document.getElementById(
      "hero-btn"
    ).innerText =
      "더 알아보기";


    document.getElementById(
      "card1-title"
    ).innerText =
      "강한 학업 시스템";

    document.getElementById(
      "card1-text"
    ).innerText =
      "모든 학생들에게 수준 높은 교육을 제공합니다.";


    document.getElementById(
      "card2-title"
    ).innerText =
      "창의적 프로그램";

    document.getElementById(
      "card2-text"
    ).innerText =
      "음악, 미술, 리더십, 토론 등 다양한 활동 제공";


    document.getElementById(
      "card3-title"
    ).innerText =
      "따뜻한 공동체";

    document.getElementById(
      "card3-text"
    ).innerText =
      "학생들을 위한 안전하고 따뜻한 환경";

  }


  //////////////////////////////////////
  // 🇹🇭 THAI

  else if (lang === "th") {

    document.getElementById(
      "hero-title"
    ).innerText =
      "ส่องแสงแห่งความรู้";

    document.getElementById(
      "hero-text"
    ).innerText =
      "สร้างคุณธรรม ความเป็นเลิศ และผู้นำระดับโลก";

    document.getElementById(
      "hero-btn"
    ).innerText =
      "เรียนรู้เพิ่มเติม";


    document.getElementById(
      "card1-title"
    ).innerText =
      "วิชาการที่แข็งแกร่ง";

    document.getElementById(
      "card1-text"
    ).innerText =
      "เราใช้หลักสูตร School of Tomorrow สำหรับนักเรียนทุกคน";


    document.getElementById(
      "card2-title"
    ).innerText =
      "โปรแกรมสร้างสรรค์";

    document.getElementById(
      "card2-text"
    ).innerText =
      "ดนตรี ศิลปะ ความเป็นผู้นำ และกิจกรรมสร้างสรรค์อื่น ๆ";


    document.getElementById(
      "card3-title"
    ).innerText =
      "ชุมชนที่อบอุ่น";

    document.getElementById(
      "card3-text"
    ).innerText =
      "สภาพแวดล้อมที่ปลอดภัยและสนับสนุนนักเรียน";

  }


  //////////////////////////////////////
  // 🔥 저장

  localStorage.setItem(
    "language",
    lang
  );

}


// 🌍 저장된 언어 불러오기

window.addEventListener(
  "DOMContentLoaded",
  () => {

    const savedLang =
      localStorage.getItem("language");

    if (savedLang) {

      setLanguage(savedLang);

    }

  }
);

//////////////////////////////////////
// 🌍 LANGUAGE DROPDOWN

window.toggleLangMenu = function() {

  const menu =
    document.getElementById("langDropdown");

  if (menu.style.display === "flex") {

    menu.style.display = "none";

  }

  else {

    menu.style.display = "flex";

  }

}


//////////////////////////////////////
// 🌍 바깥 클릭 시 닫기

window.addEventListener("click", (e) => {

  const menu =
    document.getElementById("langDropdown");

  const button =
    document.querySelector(".lang-btn");

  if (
    menu &&
    button &&
    !menu.contains(e.target) &&
    !button.contains(e.target)
  ) {

    menu.style.display = "none";

  }

});
