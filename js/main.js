$(function() {


    const $burger = $('#burger');
    const $nav = $('#main-nav');

    $burger.on('click', function() {
        const isOpen = $nav.hasClass('open');
        $nav.toggleClass('open');
        $burger.toggleClass('open');
        $burger.attr('aria-expanded', !isOpen);
        $('body').toggleClass('nav-open');
    });

    $(document).on('click', function(e) {
        if ($nav.hasClass('open') && !$nav.is(e.target) && !$burger.is(e.target) && $nav.has(e.target).length === 0) {
            $nav.removeClass('open');
            $burger.removeClass('open');
            $burger.attr('aria-expanded', 'false');
        }
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $nav.hasClass('open')) {
            $nav.removeClass('open');
            $burger.removeClass('open');
            $burger.attr('aria-expanded', 'false');
            $burger.focus();
        }
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    $('nav a[href]').each(function() {
        const href = $(this).attr('href').split('?')[0];
        if (href === currentPage) {
            $(this).addClass('active').attr('aria-current', 'page');
        }
    });

    const $langToggle = $('#lang-toggle');
    let currentLang = localStorage.getItem('svayo_lang') || 'ru';

    const translations = {
        ru: {
            'catalog': 'Каталог',
            'farmers': 'Наши фермеры',
            'cart': 'Корзина',
            'howitworks': 'Как это работает',
            'about': 'О нас',
            'contacts': 'Контакты',
            'hero.title': 'Свежие продукты прямо <em>с грядки</em>',
            'hero.subtitle': 'Без посредников. Только проверенные белорусские фермеры.',
            'hero.btn': 'Перейти в каталог',
            'categories.title': 'Выберите категорию',
            'categories.vegetables': 'Овощи и фрукты',
            'categories.dairy': 'Молочные продукты',
            'categories.honey': 'Мёд и варенья',
            'categories.meat': 'Мясо и птица',
            'categories.eggs': 'Яйца',
            'categories.bakery': 'Выпечка',
            'products.weekly': 'Товары недели',
            'farmers.title': 'Наши фермеры',
            'steps.title': 'Как это работает',
            'step1.title': 'Выберите товар',
            'step1.text': 'Найдите то, что вам нужно, в каталоге',
            'step2.title': 'Оформите заказ',
            'step2.text': 'Добавьте товары в корзину и оформите заказ',
            'step3.title': 'Фермер собирает',
            'step3.text': 'Фермер собирает свежие продукты',
            'step4.title': 'Доставка',
            'step4.text': 'Получите заказ с доставкой на дом',
            'subscribe.title': 'Будьте в курсе сезонных новинок',
            'subscribe.text': 'Подпишитесь на рассылку и получайте скидки первыми!',
            'subscribe.btn': 'Подписаться',
            'footer.brand': 'Маркетплейс фермерской продукции Беларуси. Свежие продукты напрямую от производителя.',
            'footer.buyers': 'Покупателям',
            'footer.farmers': 'Фермерам',
            'footer.partner': 'Стать партнёром',
            'footer.conditions': 'Условия сотрудничества',
            'footer.contacts': 'Контакты',
            'footer.copyright': 'Все права защищены.',
            'catalog.title': 'Каталог товаров',
            'catalog.filters': 'Фильтры',
            'catalog.category': 'Категория',
            'catalog.price': 'Цена, р.',
            'catalog.region': 'Регион',
            'catalog.all_regions': 'Все регионы',
            'catalog.sort.rating': 'По рейтингу',
            'catalog.sort.price_asc': 'По цене ↑',
            'catalog.sort.price_desc': 'По цене ↓',
            'catalog.search': 'Поиск товаров...',
            'product.reviews': 'Отзывы покупателей',
            'product.add_review': 'Оставить отзыв',
            'product.send': 'Отправить отзыв',
            'product.similar': 'Похожие товары',
            'product.favorite': 'В избранное',
            'product.in_favorite': 'В избранном',
            'product.quantity': 'Количество',
            'cart.title': 'Корзина',
            'cart.empty': 'Корзина пуста',
            'cart.subtotal': 'Товары',
            'cart.delivery': 'Доставка',
            'cart.total': 'Итого',
            'cart.apply': 'Применить',
            'cart.checkout': 'Оформить заказ',
            'cart.remove': 'Удалить',
            'account.title': 'Личный кабинет',
            'account.orders': 'Мои заказы',
            'account.favorites': 'Избранное',
            'account.profile': 'Настройки профиля',
            'account.addresses': 'Адреса доставки',
            'account.save': 'Сохранить изменения',
            'nav.logout': 'Выход',
            'farmers.page_title': 'Наши фермеры',
            'farmers.subtitle': 'Познакомьтесь с теми, кто выращивает для вас свежие и натуральные продукты',
            'farmers.details': 'Подробнее →',
            'how.page_title': 'Как это работает',
            'how.subtitle': 'Простая и прозрачная схема работы нашей платформы',
            'how.buyers': '🛒 Для покупателей',
            'how.farmers': '👨‍🌾 Для фермеров',
            'how.advantage_title': 'Почему выбирают нас',
            'how.advantage1': 'Гарантия качества',
            'how.advantage1_text': 'Все фермеры проходят проверку перед регистрацией',
            'how.advantage2': 'Быстрая доставка',
            'how.advantage2_text': 'Доставка по всей Беларуси в течение 1-3 дней',
            'how.advantage3': 'Без посредников',
            'how.advantage3_text': 'Цены от производителя, без лишних наценок',
            'how.advantage4': 'Экологичность',
            'how.advantage4_text': 'Только натуральные продукты без химии',
            'about.title': 'О проекте «Сваё, Роднае»',
            'about.subtitle': 'Мы соединяем белорусских фермеров и тех, кто ценит натуральные продукты',
            'about.mission': 'Наша миссия',
            'about.mission_text': 'Создать удобную площадку для прямой продажи фермерской продукции, устранить посредников между производителями и покупателями, обеспечить горожан доступом к свежим, качественным, натуральным продуктам.',
            'about.year': 'Год основания проекта',
            'about.farmers_count': 'Фермеров на платформе',
            'about.cities': 'Городов доставки',
            'about.orders': 'Доставленных заказов',
            'about.values': 'Наши ценности',
            'contacts.title': 'Контакты',
            'contacts.phone': 'Телефон',
            'contacts.email': 'Email',
            'contacts.address': 'Адрес',
            'contacts.hours': 'Режим работы',
            'contacts.social': 'Мы в соцсетях',
            'contacts.form_title': 'Напишите нам',
            'contacts.form_name': 'Ваше имя',
            'contacts.form_email': 'Ваш email',
            'contacts.form_subject': 'Тема сообщения',
            'contacts.form_message': 'Ваше сообщение...',
            'contacts.form_send': 'Отправить сообщение',
            'contacts.form_success': 'Сообщение отправлено! Мы свяжемся с вами в ближайшее время.',
            'contacts.map': 'Как нас найти'
        },
        by: {
            'catalog': 'Каталог',
            'farmers': 'Нашы фермеры',
            'cart': 'Кошык',
            'howitworks': 'Як гэта працуе',
            'about': 'Пра нас',
            'contacts': 'Кантакты',
            'hero.title': 'Свежыя прадукты проста <em>з градкі</em>',
            'hero.subtitle': 'Без пасярэднікаў. Толькі правераныя беларускія фермеры.',
            'hero.btn': 'Перайсці ў каталог',
            'categories.title': 'Выберыце катэгорыю',
            'categories.vegetables': 'Агародніна і садавіна',
            'categories.dairy': 'Малочныя прадукты',
            'categories.honey': 'Мёд і варэнні',
            'categories.meat': 'Мяса і птушка',
            'categories.eggs': 'Яйкі',
            'categories.bakery': 'Выпечка',
            'products.weekly': 'Тавары тыдня',
            'farmers.title': 'Нашы фермеры',
            'steps.title': 'Як гэта працуе',
            'step1.title': 'Выберыце тавар',
            'step1.text': 'Знайдзіце тое, што вам трэба, у каталогу',
            'step2.title': 'Аформіце заказ',
            'step2.text': 'Дадайце тавары ў кошык і аформіце заказ',
            'step3.title': 'Фермер збірае',
            'step3.text': 'Фермер збірае свежыя прадукты',
            'step4.title': 'Дастаўка',
            'step4.text': 'Атрымайце заказ з дастаўкай на дом',
            'subscribe.title': 'Будзьце ў курсе сезонных навінак',
            'subscribe.text': 'Падпішыцеся на рассылку і атрымлівайце скідкі першымі!',
            'subscribe.btn': 'Падпісацца',
            'footer.brand': 'Маркетплейс фермерскай прадукцыі Беларусі. Свежыя прадукты непасрэдна ад вытворцы.',
            'footer.buyers': 'Пакупнікам',
            'footer.farmers': 'Фермерам',
            'footer.partner': 'Стаць партнёрам',
            'footer.conditions': 'Умовы супрацоўніцтва',
            'footer.contacts': 'Кантакты',
            'footer.copyright': 'Усе правы абаронены.',
            'catalog.title': 'Каталог тавараў',
            'catalog.filters': 'Фільтры',
            'catalog.category': 'Катэгорыя',
            'catalog.price': 'Цана, р.',
            'catalog.region': 'Рэгіён',
            'catalog.all_regions': 'Усе рэгіёны',
            'catalog.sort.rating': 'Па рэйтынгу',
            'catalog.sort.price_asc': 'Па цане ↑',
            'catalog.sort.price_desc': 'Па цане ↓',
            'catalog.search': 'Пошук тавараў...',
            'product.reviews': 'Водгукі пакупнікоў',
            'product.add_review': 'Пакінуць водгук',
            'product.send': 'Адправіць водгук',
            'product.similar': 'Падобныя тавары',
            'product.favorite': 'У выбранае',
            'product.in_favorite': 'У выбраным',
            'product.quantity': 'Колькасць',
            'cart.title': 'Кошык',
            'cart.empty': 'Кошык пусты',
            'cart.subtotal': 'Тавары',
            'cart.delivery': 'Дастаўка',
            'cart.total': 'Разам',
            'cart.apply': 'Ужыць',
            'cart.checkout': 'Аформіць заказ',
            'cart.remove': 'Выдаліць',
            'account.title': 'Асабісты кабінет',
            'account.orders': 'Мае заказы',
            'account.favorites': 'Выбранае',
            'account.profile': 'Налады профілю',
            'account.addresses': 'Адрасы дастаўкі',
            'account.save': 'Захаваць змены',
            'nav.logout': 'Выхад',
            'farmers.page_title': 'Нашы фермеры',
            'farmers.subtitle': 'Пазнаёмцеся з тымі, хто вырошчвае для вас свежыя і натуральныя прадукты',
            'farmers.details': 'Падрабязней →',
            'how.page_title': 'Як гэта працуе',
            'how.subtitle': 'Простая і празрыстая схема працы нашай платформы',
            'how.buyers': '🛒 Для пакупнікоў',
            'how.farmers': '👨‍🌾 Для фермераў',
            'how.advantage_title': 'Чаму выбіраюць нас',
            'how.advantage1': 'Гарантыя якасці',
            'how.advantage1_text': 'Усе фермеры праходзяць праверку перад рэгістрацыяй',
            'how.advantage2': 'Хуткая дастаўка',
            'how.advantage2_text': 'Дастаўка па ўсёй Беларусі на працягу 1-3 дзён',
            'how.advantage3': 'Без пасярэднікаў',
            'how.advantage3_text': 'Цэны ад вытворцы, без лішніх нацэнак',
            'how.advantage4': 'Экалагічнасць',
            'how.advantage4_text': 'Толькі натуральныя прадукты без хіміі',
            'about.title': 'Пра праект «Сваё, Роднае»',
            'about.subtitle': 'Мы злучаем беларускіх фермераў і тых, хто цэніць натуральныя прадукты',
            'about.mission': 'Наша місія',
            'about.mission_text': 'Стварыць зручную пляцоўку для прамой продажу фермерскай прадукцыі, ліквідаваць пасярэднікаў паміж вытворцамі і пакупнікамі, забяспечыць гараджан доступам да свежых, якасных, натуральных прадуктаў.',
            'about.year': 'Год заснавання праекта',
            'about.farmers_count': 'Фермераў на платформе',
            'about.cities': 'Гарадоў дастаўкі',
            'about.orders': 'Дастаўленых заказаў',
            'about.values': 'Нашы каштоўнасці',
            'contacts.title': 'Кантакты',
            'contacts.phone': 'Тэлефон',
            'contacts.email': 'Email',
            'contacts.address': 'Адрас',
            'contacts.hours': 'Рэжым працы',
            'contacts.social': 'Мы ў сацсетках',
            'contacts.form_title': 'Напішыце нам',
            'contacts.form_name': 'Ваша імя',
            'contacts.form_email': 'Ваш email',
            'contacts.form_subject': 'Тэма паведамлення',
            'contacts.form_message': 'Ваша паведамленне...',
            'contacts.form_send': 'Адправіць паведамленне',
            'contacts.form_success': 'Паведамленне адпраўлена! Мы звяжамся з вамі ў бліжэйшы час.',
            'contacts.map': 'Як нас знайсці'
        }
    };

    function applyLang(lang) {
        if (!translations[lang]) return;
        $('[data-i18n]').each(function() {
            const key = $(this).data('i18n');
            if (translations[lang][key] !== undefined) {
                if (translations[lang][key].indexOf('<') !== -1) {
                    $(this).html(translations[lang][key]);
                } else {
                    $(this).text(translations[lang][key]);
                }
            }
        });
        $langToggle.text(lang === 'ru' ? 'BY' : 'RU');
        $langToggle.attr('title', lang === 'ru' ? 'Перайсці на беларускую' : 'Перейти на русский');
        localStorage.setItem('svayo_lang', lang);
        currentLang = lang;
        $('html').attr('lang', lang === 'by' ? 'be' : 'ru');
    }

    $langToggle.on('click', function() {
        applyLang(currentLang === 'ru' ? 'by' : 'ru');
    });
    applyLang(currentLang);

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem('svayo_cart')) || [];
        } catch {
            return [];
        }
    }

    function saveCart(cart) {
        try {
            localStorage.setItem('svayo_cart', JSON.stringify(cart));
        } catch (e) {
            console.warn('Не удалось сохранить корзину:', e);
        }
    }

    function updateCartCounter() {
        const cart = getCart();
        const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        $('#cart-count').text(totalCount);
    }

    window.addToCart = function(productId, name, price, quantity, farmer) {
        quantity = quantity || 1;
        farmer = farmer || 'Фермер';
        const cart = getCart();
        const existing = cart.find(item => item.id == productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ id: productId, name: name, price: parseFloat(price), quantity: quantity, farmer: farmer });
        }
        saveCart(cart);
        updateCartCounter();
        

        if (typeof showToast === 'function') {
            showToast('✅ ' + name + ' добавлен в корзину');
        } else {
            console.log('✅ ' + name + ' добавлен в корзину');
        }
        return true;
    };

    window.removeFromCart = function(productId) {
        const cart = getCart();
        const index = cart.findIndex(item => item.id == productId);
        if (index !== -1) {
            cart.splice(index, 1);
            saveCart(cart);
            updateCartCounter();
        }
    };

    window.clearCart = function() {
        localStorage.removeItem('svayo_cart');
        updateCartCounter();
    };

    window.getCartTotal = function() {
        return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
    };


    window.showToast = function(message, type, duration) {
        type = type || 'success';
        duration = duration || 3000;

        if (!$('#toast-container').length) {
            $('<div id="toast-container" role="status" aria-live="polite"></div>').appendTo('body');
        }

        const $toast = $('<div class="toast"></div>')
            .addClass(type !== 'success' ? type : '')
            .text(message);

        $('#toast-container').append($toast);

        setTimeout(function() {
            $toast.css({ animation: 'toastOut 0.3s ease forwards' });
            setTimeout(function() { $toast.remove(); }, 300);
        }, duration);
    };

    const lastMod = document.lastModified;
    if (lastMod) {
        const dateStr = lastMod.split(' ')[0];
        $('#doc-date').text('Обновлено: ' + dateStr);
    }

    updateCartCounter();

    $('#subscribe-form').on('submit', function(e) {
        e.preventDefault();
        const email = $('#subscribe-email').val().trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            $('#email-error').text('❌ Введите корректный email').css('color', 'var(--error)');
        } else {
            $('#email-error').text('✅ Спасибо! Вы подписаны.').css('color', 'var(--success)');
            $('#subscribe-email').val('');
        }
    });

    $('.faq-question').on('click', function() {
        $(this).toggleClass('open');
        $(this).next('.faq-answer').slideToggle(300);
    });

    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        const name = $('#contact-name').val().trim();
        const email = $('#contact-email').val().trim();
        const message = $('#contact-message').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !message) {
            $('#form-message').html('❌ Пожалуйста, заполните все обязательные поля!').css('color', 'var(--error)').show();
            return false;
        }
        if (!emailRegex.test(email)) {
            $('#form-message').html('❌ Введите корректный email!').css('color', 'var(--error)').show();
            return false;
        }

        $('#form-message').html('✅ Сообщение отправлено! Мы свяжемся с вами в ближайшее время.').css('color', 'var(--success)').show();
        $('#contact-form')[0].reset();
        setTimeout(() => $('#form-message').fadeOut(500), 5000);
    });

    $('.thumb').on('click', function() {
        $('.thumb').removeClass('active');
        $(this).addClass('active');
        const src = $(this).attr('src');
        $('#main-photo').fadeOut(150, function() {
            $(this).attr('src', src).fadeIn(150);
        });
    });

    $(document).on('click', '.add-to-cart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const $btn = $(this);
        const id = $btn.data('id');
        const name = $btn.data('name');
        const price = parseFloat($btn.data('price'));
        const farmer = $btn.data('farmer') || 'Фермер';
        
     
        window.addToCart(id, name, price, 1, farmer);
        
       
        $btn.addClass('added');
        setTimeout(function() {
            $btn.removeClass('added');
        }, 500);
    });

    function validateField($field) {
        const value = $field.val().trim();
        const validateType = $field.data('validate');
        const isRequired = $field.data('required') === true;
        const errorMessage = $field.data('error-message') || 'Некорректное значение';
        const minLength = $field.data('minlength') || 0;
        const maxLength = $field.data('maxlength') || Infinity;

        if (isRequired && !value) {
            return { valid: false, message: 'Это поле обязательно для заполнения' };
        }
        if (!isRequired && !value) {
            return { valid: true };
        }

        switch(validateType) {
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return { valid: false, message: errorMessage || 'Введите корректный email' };
                }
                break;
            case 'phone':
                if (!/^\+?[0-9\s\-\(\)]{7,20}$/.test(value)) {
                    return { valid: false, message: errorMessage || 'Введите корректный номер телефона' };
                }
                break;
            case 'text':
                if (value.length < minLength) {
                    return { valid: false, message: errorMessage || 'Минимум ' + minLength + ' символов' };
                }
                if (value.length > maxLength) {
                    return { valid: false, message: 'Максимум ' + maxLength + ' символов' };
                }
                break;
            case 'number':
                if (isNaN(value) || value < 0) {
                    return { valid: false, message: errorMessage || 'Введите положительное число' };
                }
                break;
            case 'password-confirm':
                const password = $('#regPassword').val().trim();
                if (value !== password) {
                    return { valid: false, message: errorMessage || 'Пароли не совпадают' };
                }
                break;
        }
        return { valid: true };
    }

    $(document).on('submit', 'form[data-validate]', function(e) {
        e.preventDefault();
        let isValid = true;
        let firstError = null;

        $(this).find('[data-validate]').each(function() {
            const $field = $(this);
            const result = validateField($field);

            $field.next('.field-error').remove();
            $field.removeClass('error');

            if (!result.valid) {
                isValid = false;
                $field.addClass('error');
                $field.after(`<span class="field-error" style="color:var(--error);font-size:12px;display:block;margin-top:4px;">❌ ${result.message}</span>`);
                if (!firstError) firstError = $field;
            }
        });

        if (!isValid) {
            if (firstError) firstError.focus();
            return false;
        }

        $(this).trigger('form-valid');
        return true;
    });

    $(document).on('blur', '[data-validate]', function() {
        const $field = $(this);
        const result = validateField($field);

        $field.next('.field-error').remove();
        $field.removeClass('error');

        if (!result.valid && $field.val().trim()) {
            $field.addClass('error');
            $field.after(`<span class="field-error" style="color:var(--error);font-size:12px;display:block;margin-top:4px;">❌ ${result.message}</span>`);
        }
    });

    $(document).on('input', '[data-validate]', function() {
        $(this).removeClass('error');
        $(this).next('.field-error').remove();
    });

    window.updateUIBasedOnAuth = function(isLoggedIn) {
        const authLinks = document.querySelectorAll('.auth-link');
        const userMenu = document.querySelector('.user-menu');
        const userNameEl = document.querySelector('.user-name');

        if (isLoggedIn && window.currentUser) {
            authLinks.forEach(el => el.style.display = 'none');
            if (userMenu) userMenu.style.display = 'inline-block';
            if (userNameEl) userNameEl.textContent = window.currentUser.name || 'Пользователь';
        } else {
            authLinks.forEach(el => el.style.display = 'inline-block');
            if (userMenu) userMenu.style.display = 'none';
        }
    };

    setTimeout(function() {
        const user = getCurrentUser ? getCurrentUser() : null;
        if (user) {
            getUserData(user.uid).then(result => {
                if (result.success) {
                    window.currentUser = { uid: user.uid, ...result.data };
                    window.updateUIBasedOnAuth(true);
                }
            });
        } else {
            window.updateUIBasedOnAuth(false);
        }
    }, 500);

    const savedUser = localStorage.getItem('svayo_user');
    if (savedUser) {
        try {
            const userData = JSON.parse(savedUser);
            window.currentUser = userData;
        } catch (e) {}
    }

});