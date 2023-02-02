let currentPage;

async function page(url) {
    if (currentPage === url) return;

    const request = await (await fetch(`./html/${url}`)).text();
    document.getElementsByTagName('inner-body')[0].innerHTML = request;

    const pageData = document.querySelectorAll("[data-page]");
    for (let index = 0; index < pageData.length; index++) {
        const element = pageData[index];
        const listener = () => {
            page(element.dataset.page);
            element.removeEventListener('click', listener);
        };
        element.addEventListener('click', listener);
    }

    const switchData = document.querySelectorAll("[data-switch]");
    for (let index = 0; index < switchData.length; index++) {
        const element = switchData[index];
        const urlData = element.dataset.switch.split(",").filter((e) => e !== url);
        const listener = () => {
            page(urlData[0]);
            element.removeEventListener('click', listener);
        };
        element.addEventListener('click', listener);
    }

    currentPage = url;
}

page("index.html");