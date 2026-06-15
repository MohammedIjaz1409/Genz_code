document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.querySelector('.navbar');
    const toggleIcon = menuToggle.querySelector('i');

    if (menuToggle && navbar && toggleIcon) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            
            if (navbar.classList.contains('active')) {
                toggleIcon.className = 'fa-solid fa-xmark';
            } else {
                toggleIcon.className = 'fa-solid fa-bars';
            }
        });
    }
});
