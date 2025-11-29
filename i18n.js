// i18n.js
// قاموس الترجمة: يجب أن يتضمن هذا القاموس جميع النصوص في صفحات HTML
const translations = {
    // --- المفاتيح الرئيسية ---
    'HOME': { 'en': 'HOME', 'ar': 'الرئيسية' },
    'LOGIN': { 'en': 'LOGIN', 'ar': 'تسجيل الدخول' },
    'REGISTER': { 'en': 'REGISTER', 'ar': 'تسجيل جديد' },
    'LEADERBOARD': { 'en': 'LEADERBOARD', 'ar': 'لوحة المتصدرين' },
    'DASHBOARD': { 'en': 'DASHBOARD', 'ar': 'لوحة التحكم' },
    'SETTINGS': { 'en': 'SETTINGS', 'ar': 'الإعدادات' },
    'LOGOUT': { 'en': 'LOGOUT', 'ar': 'تسجيل الخروج' },

    // --- مفاتيح الصفحة الرئيسية (index.html) ---
    'HERO_TITLE': { 'en': 'WELCOME, WARLORD', 'ar': 'مرحباً بك أيها المحارب' },
    'HERO_SUBTITLE': { 'en': 'Enter the Galactic Arena, fight to survive, and assert your dominance over the Void Throne.', 'ar': 'ادخل إلى ساحة المجرة، قاتل للبقاء، وأثبت هيمنتك على العرش.' },
    'START_CHALLENGE': { 'en': 'START THE CHALLENGE', 'ar': 'ابدأ التحدي' },

    // --- مفاتيح الدخول/التسجيل (login.html) ---
    'LOG_IN_ACCOUNT': { 'en': 'Login / Create Account', 'ar': 'تسجيل الدخول / إنشاء حساب' },
    'EMAIL_PLACEHOLDER': { 'en': 'Email', 'ar': 'البريد الإلكتروني' },
    'PASSWORD_PLACEHOLDER': { 'en': 'Password', 'ar': 'كلمة المرور' },
    'AUTH_BUTTON_LOGIN': { 'en': 'Login', 'ar': 'تسجيل الدخول' },
    'AUTH_BUTTON_REGISTER': { 'en': 'Create Account', 'ar': 'إنشاء حساب' },
    'TOGGLE_TO_REGISTER': { 'en': "Don't have an account? Click to Register", 'ar': 'لا تملك حساباً؟ انقر للتسجيل' },
    'TOGGLE_TO_LOGIN': { 'en': "Already have an account? Click to Login", 'ar': 'لديك حساب؟ انقر للدخول' },
    'SIGN_IN_WITH_GOOGLE': { 'en': 'Sign in with Google', 'ar': 'تسجيل الدخول باستخدام جوجل' },
    
    // --- مفاتيح لوحة التحكم (dashboard.html) ---
    'WELCOME_WARLORD': { 'en': 'Welcome, Warlord!', 'ar': 'أهلاً بك أيها المحارب!' },
    'LOGGED_IN_AS': { 'en': 'Logged in as:', 'ar': 'تم تسجيل دخولك باسم المستخدم:' },
    'HIGH_SCORE_DISPLAY': { 'en': 'Your Highest Score', 'ar': 'أعلى نتيجة لديك' },
    'UPDATED_TEXT': { 'en': 'Updated', 'ar': 'تم التحديث' },
    'GAME_INSTRUCTIONS': { 'en': 'Use arrows to move and Space to shoot. The game uses the professional Phaser engine.', 'ar': 'استخدم الأسهم للحركة والمسافة (Space) لإطلاق النار. اللعبة تستخدم محرك Phaser الاحترافي.' },

    // --- مفاتيح الخدمات الجديدة ---
    'STORE': { 'en': 'STORE', 'ar': 'المتجر' },
    'ALLIANCES_CHAT': { 'en': 'ALLIANCES CHAT', 'ar': 'شات التحالفات' },

    // --- مفاتيح صفحة الإعدادات (settings.html) ---
    'SETTINGS_PAGE_TITLE': { 'en': 'Account and Game Settings', 'ar': 'إعدادات الحساب واللعبة' },
    'PROFILE_SETTINGS': { 'en': 'Profile Settings', 'ar': 'إعدادات الملف الشخصي' },
    'CHANGE_AVATAR': { 'en': 'Change Profile Picture', 'ar': 'تغيير صورة البروفايل' },
    'CHOOSE_AVATAR': { 'en': 'Choose from Avatars:', 'ar': 'اختر من الأيقونات الجاهزة:' },
    'UPLOAD_IMAGE': { 'en': 'Upload New Image', 'ar': 'رفع صورة جديدة' },
    'SAVE_CHANGES': { 'en': 'Save Changes', 'ar': 'حفظ التغييرات' },
    'LANGUAGE_SETTINGS': { 'en': 'Language Settings', 'ar': 'إعدادات اللغة' },
    'SELECT_LANGUAGE': { 'en': 'Select Language:', 'ar': 'اختر اللغة:' },
    'LANG_AR': { 'en': 'Arabic', 'ar': 'العربية' },
    'LANG_EN': { 'en': 'English', 'ar': 'English' },
    'ACCOUNT_SETTINGS': { 'en': 'Account Settings', 'ar': 'إعدادات الحساب' },
    'CHANGE_PASSWORD': { 'en': 'Change Password', 'ar': 'تغيير كلمة المرور' },
    'CURRENT_EMAIL': { 'en': 'Current Email:', 'ar': 'البريد الإلكتروني الحالي:' },
    'EDIT': { 'en': 'Edit', 'ar': 'تعديل' },
    'DANGER_ZONE': { 'en': 'DANGER ZONE', 'ar': 'منطقة الخطر' },
    'DELETE_ACCOUNT': { 'en': 'Delete Account Permanently', 'ar': 'حذف الحساب نهائياً' },
    'DELETE': { 'en': 'Delete', 'ar': 'حذف' },
    'GAME_SETTINGS': { 'en': 'Game Settings', 'ar': 'إعدادات اللعبة' },
    'SOUND_VOLUME': { 'en': 'Sound Volume', 'ar': 'مستوى الصوت' },
    'GRAPHICS_QUALITY': { 'en': 'Graphics Quality', 'ar': 'جودة الرسوميات' },
    'HIGH': { 'en': 'High', 'ar': 'عالية' },
    'MEDIUM': { 'en': 'Medium', 'ar': 'متوسطة' },
    'LOW': { 'en': 'Low', 'ar': 'منخفضة' },

    // 🔥 مفاتيح لوحة تحكم المشرف (Admin Panel) 🔥
    'ADMIN_PANEL': { 'en': 'ADMIN PANEL', 'ar': 'لوحة تحكم المشرف' },
    'MANAGE_USERS': { 'en': 'MANAGE USERS', 'ar': 'إدارة المستخدمين' },
    'USER_EMAIL': { 'en': 'USER EMAIL', 'ar': 'البريد الإلكتروني' },
    'AVATAR_URL': { 'en': 'AVATAR', 'ar': 'صورة البروفايل' },
    'HIGH_SCORE': { 'en': 'HIGH SCORE', 'ar': 'أعلى نتيجة' },
    'ENERGY': { 'en': 'ENERGY', 'ar': 'الطاقة' }, // مفتاح جديد
    'STATUS': { 'en': 'STATUS', 'ar': 'الحالة' },
    'ACTIONS': { 'en': 'ACTIONS', 'ar': 'الإجراءات' },
    'ACCESS_DENIED': { 'en': '⛔️ Access Denied. You do not have administrator privileges.', 'ar': '⛔️ لا تملك صلاحية الوصول إلى لوحة المشرف.' },
};

// الدالة الرئيسية للترجمة
function setLanguage(lang) {
    localStorage.setItem('lang', lang);

    document.body.style.direction = (lang === 'ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (translations[key] && translations[key][lang]) {
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.placeholder = translations[key][lang];
            } else if (element.tagName === 'TITLE') {
                document.title = translations[key][lang];
            } else {
                element.textContent = translations[key][lang];
            }
        }
    });
}

// دالة التحقق من اللغة المحفوظة وتحميلها
function loadLanguage() {
    const defaultLang = 'ar';
    const lang = localStorage.getItem('lang') || defaultLang;
    setLanguage(lang);
    return lang;
}

// تصدير الدوال لاستخدامها في ملفات HTML الأخرى
window.setLanguage = setLanguage;
window.loadLanguage = loadLanguage;
window.translations = translations;
