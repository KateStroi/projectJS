function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass ) {
    
    // Tabs
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabParent = document.querySelector(tabsParentSelector);

    function enableTab(i = 0) {
        tabs[i].classList.add(activeClass);
        tabsContent[i].classList.remove('disable');
        tabsContent[i].classList.add('show');
    }

    function disableTab() {        
        tabsContent.forEach((item, i) => {
            item.classList.add('disable');
            item.classList.remove('show');
        });
           
        tabs.forEach((item, i) => {
            item.classList.remove(activeClass);
        });
    }
       
    tabParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))) {
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

export default tabs;