/* CONFIG */
myApp.c.setAppConfig({
    pages: ['home', 'item', 'show', 'about'],
    indexPage: 'home.html',
    navbarHide: false,
    toolbarHide: true,
    loginEnable: false,
});

// get menu no localStorage
var loadMenu  = function() {
	var menu = [],
		localStorage = myApp.c.getLocalStorage(),
		menuSave = typeof localStorage.menu == 'object' ? localStorage.menu : [],
		menuBegin = [{href: 'item.html', label: 'NEW', ico: 'plus-circle'}],
		menuEnd	= [{href: 'about.html', label: 'ABOUT', ico: 'question-circle'}, {label: 'CLOSE', ico: 'close'}];
		menu = menu.concat(menuBegin, menuSave, menuEnd);
	myApp.c.setPanelLeft(menu);	
};
loadMenu();

/* 
myApp.c.setPanelRight([
    {href: 'form.html', class: '', label: 'FORM'},
    {href: 'about.html', class: '', label: 'ABOUT'},
    {href: '#', class: '', label: 'FECHAR'}
]);
 */
 
/*  
myApp.c.setToolbar([
    {href: 'home.html', class: '', label: 'HOME', ico: 'home'},
    {href: 'form.html', class: '', label: 'FORM', ico: 'wpforms'},
    {href: 'about.html', class: '', label: 'ABOUT', ico: 'info-circle'},
]);
 */
/* CONFIG */

/* INIT */
myApp.c.init();
