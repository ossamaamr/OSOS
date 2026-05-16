// src/js/main.js
import { initCanvasEngine } from './canvas.js';
import { initModalManager } from './modal.js';
import { initCardObserver } from './observer.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. تشغيل محرك غبار الذهب
    initCanvasEngine();
    
    // 2. تفعيل المراقبة اللحظية لظهور البطاقات بسلاسة
    initCardObserver();
    
    // 3. بناء وإطلاق إدارة النوافذ المنبثقة
    initModalManager();
    
    // 4. تتبع حركة الماوس لإحداث توهج البطاقات التفاعلي
    setupCardGlowEffect();
});

function setupCardGlowEffect() {
    const cards = document.querySelectorAll('.poem-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const mx = ((e.clientX - left) / width * 100).toFixed(1);
            const my = ((e.clientY - top) / height * 100).toFixed(1);
            card.style.setProperty('--mx', `${mx}%`);
            card.style.setProperty('--my', `${my}%`);
        }, { passive: true });
    });
}
