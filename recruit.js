/* --------------------------------------------------
   Recruit Page Interactive JS
   株式会社クローバーコミュニケーションズ
-------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Job Category Filter Tabs
    const filterTabs = document.querySelectorAll('.btn-filter-tab');
    const jobCards = document.querySelectorAll('.job-card-box');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filterValue = tab.getAttribute('data-filter');

            // Active Tab Style
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter Job Cards
            jobCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'grid';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // 2. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// 3. Select Job In Form from Job Card Action
function selectJobInForm(jobKey) {
    const jobSelect = document.getElementById('entryJob');
    if (jobSelect) {
        jobSelect.value = jobKey;
        // Visual cue highlight
        jobSelect.style.borderColor = '#0D6E3D';
        jobSelect.style.boxShadow = '0 0 0 3px rgba(13, 110, 61, 0.25)';
        setTimeout(() => {
            jobSelect.style.borderColor = '';
            jobSelect.style.boxShadow = '';
        }, 2000);
    }
}

// 4. Form Submission (Google Apps Script Integration)
const CLOVER_RECRUIT_GAS_URL = 'https://script.google.com/macros/s/AKfycbzIzZQdq3i8Ahkb74hJ2p5I14K9WAbIB6jYJoJDUf_UdUaCYTePt7O26eHJ2uHvUPM1qA/exec';

async function handleRecruitSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('recruitEntryForm');
    const submitBtn = form.querySelector('button[type="submit"]');

    const name = document.getElementById('entryName').value.trim();
    const tel = document.getElementById('entryTel').value.trim();
    const email = document.getElementById('entryEmail').value.trim();
    const jobSelect = document.getElementById('entryJob');
    const jobText = jobSelect.options[jobSelect.selectedIndex] ? jobSelect.options[jobSelect.selectedIndex].text : '';
    const typeSelect = document.getElementById('entryType');
    const typeText = typeSelect.options[typeSelect.selectedIndex] ? typeSelect.options[typeSelect.selectedIndex].text : '';
    const message = document.getElementById('entryMessage').value.trim();

    if (!name || !tel || !jobSelect.value || !typeSelect.value) {
        alert('必須項目をすべてご入力ください。');
        return;
    }

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>送信中...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
    }

    const payload = {
        formType: 'recruit',
        name: name,
        tel: tel,
        email: email,
        job: jobText,
        type: typeText,
        message: message
    };

    try {
        await fetch(CLOVER_RECRUIT_GAS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(payload)
        });

        form.innerHTML = `
            <div style="text-align:center; padding: 40px 20px; background:#ECFDF5; border:2px solid #059669; border-radius:20px; box-shadow: 4px 4px 0px #059669;">
                <div style="width:60px; height:60px; background:#059669; color:#FFFFFF; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.8rem; margin:0 auto 16px;">
                    <i class="fa-solid fa-check"></i>
                </div>
                <h3 style="font-family:'Zen Maru Gothic', sans-serif; font-size:1.4rem; font-weight:900; color:#065F46; margin-bottom:12px;">
                    ご応募・見学のお申し込みありがとうございます！
                </h3>
                <p style="font-size:0.95rem; color:#047857; line-height:1.8; margin-bottom:20px;">
                    <strong>${name}</strong> 様の受付を完了いたしました。<br>
                    ${email ? `ご入力いただいたメールアドレス（${email}）宛てに受付完了メールをお送りいたしました。<br>` : ''}
                    2営業日以内に、採用担当よりお電話（${tel}）またはメールにてご連絡を差し上げます。
                </p>
                <a href="index.html" style="display:inline-flex; align-items:center; gap:8px; background:#FFFFFF; color:#065F46; border:2px solid #059669; padding:10px 24px; border-radius:30px; font-weight:900; text-decoration:none;">
                    <i class="fa-solid fa-house"></i> トップページへ戻る
                </a>
            </div>
        `;
    } catch (err) {
        console.error('送信エラー:', err);
        alert('送信中にエラーが発生いたしました。お手数ですが、お電話（048-971-9033）にて直接ご連絡いただけますと幸いです。');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> 応募・見学相談を申し込む';
        }
    }
}
