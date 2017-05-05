(function (global) {
    document.addEventListener('DOMContentLoaded', function() {
        var parentItems = document.querySelectorAll('.em-menu__parent'),
            subMenuArr = document.querySelectorAll('.em-submenu'),
            i,
            activeSubmenu,
            body = document.body;

        function closeActiveSubmenu(subMenu) {
            if (subMenu) {
                subMenu.classList.remove('em-submenu_show');
            }
        }

        function hasMenuActiveItems() {
            var i;

            for (i = 0; i < subMenuArr.length; i++) {
                if (subMenuArr[i].classList.contains('em-submenu_show')) {
                    return true;
                }
            }

            return false;
        }

        function setBodyClickHandler() {
            body.addEventListener('click', bodyClickHandler);
        }

        function removeBodyClickEvent(handler) {
            body.removeEventListener('click', handler);
        }

        function bodyClickHandler(e) {
            if (!isClickOnSubmenu(e.target)) {
                closeActiveSubmenu(activeSubmenu);
                removeBodyClickEvent(bodyClickHandler);
                activeSubmenu = null;
            }
        }

        function isClickOnSubmenu(target) {
            var result = false;

            if (target) {
                result = target.classList.contains('em-submenu') ||
                            (target.nodeName === 'SPAN' && target.parentNode.parentNode.classList.contains('em-menu__level-2')) ||
                            (target.classList.contains('em-menu__title') && target.parentNode.classList.contains('em-menu__level-2')) ||
                            (target.classList.contains('em-menu__level-2'));
            }

            return result;
        }

        function getSubmenu(parent) {
            var subMenu = null;

            if (parent && parent.nodeName) {
                switch (parent.nodeName) {
                    case 'SPAN':
                        //subMenu = parent.parentElement.parentElement.childNodes[1];
                        subMenu = parent.parentElement.parentElement.querySelector('.em-submenu');
                        break;
                    case 'A':
                        //subMenu = parent.parentElement.childNodes[1];
                        subMenu = parent.parentElement.querySelector('.em-submenu');
                        break;
                    case 'DIV':
                        subMenu = parent.querySelector('.em-submenu');
                        break;
                }
            }

            return subMenu;
        }

        function toggleDropdown(element) {
            if (element) {
                element.classList.toggle('em-submenu_show');
                
            }
        }


        function toggleDropdownHandler(e) {

            var target = e.target,
                subMenu;

            if (!isClickOnSubmenu(target)) {
                e.preventDefault();

                subMenu = getSubmenu(target);

                if (subMenu && subMenu.classList.contains('em-submenu')) {
                    // Если нажатое меню не раскрыто
                    if (!subMenu.classList.contains('em-submenu_show')) {
                        // Если уже есть открытые пункты меню, очищаем обработчик по клику на body, закрываем активный пункт, открываем новый
                        // затем снова вешаем обработчик на body
                        if (hasMenuActiveItems()) {
                            removeBodyClickEvent(bodyClickHandler);
                            closeActiveSubmenu(activeSubmenu);
                            toggleDropdown(subMenu);
                            activeSubmenu = subMenu;
                        } else {
                            // Если активных пунктов меню нет, то открываем подменю нажатого пункта и вешаем обработчик на body 
                            activeSubmenu = subMenu;
                            toggleDropdown(subMenu);
                        }
                        setTimeout(setBodyClickHandler, 100);
                    } else {
                        // Если пункт уже открыт, убираем обработчик на body и закрываем пункт меню
                        removeBodyClickEvent(bodyClickHandler);
                        toggleDropdown(subMenu);
                    }
                }
            } 
            
        }

        for (i = 0; i < parentItems.length; i++) {
            parentItems[i].addEventListener('click', toggleDropdownHandler);
        }
    });
})(this)