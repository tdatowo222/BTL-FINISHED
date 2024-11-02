function showPage(pageNumber) {
    const pages = document.querySelectorAll('main'); 

    pages.forEach((page, index) => {
        if (index === pageNumber - 1) {
            page.classList.add('active'); 
        } else {
            page.classList.remove('active'); 
        }
    });
}