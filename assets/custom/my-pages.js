class LoadPage {

    constructor() {
    }

    home(page) {

    }

    item(page) {
		var _get = {},
			menuNames = {},
			menuId = false,
			formItem = new Form('form-item'),
			titleForm = "NEW",
			localStorageTemp = myApp.c.getLocalStorage(),
			menuSave = typeof localStorageTemp.menu == 'object' ? localStorageTemp.menu : [],
			menuAux = {},
			setFormData = {};
			
			// loop nos dados do menu salvos
			for (var i in menuSave) {
				var id = menuSave[i].menuId;
				menuNames[id] = decodeURIComponent(menuSave[i].label);
				menuAux[id] = {
					positionArray: i,
					name: menuNames[id],
					link: decodeURIComponent(menuSave[i].link),
				};
			};
		
		// edit
		if (Object.keys(page.query).length && typeof page.query.id != 'undefined') {
			menuId = page.query.id;
			titleForm = 'EDIT';
			$('.navbar .link').removeClass('display-none');
			formItem.setFormData(menuAux[menuId]);
		}
		
		// set title form
		$('.page-on-center #title-form').text(titleForm);
		
		// save
		$('#saveItem').on('click', function(){
			if (formItem.validate()) {
				var newData = formItem.getFormData(); 
				
				// validate duplicate name
				var nomesMenu = Object.values(menuNames);
				var idsMenu = Object.keys(menuNames);
				if (nomesMenu.indexOf(newData.name) != -1 && (!menuId || (menuId && menuId != menuSave[menuAux[menuId].positionArray].id))) {
					myApp.c.notification('error', 'Duplicate name!', 'Save', function(){
						formItem.setFormData({name: ''});
					});
					return false;
				}
				
				// edit
				if (menuId) {
					var positionArray = menuAux[menuId].positionArray;
					menuSave[positionArray].id = menuId;
					menuSave[positionArray].label = newData.name;
					menuSave[positionArray].link = encodeURIComponent(newData.link);
					menuSave[positionArray].href = 'show.html?id=' + menuId + '&name=' + encodeURIComponent(newData.name) + '&url=' + encodeURIComponent(newData.link);
					myApp.c.setLocalStorage({menu: menuSave});
					
				// new
				} else {
					menuId = typeof localStorageTemp.menuId == 'number' ? localStorageTemp.menuId + 1 : 1;
					let newMenu = [{
						menuId, 
						label: newData.name, 
						link: encodeURIComponent(newData.link), 
						href: 'show.html?id=' + menuId + '&name=' + encodeURIComponent(newData.name) + '&url=' + encodeURIComponent(newData.link), 
						ico: 'star', 
						class: 'item-menu'
					}];
					myApp.c.setLocalStorage({menuId, menu: menuSave.concat(newMenu)});
					
				}
				
				myApp.c.goIndex();
				loadMenu();
				myApp.openPanel('left');
			}
		});
		
		// @ TODO delete confirm
		$('#deleteItem').on('click', function() {
			menuSave = menuSave.splice(menuId, 1);			
			myApp.c.setLocalStorage({menu: menuSave});
			myApp.c.goIndex();
			loadMenu();
			myApp.openPanel('left');
		});
		
    }

    show(page) {
		// test get
		if (typeof page.query.id == 'undefined' ||  typeof page.query.name == 'undefined' || typeof page.query.url == 'undefined') {
			myApp.c.goIndex();
			return;
		}
		
		var _get = page.query,
			id = _get.id,
			name = _get.name,
			url = _get.url;
			
		$('.title-pg-show').text(name);
		
		$('.editItem').on('click', function(){	
			myApp.c.go('item.html?id=' + id);
		});
		
		myApp.c.setAppConfig({urlApi: url});
        myApp.c.listView ('', {}, 'list', function (a) {
        }, true, false);
		
		return;
    }

    about(page) {
		
    }
	
}