document.addEventListener('DOMContentLoaded', () => {
    
    /* 0. Cute Clover Page Loader Fadeout (Uniam Style) */
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                pageLoader.classList.add('loaded');
            }, 400); // ぽよんと弾むアニメーションを見せてから気持ちよくフェードアウト
        });

        // 念のためのフォールバック（最大1.5秒で確実に消す）
        setTimeout(() => {
            if (!pageLoader.classList.contains('loaded')) {
                pageLoader.classList.add('loaded');
            }
        }, 1500);
    }

    /* 1. Header Background & Scroll Behavior */
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /* 2. Mobile Menu Toggle */
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-open');
            if (mainNav.classList.contains('mobile-open')) {
                mainNav.style.display = 'block';
                mainNav.style.position = 'absolute';
                mainNav.style.top = '100%';
                mainNav.style.left = '0';
                mainNav.style.width = '100%';
                mainNav.style.background = '#FFFFFF';
                mainNav.style.padding = '24px';
                mainNav.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
            } else {
                mainNav.style.display = 'none';
            }
        });
    }

    /* 3. Number Counter Animation */
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    const animateCounters = () => {
        statNumbers.forEach(numEl => {
            const target = parseInt(numEl.getAttribute('data-target'));
            let current = 0;
            const increment = target / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    numEl.textContent = target;
                    clearInterval(timer);
                } else {
                    numEl.textContent = Math.ceil(current);
                }
            }, 50);
        });
    };

    /* 4. Service Category Filter Tabs */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceCards = document.querySelectorAll('.service-card-modern');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            serviceCards.forEach(card => {
                const cat = card.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* 5. Location Interactive Tabs */
    const locTabs = document.querySelectorAll('.loc-tab');
    const locPanels = document.querySelectorAll('.loc-panel');

    locTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            locTabs.forEach(t => t.classList.remove('active'));
            locPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetLoc = tab.getAttribute('data-loc');
            document.getElementById(`loc-${targetLoc}`).classList.add('active');
        });
    });

    /* 6. FAQ Accordion Toggle */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    /* 7. 3D Tilt Card Effect on Mouse Move */
    const tiltElements = document.querySelectorAll('.tilt-card, .tilt-element');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const tiltX = (y / rect.height) * -12;
            const tiltY = (x / rect.width) * 12;

            el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    /* 8. Scroll Observer for Animations */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger stats count up when hero area is visible
                if (entry.target.classList.contains('hero-section') && !animatedStats) {
                    animatedStats = true;
                    animateCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedTargets = document.querySelectorAll('.hero-section, .mission-card, .service-card-modern, .location-interactive-box, .company-card-grid, .contact-card-modern');
    animatedTargets.forEach(target => {
        target.style.opacity = '0';
        target.style.transform = 'translateY(30px)';
        target.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(target);
    });

    /* 9. In-Page Swipe LP Modal Toggle (No Page Transition) */
    const swipeModal = document.getElementById('swipeModal');
    const openSwipeModalBtn = document.getElementById('openSwipeModalBtn');
    const openSwipeModalBtn2 = document.getElementById('openSwipeModalBtn2');
    const closeSwipeModalBtn = document.getElementById('closeSwipeModalBtn');

    const openSwipeModalBtn3 = document.getElementById('openSwipeModalBtn3');
    const openSwipeModalBtn4 = document.getElementById('openSwipeModalBtn4');

    const openModal = () => {
        if (swipeModal) swipeModal.classList.add('active');
    };

    const closeModal = () => {
        if (swipeModal) swipeModal.classList.remove('active');
    };

    if (openSwipeModalBtn) openSwipeModalBtn.addEventListener('click', openModal);
    if (openSwipeModalBtn2) openSwipeModalBtn2.addEventListener('click', openModal);
    if (openSwipeModalBtn3) openSwipeModalBtn3.addEventListener('click', openModal);
    if (openSwipeModalBtn4) openSwipeModalBtn4.addEventListener('click', openModal);
    if (closeSwipeModalBtn) closeSwipeModalBtn.addEventListener('click', closeModal);

    if (swipeModal) {
        swipeModal.addEventListener('click', (e) => {
            if (e.target === swipeModal) closeModal();
        });
    }
});


/* Interactive Service Diagnosis Logic */
let diagAnswer1 = '';
let diagAnswer2 = '';

window.selectDiag = function(step, val) {
    if (step === 1) {
        diagAnswer1 = val;
        document.getElementById('diagStep1').style.display = 'none';
        document.getElementById('diagStep2').style.display = 'block';
    } else if (step === 2) {
        diagAnswer2 = val;
        document.getElementById('diagStep2').style.display = 'none';
        showDiagResult();
    }
};

function showDiagResult() {
    const resultBox = document.getElementById('diagResult');
    const resultTitle = document.getElementById('resultTitle');
    const resultDesc = document.getElementById('resultDesc');

    resultBox.style.display = 'block';

    if (diagAnswer1 === 'home' && diagAnswer2 === 'medical') {
        resultTitle.textContent = '「訪問看護ステーション コパン」 ＆ 「居宅介護支援」';
        resultDesc.textContent = 'ご自宅で安心してリハビリや医療処置を受けながら療養したい方に最適です。看護師とケアマネジャーが連携して強力にサポートします。';
    } else if (diagAnswer1 === 'home' && diagAnswer2 === 'life') {
        resultTitle.textContent = '「通所介護（デイサービス）」 ＆ 「居宅介護支援」';
        resultDesc.textContent = '日帰りで楽しく交流やリハビリ、入浴サポートを受けたい方にぴったりです。ご家族の介護負担軽減にも繋がります。';
    } else if (diagAnswer1 === 'facility' && diagAnswer2 === 'medical') {
        resultTitle.textContent = '「住宅型有料老人ホーム」 ＋ 訪問看護連携';
        resultDesc.textContent = '24時間の見守りと介護サポートのもと、看護師による丁寧な医療ケアを受けながら安心して暮らせる住まいです。';
    } else {
        resultTitle.textContent = '「サービス付き高齢者向け住宅」';
        resultDesc.textContent = 'バリアフリーと安否確認を備えた自由度の高い住まい。必要に応じた外部介護サービスを選びながら快適に生活できます。';
    }
}

window.resetDiag = function() {
    diagAnswer1 = '';
    diagAnswer2 = '';
    document.getElementById('diagResult').style.display = 'none';
    document.getElementById('diagStep2').style.display = 'none';
    document.getElementById('diagStep1').style.display = 'block';
};
/* MI-6 Inspired Geometric Slider Interactive Script */
let mi6CurrentIndex = 0;
const mi6Slides = document.querySelectorAll('.mi6-slide');
const mi6Dots = document.querySelectorAll('.mi6-dot');
let mi6AutoplayTimer = null;

window.goToMi6Slide = function(index) {
    if (!mi6Slides.length) return;
    mi6Slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    mi6Dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    mi6CurrentIndex = index;
};

function nextMi6Slide() {
    if (!mi6Slides.length) return;
    let nextIndex = (mi6CurrentIndex + 1) % mi6Slides.length;
    window.goToMi6Slide(nextIndex);
}

function prevMi6Slide() {
    if (!mi6Slides.length) return;
    let prevIndex = (mi6CurrentIndex - 1 + mi6Slides.length) % mi6Slides.length;
    window.goToMi6Slide(prevIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = id => document.getElementById(id);
    if (document.getElementById('mi6Next')) document.getElementById('mi6Next').addEventListener('click', nextMi6Slide);
    if (document.getElementById('mi6Prev')) document.getElementById('mi6Prev').addEventListener('click', prevMi6Slide);

    // Autoplay slider every 4.5 seconds
    if (mi6Slides.length > 0) {
        mi6AutoplayTimer = setInterval(nextMi6Slide, 4500);
    }

    /* MI-6 Inspired Scroll Reveal Observer */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* Auto Fetch Real note Feed for clover_comms */
    window.fetchNoteFeed('clover_comms');
});


/* Automatic note RSS Auto-Fetcher with Direct XML Parser & Proxy Fallback */
window.fetchNoteFeed = async function(noteId) {
    if (!noteId) return;
    const rssUrl = `https://note.com/${noteId}/rss`;
    
    // Multiple proxy URLs to ensure 100% immediate freshness without cache delay
    const proxyUrls = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`,
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
    ];

    let items = [];

    // Attempt 1: Fetch direct XML via AllOrigins CORS proxy & parse with DOMParser (Fastest & Freshest)
    try {
        const res = await fetch(proxyUrls[0]);
        const xmlText = await res.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const xmlItems = xmlDoc.querySelectorAll("item");

        xmlItems.forEach(item => {
            const title = item.querySelector("title")?.textContent || "";
            const link = item.querySelector("link")?.textContent || "";
            const pubDateStr = item.querySelector("pubDate")?.textContent || "";
            const description = item.querySelector("description")?.textContent || "";
            const mediaContent = item.querySelector("media\\:content, content")?.getAttribute("url") || "";

            // Extract first image from description if media tag not present
            const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
            const thumbImg = mediaContent || (imgMatch ? imgMatch[1] : "");

            if (title && link) {
                items.push({
                    title,
                    link,
                    pubDate: pubDateStr ? new Date(pubDateStr) : new Date(),
                    description,
                    thumbnail: thumbImg
                });
            }
        });
    } catch (err) {
        console.log("AllOrigins XML parser note fallback...", err);
    }

    // Attempt 2: Fallback to rss2json if Attempt 1 returned empty
    if (items.length === 0) {
        try {
            const res2 = await fetch(proxyUrls[1]);
            const data2 = await res2.json();
            if (data2.status === 'ok' && data2.items) {
                items = data2.items.map(item => ({
                    title: item.title,
                    link: item.link,
                    pubDate: new Date(item.pubDate),
                    description: item.description,
                    thumbnail: item.thumbnail || ""
                }));
            }
        } catch (err2) {
            console.log("rss2json note fallback...", err2);
        }
    }

    // Render Items to DOM
    const noteGrid = document.querySelector('.note-grid');

    if (items.length > 0) {
        // 1. Update Hero News Banner with REAL latest note article
        const latestArticle = items[0];
        const pubDate = latestArticle.pubDate.toLocaleDateString('ja-JP', {year: 'numeric', month: '2-digit', day: '2-digit'}).replaceAll('/', '.');
        
        const heroNewsLink = document.getElementById('heroNewsLink');
        const heroNewsDate = document.getElementById('heroNewsDate');
        if (heroNewsLink) {
            heroNewsLink.href = latestArticle.link;
            heroNewsLink.innerHTML = `【公式note】${latestArticle.title} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.75em; margin-left:4px;"></i>`;
        }
        if (heroNewsDate) {
            heroNewsDate.textContent = pubDate;
        }

        const tickerText = document.getElementById('tickerText');
        if (tickerText) {
            tickerText.href = latestArticle.link;
            tickerText.innerHTML = `
                <span class="ticker-date">${pubDate}</span>
                <span class="ticker-title">【公式note更新】${latestArticle.title}</span>
            `;
        }

        // 2. Render Real note Article Cards
        if (noteGrid) {
            noteGrid.innerHTML = items.slice(0, 3).map((item, index) => {
                const pubDate = item.pubDate.toLocaleDateString('ja-JP').replaceAll('/', '.');
                const bgStyle = item.thumbnail ? `background-image: url('${item.thumbnail}'); background-size: cover; background-position: center;` : '';
                const cleanDesc = item.description.replace(/<[^>]*>?/gm, '').trim();

                return `
                    <a href="${item.link}" target="_blank" rel="noopener" class="note-card tilt-card scroll-reveal active">
                        <div class="note-img-placeholder note-bg-${(index % 3) + 1}" style="${bgStyle}">
                            <span class="note-category-badge">公式note (@${noteId})</span>
                        </div>
                        <div class="note-body">
                            <span class="note-date"><i class="fa-regular fa-clock"></i> ${pubDate}</span>
                            <h3 class="note-title">${item.title}</h3>
                            <p class="note-excerpt">${cleanDesc.substring(0, 75) || '公式noteの最新投稿記事です。クリックしてnoteで続きをご覧ください。'}...</p>
                            <div class="note-author">
                                <i class="fa-solid fa-user"></i> クローバーのしまづ
                                <span class="note-read-more">noteで読む <i class="fa-solid fa-arrow-up-right-from-square"></i></span>
                            </div>
                        </div>
                    </a>
                `;
            }).join('');
        }
    } else {
        // Fallback UI if feed is completely empty
        if (noteGrid) {
            noteGrid.innerHTML = `
                <a href="https://note.com/${noteId}" target="_blank" rel="noopener" class="note-card tilt-card scroll-reveal active" style="grid-column: 1 / -1; max-width: 600px; margin: 0 auto;">
                    <div class="note-img-placeholder note-bg-1">
                        <span class="note-category-badge">公式noteアカウント</span>
                    </div>
                    <div class="note-body text-center">
                        <h3 class="note-title" style="font-size: 1.3rem;">公式note (@${noteId}) を開設いたしました！</h3>
                        <p class="note-excerpt">クローバーコミュニケーションズの現場の取り組み、スタッフインタビュー、介護のヒントを順次発信してまいります。</p>
                        <div class="note-author" style="justify-content: center;">
                            <span class="btn btn-note-brand btn-sm">noteで記事を読む <i class="fa-solid fa-arrow-up-right-from-square"></i></span>
                        </div>
                    </div>
                </a>
            `;
        }
    }
};




/* Unified Media Hub 3-Tab Switcher Script (Note / Copain / Hareruya) */
window.switchMediaTab = function(tabKey) {
    const notePanel = document.getElementById('media-panel-note');
    const copainPanel = document.getElementById('media-panel-copain');
    const hareruyaPanel = document.getElementById('media-panel-hareruya');
    const tabBtns = document.querySelectorAll('.media-tab-btn');

    // Reset all tabs
    tabBtns.forEach(btn => btn.classList.remove('active'));
    if (notePanel) notePanel.style.display = 'none';
    if (copainPanel) copainPanel.style.display = 'none';
    if (hareruyaPanel) hareruyaPanel.style.display = 'none';

    if (tabKey === 'note') {
        if (notePanel) notePanel.style.display = 'block';
        if (tabBtns[0]) tabBtns[0].classList.add('active');
    } else if (tabKey === 'copain') {
        if (copainPanel) copainPanel.style.display = 'block';
        if (tabBtns[1]) tabBtns[1].classList.add('active');
    } else if (tabKey === 'hareruya') {
        if (hareruyaPanel) hareruyaPanel.style.display = 'block';
        if (tabBtns[2]) tabBtns[2].classList.add('active');
    }
};

/* Instagram 2-Account Switcher Script (Copain / Hareruya) - Legacy Support */
window.switchInstaAccount = function(accountKey) {
    const copainPanel = document.getElementById('insta-panel-copain');
    const hareruyaPanel = document.getElementById('insta-panel-hareruya');
    const tabBtns = document.querySelectorAll('.insta-tab-btn');

    if (accountKey === 'copain') {
        if (copainPanel) copainPanel.style.display = 'block';
        if (hareruyaPanel) hareruyaPanel.style.display = 'none';
        if (tabBtns[0]) tabBtns[0].classList.add('active');
    } else if (accountKey === 'hareruya') {
        if (copainPanel) copainPanel.style.display = 'none';
        if (hareruyaPanel) hareruyaPanel.style.display = 'block';
        if (tabBtns[0]) tabBtns[0].classList.remove('active');
        if (tabBtns[1]) tabBtns[1].classList.add('active');
    }
};

/* Company Learn More Details Drawer Toggle */
window.toggleCompanyDetails = function() {
    const drawer = document.getElementById('companyDetailsDrawer');
    const icon = document.getElementById('learnMoreIcon');
    const btn = document.getElementById('learnMoreBtn');

    if (!drawer) return;

    if (drawer.style.display === 'none' || drawer.style.display === '') {
        drawer.style.display = 'block';
        if (icon) icon.className = 'fa-solid fa-chevron-up';
        if (btn) btn.querySelector('span').textContent = '詳細情報を閉じる';
    } else {
        drawer.style.display = 'none';
        if (icon) icon.className = 'fa-solid fa-chevron-down';
        if (btn) btn.querySelector('span').textContent = '会社沿革・詳細情報を詳しく見る (Learn More)';
    }
};

/* ==========================================
   GOOGLE MY MAPS: AREA SWITCHER FUNCTION (案1: 越谷・流山・全体切替 ＆ カード連動)
   ========================================== */
window.switchMyMapArea = function(areaKey) {
    const iframe = document.getElementById('googleMyMapIframe');
    if (!iframe) return;

    // ボタンのアクティブ切り替え
    const btnKoshigaya = document.getElementById('btnFilterKoshigaya');
    const btnNagareyama = document.getElementById('btnFilterNagareyama');
    const btnAll = document.getElementById('btnFilterAll');
    const btns = [btnKoshigaya, btnNagareyama, btnAll];
    btns.forEach(b => { if (b) b.classList.remove('active'); });

    const groupKoshigaya = document.getElementById('locGroupKoshigaya');
    const groupNagareyama = document.getElementById('locGroupNagareyama');
    if (groupKoshigaya) groupKoshigaya.classList.remove('area-group-highlight');
    if (groupNagareyama) groupNagareyama.classList.remove('area-group-highlight');

    const baseMid = "10YDzh9KL0KeVAfl-oSOrM4Hfnjlz4pQ";

    if (areaKey === 'koshigaya') {
        if (btnKoshigaya) btnKoshigaya.classList.add('active');
        if (groupKoshigaya) groupKoshigaya.classList.add('area-group-highlight');
        // 越谷エリア（花田・赤山町・越谷駅周辺をズーム14で拡大）
        iframe.src = `https://www.google.com/maps/d/u/0/embed?mid=${baseMid}&ehbc=2E312F&noprof=1&ll=35.8995,139.792&z=14`;
    } else if (areaKey === 'nagareyama') {
        if (btnNagareyama) btnNagareyama.classList.add('active');
        if (groupNagareyama) groupNagareyama.classList.add('area-group-highlight');
        // 流山エリア（西平井・平和台・流山駅周辺をズーム15で拡大）
        iframe.src = `https://www.google.com/maps/d/u/0/embed?mid=${baseMid}&ehbc=2E312F&noprof=1&ll=35.8525,139.904&z=15`;
    } else if (areaKey === 'all') {
        if (btnAll) btnAll.classList.add('active');
        // 広域全体（越谷 ✕ 流山の両方をズーム12で表示）
        iframe.src = `https://www.google.com/maps/d/u/0/embed?mid=${baseMid}&ehbc=2E312F&noprof=1&ll=35.882,139.850&z=12`;
    }
};

/* ==========================================
   FAQ ACCORDION & CATEGORY FILTER
   ========================================== */
window.toggleUniamFaq = function(buttonEl) {
    const item = buttonEl.closest('.faq-uniam-item');
    if (!item) return;
    item.classList.toggle('active');
};

window.filterUniamFaq = function(category, buttonEl) {
    // タブのアクティブ切り替え
    const tabs = document.querySelectorAll('.faq-tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    if (buttonEl) buttonEl.classList.add('active');

    // アイテムのフィルタリング
    const items = document.querySelectorAll('.faq-uniam-item');
    items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
};

/* Global modal helper -> redirect to recruit LP */
window.openSwipeModalDirectly = function() {
    window.location.href = 'recruit.html';
};

/* Contact Form GAS Submission */
const CLOVER_GAS_URL = 'https://script.google.com/macros/s/AKfycbzIzZQdq3i8Ahkb74hJ2p5I14K9WAbIB6jYJoJDUf_UdUaCYTePt7O26eHJ2uHvUPM1qA/exec';

window.handleContactSubmit = async function(event) {
    event.preventDefault();
    const submitBtn = document.getElementById('contactSubmitBtn');
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const category = document.getElementById('category').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !category || !message) {
        alert('必須項目をすべてご入力ください。');
        return;
    }

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>送信中...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
    }

    const payload = {
        formType: 'contact',
        name: name,
        furigana: '',
        email: email,
        tel: phone,
        category: category,
        message: message
    };

    try {
        await fetch(CLOVER_GAS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(payload)
        });

        // 成功時のサンクスメッセージ表示
        const formContainer = document.getElementById('contactMainForm');
        if (formContainer) {
            formContainer.innerHTML = `
                <div style="text-align:center; padding: 40px 20px; background:#FAF8F5; border:2px solid #0D6E3D; border-radius:24px; box-shadow: 4px 4px 0px #0D6E3D;">
                    <div style="width:64px; height:64px; background:#0D6E3D; color:#FFFFFF; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 16px;">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <h3 style="font-family:'Zen Maru Gothic', sans-serif; font-size:1.35rem; font-weight:900; color:#2D3748; margin-bottom:12px;">
                        お問い合わせを受け付けいたしました
                    </h3>
                    <p style="font-size:0.95rem; color:#4A5568; line-height:1.8; margin-bottom:20px;">
                        <strong>${name}</strong> 様<br>
                        お問い合わせいただき誠にありがとうございます。<br>
                        ご入力いただいたメールアドレス（${email}）宛てに受付完了メールをお送りいたしました。<br>
                        担当者より折り返しご連絡いたしますので、今しばらくお待ちください。
                    </p>
                    <a href="index.html" class="btn btn-uniam-submit" style="display:inline-block; text-decoration:none; padding:10px 24px; width:auto;">
                        <span>トップページへ戻る</span>
                    </a>
                </div>
            `;
        }
    } catch (err) {
        console.error('送信エラー:', err);
        alert('送信中にエラーが発生いたしました。お手数ですが、お電話（048-971-9033）にて直接お問い合わせいただけますと幸いです。');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>この内容で送信する</span> <i class="fa-solid fa-paper-plane"></i>';
        }
    }
};





