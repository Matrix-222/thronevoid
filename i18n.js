const translations = {
    'ar': {
        // عام
        'HOME': 'الرئيسية',
        'LOGOUT': 'تسجيل الخروج',
        'DASHBOARD': 'لوحة التحكم',
        'SETTINGS': 'الإعدادات',
        'STORE': 'المتجر',
        'SAVE': 'حفظ',
        'DELETE': 'حذف',

        // صفحة login.html
        'LOGIN': 'تسجيل الدخول',
        'LOG_IN_ACCOUNT': 'تسجيل الدخول / إنشاء حساب',
        'EMAIL_PLACEHOLDER': 'البريد الإلكتروني',
        'PASSWORD_PLACEHOLDER': 'كلمة المرور',
        'FORGOT_PASSWORD': 'نسيت كلمة المرور؟',
        'AUTH_BUTTON_LOGIN': 'تسجيل الدخول',
        'AUTH_BUTTON_REGISTER': 'إنشاء حساب جديد',
        'TOGGLE_TO_REGISTER': 'لا تملك حساباً؟ انقر للتسجيل',
        'TOGGLE_TO_LOGIN': 'لديك حساب بالفعل؟ انقر لتسجيل الدخول',
        'SIGN_IN_WITH_GOOGLE': 'تسجيل الدخول باستخدام جوجل',

        // صفحة dashboard.html
        'WELCOME_WARLORD': 'أهلاً بك أيها المحارب!',
        'LOGGED_IN_AS': 'تم تسجيل دخولك باسم المستخدم:',
        'HIGH_SCORE_DISPLAY': 'أعلى نتيجة لديك',
        'START_CHALLENGE': 'ابدأ التحدي',
        'GAME_INSTRUCTIONS': 'استخدم الأسهم للحركة والمسافة (Space) لإطلاق النار. اللعبة تستخدم محرك Phaser الاحترافي.',
        
        // صفحات الشات الجديدة
        'GENERAL_CHAT': 'الشات العام',
        'ALLIANCES_CHAT': 'شات التحالفات (خاص)',
        'SEND_MESSAGE': 'إرسال',
        'CHAT_MESSAGE_PLACEHOLDER': 'اكتب رسالتك هنا...',
        'GENERAL_CHAT_TITLE': 'الشات العام (الجميع)',
        'ALLIANCES_CHAT_TITLE': 'شات التحالفات (الخاص)',

        // صفحة settings.html
        'SETTINGS_PAGE_TITLE': 'إعدادات الحساب واللعبة',
        'PROFILE_SETTINGS': 'إعدادات الملف الشخصي',
        'CHANGE_AVATAR': 'تغيير صورة البروفايل',
        'USERNAME': 'اسم المستخدم:',
        'CHANGE_USERNAME': 'تغيير اسم المستخدم',
        'SAVE_USERNAME': 'حفظ الاسم',
        'ACCOUNT_SETTINGS': 'إعدادات الحساب',
        'CURRENT_EMAIL': 'البريد الإلكتروني الحالي:',
        'LANGUAGE_SETTINGS': 'إعدادات اللغة',
        'SELECT_LANGUAGE': 'اختر اللغة:',
        'LANG_AR': 'العربية',
        'LANG_EN': 'English',
        'DANGER_ZONE': 'منطقة الخطر',
        'DELETE_ACCOUNT': 'حذف الحساب نهائياً'
    },
    'en': {
        // General
        'HOME': 'Home',
        'LOGOUT': 'Logout',
        'DASHBOARD': 'Dashboard',
        'SETTINGS': 'Settings',
        'STORE': 'Store',
        'SAVE': 'Save',
        'DELETE': 'Delete',

        // login.html page
        'LOGIN': 'Login',
        'LOG_IN_ACCOUNT': 'Login / Register Account',
        'EMAIL_PLACEHOLDER': 'Email',
        'PASSWORD_PLACEHOLDER': 'Password',
        'FORGOT_PASSWORD': 'Forgot Password?',
        'AUTH_BUTTON_LOGIN': 'Login',
        'AUTH_BUTTON_REGISTER': 'Register New Account',
        'TOGGLE_TO_REGISTER': 'Don\'t have an account? Click to register',
        'TOGGLE_TO_LOGIN': 'Already have an account? Click to login',
        'SIGN_IN_WITH_GOOGLE': 'Sign in with Google',

        // dashboard.html page
        'WELCOME_WARLORD': 'Welcome Warlord!',
        'LOGGED_IN_AS': 'Logged in as:',
        'HIGH_SCORE_DISPLAY': 'Your High Score',
        'START_CHALLENGE': 'Start Challenge',
        'GAME_INSTRUCTIONS': 'Use the arrows to move and Space to shoot. Game powered by Phaser.',
        
        // New Chat Pages
        'GENERAL_CHAT': 'General Chat',
        'ALLIANCES_CHAT': 'Alliances Chat (Private)',
        'SEND_MESSAGE': 'Send',
        'CHAT_MESSAGE_PLACEHOLDER': 'Type your message here...',
        'GENERAL_CHAT_TITLE': 'General Chat (Everyone)',
        'ALLIANCES_CHAT_TITLE': 'Alliances Chat (Private)',

        // settings.html page
        'SETTINGS_PAGE_TITLE': 'Account & Game Settings',
        'PROFILE_SETTINGS': 'Profile Settings',
        'CHANGE_AVATAR': 'Change Profile Avatar',
        'USERNAME': 'Username:',
        'CHANGE_USERNAME': 'Change Username',
        'SAVE_USERNAME': 'Save Username',
        'ACCOUNT_SETTINGS': 'Account Settings',
        'CURRENT_EMAIL': 'Current Email:',
        'LANGUAGE_SETTINGS': 'Language Settings',
        'SELECT_LANGUAGE': 'Select Language:',
        'LANG_AR': 'العربية',
        'LANG_EN': 'English',
        'DANGER_ZONE': 'Danger Zone',
        'DELETE_ACCOUNT': 'Permanently Delete Account'
    }
};

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    loadLanguage();
}

function loadLanguage() {
    const lang = localStorage.getItem('lang') || 'ar';
    document.documentElement.lang = lang; 

    // تطبيق الترجمة على جميع العناصر التي تحمل خاصية data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // للعناصر التي لها placeholder (مثل حقول الإدخال)
            if (element.placeholder) {
                element.placeholder = translations[lang][key];
            } 
            // لباقي العناصر (نصوص)
            else {
                element.textContent = translations[lang][key];
            }
        }
    });

    return lang;
}

// تشغيل دالة loadLanguage عند تحميل الصفحة
loadLanguage();
