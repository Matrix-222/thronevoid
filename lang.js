const translations = {
    en: {
        login:"Login",
        register:"Register",
        dashboard:"Dashboard",
        join:"Join Now",
        start:"Start Playing",
        heroTitle:"Welcome to Throne Void",
        heroText:"Explore the galaxy, build your fleet, dominate alliances, and survive the cosmic challenges in a vast universe full of opportunities."
    },
    ar: {
        login:"تسجيل الدخول",
        register:"تسجيل جديد",
        dashboard:"لوحة التحكم",
        join:"انضم الآن",
        start:"ابدأ اللعب",
        heroTitle:"مرحباً بك في Throne Void",
        heroText:"استكشف المجرة، ابني أسطولك، سيطر على التحالفات، ونجو من تحديات الكون في عالم واسع مليء بالفرص."
    }
};

let currentLang = 'en';
const langBtn = document.getElementById('langToggle');

langBtn.addEventListener('click', ()=>{
    currentLang = currentLang==='en'?'ar':'en';
    langBtn.innerText = currentLang==='en'?'العربية':'English';
    document.querySelectorAll('[data-key]').forEach(el=>{
        el.innerText = translations[currentLang][el.dataset.key];
    });
    document.getElementById('hero-title').innerText = translations[currentLang].heroTitle;
    document.getElementById('hero-text').innerText = translations[currentLang].heroText;
});
