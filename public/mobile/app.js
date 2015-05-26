// Initialize app and store it to myApp variable for futher access to its methods
var myApp = new Framework7({
    animateNavBackIcon:true,
    pushState: true,
    sortable: false,
    modalTitle: "MyApp",
    modalButtonCancel: "Отмена",
    swipePanel: 'left',
});

if (Framework7.prototype.device.os == "ios") 
	myApp.params.pushState = false;
 
// We need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

$$(".changestyle").click(function() { 
	$$("#pagestyle").attr("href",$$(this).attr('rel'));
	localStorage.setItem("css", $$(this).attr('rel'));
	return false;
});

if(localStorage.getItem("css")) {
	$$("#pagestyle").attr("href",localStorage.getItem("css"));
}

// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true,
  domCache: true,
});

var myList = myApp.virtualList('.list-block.virtual-list', {
    items: [
        {
	    id: 1,
            title: 'Item 1',
            picture: 'http://lorempixel.com/88/88/abstract/1'
        },
        {
	    id: 2,
            title: 'Item 2',
            picture: 'http://lorempixel.com/88/88/abstract/2'
        }
    ],
    height:44,
	template: 
		'<li class="contact-item" data-id="{{id}}" >' +
			  '<a href="about.html" class="item-link">' + 
				  '<div class="item-content">' +
			                  '<div class="item-media"><img src="{{picture}}" width="22"></div>' +
			                  '<div class="item-inner">' +
			                      '<div class="item-title">{{title}}</div>' +
			                  '</div>' +
	        	          '</div>' +
		 	  '</a>' + 
               '</li>'
});  

//                      '<a href="test.html"><div class="item-title">{{title}}</div></a>' +
//myList.appendItem({ title: 'Item 123', picture: 'path/to/picture1000.jpg' });
//myList.appendItem({ title: 'Item 124', picture: 'path/to/picture1000.jpg' });
//myList.appendItem({ title: 'Item 124', picture: 'path/to/picture1000.jpg' });

function reloadTable(table, array)
{
	table.items = array;
	table.update();
}

var itemsArray = [];
function firstInitList(text, count)
{
	itemsArray = [];
	for (var i = 0; i < count; i++ ) 
	{
		itemsArray.push({ id: i, title: text + ' ' + i, picture: 'http://lorempixel.com/88/88/abstract/' + i });
	}
}

firstInitList("Item", 20);
reloadTable(myList, itemsArray);
 
// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
  // Do something here for "about" page
})
// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
  // Get page data from event data
  var page = e.detail.page;
  if (page.name === 'about') {
    // Following code will be executed for page with data-page attribute equal to "about"
    //myApp.alert('Here comes About page');
  }
})
// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
  // Following code will be executed for page with data-page attribute equal to "about"
  //myApp.alert('Here comes About page');
})
$$(document).on('pageInit', function (e) {
  // Do something here when page loaded and initialized
  //myApp.alert('123');
	if(e.detail.page.name === 'index') 
	{
	}
})

var ptrContent = $$('.pull-to-refresh-content');
 
ptrContent.on('refresh', function (e) {
    // Emulate 2s loading
    setTimeout(function () {
	refreshIt();
    }, 500);
});

var songs = ['Yellow Submarine', 'Don\'t Stop Me Now', 'Billie Jean', 'Californication'];
var authors = ['Beatles', 'Queen', 'Michael Jackson', 'Red Hot Chili Peppers'];

function refreshIt()
{
	firstInitList("Refresh", 10);
	myList.deleteAllItems();
	myList.appendItems(itemsArray);

	var temparr = [];
	for(var i = 0; i<8000; i++) 
	{
            var picURL = 'http://lorempixel.com/88/88/abstract/' + Math.round(Math.random() * 10);
            var song = songs[Math.floor(Math.random() * songs.length)];
            var author = authors[Math.floor(Math.random() * authors.length)];
	    temparr.push({ id: i, title: author, picture: picURL });
	}
        myList.appendItems(temparr);
        myApp.pullToRefreshDone();
return false;

            var linkHTML = '<li class="item-content">' +
                                '<div class="item-media"><img src="#" width="44"/></div>' +
                                '<div class="item-inner">' +
                                    '<div class="item-title-row">' +
                                        '<div class="item-title">' + 123 + '</div>' +
                                    '</div>' +
                                    '<div class="item-subtitle">' + 123 + '</div>' +
                                '</div>' +
                            '</li>';

            ptrContent.find('ul').prepend(linkHTML);

        myApp.pullToRefreshDone();
return false;

	//firstInitList("Replace", 20);

	myList.appendItem({ title: 'Item 1', picture: 'http://lorempixel.com/88/88/abstract/1' });
//	myList.deleteAllItems();
//	myList.appendItems(itemsArray);
//	myList.clearCache();
//	myList.items = itemsArray;
//	myList.clearCache();
//	myList.update();

        myApp.pullToRefreshDone();
}


// Loading flag
var loading = false;

// Last loaded index
var lastIndex = $$('.list-block li').length;
 
// Max items to load
var maxItems = 60;
 
// Append items per load
var itemsPerLoad = 20;

$$('.infinite-scroll').on('infinite', function () { loadMore(); });          

$$('.infinite-scroll-preloader').hide();

function loadMore()
{
   // Exit, if loading in progress
  if (loading) return;
  $$('.infinite-scroll-preloader').show();
 
  // Set loading flag
  loading = true;
 
  // Emulate 1s loading
  setTimeout(function () {
    // Reset loading flag
    loading = false;
 
    if (lastIndex >= maxItems) {
      // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
      myApp.detachInfiniteScroll($$('.infinite-scroll'));
      // Remove preloader
      $$('.infinite-scroll-preloader').remove();
      return;
    }
 
    // Generate new items HTML
    //var html = '';
    for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
      //html += '<li class="item-content"><div class="item-inner"><div class="item-title">Item ' + i + '</div></div></li>';
	//myList.appendItem({ title: 'Item ' + i, picture: 'path/to/picture1000.jpg' });
	itemsArray.push({ id: i, title: 'Item ' + i, picture: 'http://lorempixel.com/88/88/abstract/1' });
    }
	reloadTable(myList, itemsArray);
 
    // Append new items
    //$$('.list-block ul').append(html);
 
    // Update last loaded index
    lastIndex = $$('.list-block li').length;
  }, 1000);
}
