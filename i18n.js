// تحديد اللغة الافتراضية
const defaultLang = 'ar';

// قاموس الترجمات
const translations = {
    'ar': {
        // ------------------------------------
        // مفاتيح عامة وصفحة تسجيل الدخول/التسجيل
        // ------------------------------------
        'LOGIN_TITLE': 'تسجيل الدخول',
        'REGISTER_TITLE': 'إنشاء حساب جديد',
        'EMAIL_PLACEHOLDER': 'البريد الإلكتروني',
        'PASSWORD_PLACEHOLDER': 'كلمة المرور',
        'LOGIN_BUTTON': 'دخول',
        'REGISTER_BUTTON': 'تسجيل',
        'NAV_TO_REGISTER': 'ليس لديك حساب؟ سجل الآن',
        'NAV_TO_LOGIN': 'لديك حساب بالفعل؟ سجل الدخول',
        'LOGOUT': 'تسجيل الخروج',
        'PROFILE': 'ملفي الشخصي',
        'MATCHING_PAGE_TITLE': 'صفحة الدردشة',

        // ------------------------------------
        // مفاتيح لوحة التحكم (Dashboard)
        // ------------------------------------
        'DASHBOARD_TITLE': 'لوحة التحكم',
        'USERNAME_LABEL': 'اسم المستخدم',
        'USER_BIO': 'النبذة التعريفية (Bio)',
        'USER_INTERESTS': 'الاهتمامات (فواصل بين كل اهتمام)',
        'SAVE_PROFILE': 'حفظ الملف الشخصي',
        'GO_TO_CHAT': 'ابدأ الدردشة',
        
        // ------------------------------------
        // مفاتيح صفحة الدردشة (chat.html)
        // ------------------------------------
        'CHAT_LIST_HEADER': 'ابحث عن أشخاص جدد للدردشة', 
        'AVAILABLE_USERS': 'الملفات المتاحة للدردشة', 

        // مفاتيح الفلاتر المتقدمة (حل المشكلة الأخيرة)
        'ADVANCED_FILTERS': 'مرشحات البحث المتقدمة',
        'SEARCH_BY_INTERESTS': 'ابحث بالاهتمامات المشتركة',
        'SHOW_ONLINE_ONLY': 'عرض المتصلين فقط',
        'APPLY_FILTERS': 'تطبيق التصفية',

        // ------------------------------------
        // مفاتيح المحادثة الخاصة (private_chat.html)
        // ------------------------------------
        'TYPE_MESSAGE_PLACEHOLDER': 'اكتب رسالتك...',
        'SEND_BUTTON': 'إرسال',
        'SEND_GIF': 'إرسال GIF',
        'BACK_TO_CHATLIST': 'العودة لقائمة الدردشة',
        'ONLINE_STATUS_ONLINE': 'متصل الآن',
        'ONLINE_STATUS_LASTSEEN': 'شوهد مؤخراً في',
    },
    // يمكنك إضافة المزيد من اللغات هنا
    'en': {
        'LOGIN_TITLE': 'Login',
        'REGISTER_TITLE': 'Create New Account',
        'EMAIL_PLACEHOLDER': 'Email',
        'PASSWORD_PLACEHOLDER': 'Password',
        'LOGIN_BUTTON': 'Login',
        'REGISTER_BUTTON': 'Register',
        'NAV_TO_REGISTER': 'Don\'t have an account? Register now',
        'NAV_TO_LOGIN': 'Already have an account? Login',
        'LOGOUT': 'Logout',
        'PROFILE': 'My Profile',
        'MATCHING_PAGE_TITLE': 'Chat Page',
        
        'DASHBOARD_TITLE': 'Dashboard',
        'USERNAME_LABEL': 'Username',
        'USER_BIO': 'User Bio',
        'USER_INTERESTS': 'Interests (separate with commas)',
        'SAVE_PROFILE': 'Save Profile',
        'GO_TO_CHAT': 'Go to Chat',

        'CHAT_LIST_HEADER': 'Find New People to Chat With',
        'AVAILABLE_USERS': 'Available Profiles', 

        'ADVANCED_FILTERS': 'Advanced Filters',
        'SEARCH_BY_INTERESTS': 'Search by Shared Interests',
        'SHOW_ONLINE_ONLY': 'Show Online Only',
        'APPLY_FILTERS': 'Apply Filters',
        
        'TYPE_MESSAGE_PLACEHOLDER': 'Type your message...',
        'SEND_BUTTON': 'Send',
        'SEND_GIF': 'Send GIF',
        'BACK_TO_CHATLIST': 'Back to Chat List',
        'ONLINE_STATUS_ONLINE': 'Online Now',
        'ONLINE_STATUS_LASTSEEN': 'Last Seen At',
    }
};

// وظيفة تطبيق الترجمات
document.addEventListener('DOMContentLoaded', () => {
    // يمكن هنا جلب اللغة من إعدادات المستخدم أو المتصفح
    const lang = defaultLang; 
    
    // تطبيق الترجمة على العناصر التي تحتوي على خاصية data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // للعناصر العادية، نغير محتوى النص
            element.textContent = translations[lang][key];
        }
    });

    // تطبيق الترجمة على placeholder (لـ input)
    document.querySelectorAll('input[placeholder]').forEach(input => {
        const placeholderKey = input.getAttribute('placeholder');
        if (translations[lang] && translations[lang][placeholderKey]) {
            input.setAttribute('placeholder', translations[lang][placeholderKey]);
        }
    });

    // تطبيق الترجمة على العنوان
    const titleElement = document.querySelector('title[data-i18n]');
    if (titleElement) {
        const key = titleElement.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            document.title = translations[lang][key];
        }
    }
});
