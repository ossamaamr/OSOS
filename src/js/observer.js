// src/js/observer.js
export function initCardObserver() {
    const allCards = [...document.querySelectorAll('.poem-card')];
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            const idx = allCards.indexOf(entry.target);
            // توزيع توقيتات الظهور التدريجي (Staggered Animation Effect)
            entry.target.style.animationDelay = `${idx * 85}ms`;
            entry.target.classList.add('visible');
            
            observer.unobserve(entry.target);
        });
    }, { 
        threshold: 0.06,
        rootMargin: '0px 0px 50px 0px' // تحميل استباقي قبل وصول المستخدم بـ 50px
    });

    allCards.forEach(card => observer.observe(card));
}
