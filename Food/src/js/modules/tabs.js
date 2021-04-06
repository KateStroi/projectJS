function tabs() {
    
    // Tabs
    const tabParent = document.querySelector('.tabcontainer'),
           tabsContent = document.querySelectorAll('.tabcontent'),
           tabs = document.querySelectorAll('.tabheader__item');

    function enableTab(i = 0) {
        tabs[i].classList.add('tabheader__item_active');
        tabsContent[i].classList.remove('disable');
        tabsContent[i].classList.add('show');
    }

    function disableTab() {        
        tabsContent.forEach((item, i) => {
            item.classList.add('disable');
            item.classList.remove('show');
        });
           
        tabs.forEach((item, i) => {
            item.classList.remove('tabheader__item_active');
        });
    }
       
    tabParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(item === target) {
                    disableTab();
                    enableTab(i);
                }
            });
        }
    });

    disableTab();
    enableTab();    
}

module.exports = tabs;