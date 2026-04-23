document.addEventListener('DOMContentLoaded', () => {
    // === Dark Mode Toggle (Tailwind) ===
    const themeBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme');

    // Configura o Switch de modo no botão Navbar (caso exista o elemento)
    function applySystemTheme() {
        if (!themeBtn) return;
        const iconStr = themeBtn.querySelector('i');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            htmlElement.classList.add('dark');
            if (iconStr) iconStr.className = 'fas fa-sun text-yellow-500';
        } else {
            htmlElement.classList.remove('dark');
            if (iconStr) iconStr.className = 'fas fa-moon text-blue-800 dark:text-blue-300';
        }
    }

    applySystemTheme();

    if (themeBtn) {
        themeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const iconStr = themeBtn.querySelector('i');
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                if (iconStr) iconStr.className = 'fas fa-moon text-blue-800 dark:text-blue-300';
            } else {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                if (iconStr) iconStr.className = 'fas fa-sun text-yellow-500';
            }
        });
    }

    // === Logica de Modais Customizáveis (Tailwind) ===
    const modalCards = document.querySelectorAll('[data-modal-target]');
    const closeBtns = document.querySelectorAll('.modal-close');
    const overlays = document.querySelectorAll('.modal-overlay');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        // Timeout pequeno para disparar as transições tailwind suaves
        setTimeout(() => {
            const bodyContent = modal.querySelector('.modal-box');
            const bgOverlay = modal.querySelector('.modal-overlay');
            if (bodyContent) bodyContent.classList.replace('scale-95', 'scale-100');
            if (bgOverlay) bgOverlay.classList.remove('opacity-0');
        }, 10);
    }

    function closeModal(modal) {
        if (!modal) return;
        const bodyContent = modal.querySelector('.modal-box');
        const bgOverlay = modal.querySelector('.modal-overlay');

        if (bodyContent) bodyContent.classList.replace('scale-100', 'scale-95');
        if (bgOverlay) bgOverlay.classList.add('opacity-0');

        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300); // 300ms transition time
    }

    modalCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetId = card.getAttribute('data-modal-target');
            openModal(targetId);
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.closest('.z-\\[100\\]')); // Busca o parente Modal e fecha
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            closeModal(overlay.parentElement);
        });
    });
});
