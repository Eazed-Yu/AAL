window.addEventListener('load', function () {
    let header_navitem = this.document.querySelector('.header_navitem')
    let header_Cloud = this.document.querySelector('.header_Cloud')
    let SuspendedStyle = header_navitem.querySelectorAll('a')
    let header__navbar = this.document.querySelector('.header__navbar')
    let header_hover = this.document.querySelector('.header_hover')
    for (let i = 0; i < SuspendedStyle.length; i++) {
        SuspendedStyle[i].addEventListener('mouseenter', function () {
            animate(header_Cloud, this.offsetLeft);
        })
    }
    header__navbar.addEventListener('mouseleave', function () {
        animate(header_Cloud, header_hover.offsetLeft);
    })
})