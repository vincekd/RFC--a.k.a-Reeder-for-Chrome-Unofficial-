/* Fix for 2column mode Width */
$('#stream-view-options-container > div').click(function() {
	var cssRight = 'auto';
	var cssMaxWidth = '260px';
	
	if( $('#entries').hasClass('cards') || $('#entries').hasClass('search') ) {
		cssRight = '0px';
		cssMaxWidth = '100%';
	}
	
	$('#viewer-entries-container').css( { 
		'right': cssRight
	});
	$('#chrome-title').css( {
		'max-width': cssMaxWidth
	});
});
$('#stream-view-options-container > div').click();

/* Rename for 'Mark all as read' */	
/*
$('#mark-all-as-read-split-button').click(function() {
	$('.goog-menuitem-content').each(function () {
		var caption = $(this).html();
		if( caption == 'All items') {
			$(this).html('Mark all as read');
		} 
	});
});
*/

/* Add element for 'Home' icon */	
$('#overview-selector .link').append('<div class="selector-icon"></div>');


/* fix for entry image / iframe display without cropped at right edge, 3Column Mode */
$('#viewer-entries-container').live('click', function() {
	var visibleWidth = $('#entries.list .entry-body').width();
	visibleWidth -= 20;
		
	$('#entries.list .entry-body img').css( {
		'max-width' : visibleWidth
	});
});
	
/*Buttons tooltip*/
$('#lhn-subscriptions-menubutton').attr('title', 'Subscriptions Menu');
$('#search-input').attr('title', 'Search');
$('#mark-all-as-read-split-button').attr('title', 'Mark as Read');	
$('#entries .entry-actions .sharebox').live('mouseover', function() {
	$(this).attr('title', 'Share on Google+');
});
$('#entries .entry-actions .email').live('mouseover', function() {
	$(this).attr('title', 'Email');
});
$('#entries .entry-actions .item-link').live('mouseover', function() {
	$(this).attr('title', 'Send to');
});
$('#entries .entry-actions .tag').live('mouseover', function() {
	$(this).attr('title', 'Tags');
});


/* Hotkey Binding */
function attachKeyboardShortcuts() {
    document.addEventListener('keydown', handleKeyboardShortcut, true);
}

function handleKeyboardShortcut(e) {
    if (hotkey_3col == 0) //settings value
        return true;

	if ( !$('#entries').hasClass('list') )
		return false;
		
    var tag = e.target.tagName.toLowerCase();

    if ((tag === 'input' && e.target.type === 'text') || tag === 'textarea') {
        return true;
    }
	
    switch (e.keyCode) {
        case 32: // Space key for scrolldown in 3Col mode
        case 34: // Pg-Down key for scrolldown in 3Col mode
            if (!e.metaKey && !e.ctrlKey && !e.altKey) {
                e.stopPropagation();
                e.preventDefault();
				var top = $('#entries.list .expanded .entry-container').scrollTop();
					top += 300;
				$('#entries.list .expanded .entry-container').scrollTop(top);
                return false;
            }
			break;
			
        case 33: // Pg-Up key for scrollup in 3Col mode
            if (!e.metaKey && !e.ctrlKey && !e.altKey) {
                e.stopPropagation();
                e.preventDefault();
				var top = $('#entries.list .expanded .entry-container').scrollTop();
					top -= 300;
				$('#entries.list .expanded .entry-container').scrollTop(top);
                return false;
            }
			break;

        case 35: // End for scroll to bottom in 3Col mode
            if (!e.metaKey && !e.ctrlKey && !e.altKey) {
                e.stopPropagation();
                e.preventDefault();
				$('#entries.list .expanded .entry-container').scrollTop($('#entries.list .expanded .entry-container .entry-main').height());
                return false;
            }
			break;
			
        case 36: // Home for scroll to top in 3Col mode
            if (!e.metaKey && !e.ctrlKey && !e.altKey) {
                e.stopPropagation();
                e.preventDefault();
				$('#entries.list .expanded .entry-container').scrollTop(0);
                return false;
            }
			break;
			
        case 38: // Up key for scrollup in 3Col mode
            if (!e.metaKey && !e.ctrlKey && !e.altKey) {
                e.stopPropagation();
                e.preventDefault();
				var top = $('#entries.list .expanded .entry-container').scrollTop();
					top -= 10;
				$('#entries.list .expanded .entry-container').scrollTop(top);
                return false;
            }
			break;
			
        case 40: // Down key for scrolldown in 3Col mode
            if (!e.metaKey && !e.ctrlKey && !e.altKey) {
                e.stopPropagation();
                e.preventDefault();
				var top = $('#entries.list .expanded .entry-container').scrollTop();
					top += 10;
				$('#entries.list .expanded .entry-container').scrollTop(top);
                return false;
            }
			break;
			
        default: break;
	}
    return true;
}

attachKeyboardShortcuts();

/* Fetch Settings */
chrome.extension.sendRequest({method: 'getLocalStorage', key: 'gb'}, function(response) {
    if(response.data != 0) {
        $('#gbg > .gbtc > .gbt').css('display', 'inline-block');
		$('#gbg > .gbtc > .gbt:last-child').css('display', 'none'); /* old gb reeder setting */
		$('#gbvg > .gbtc > .gbt').css('display', 'inline-block');
	}
});

chrome.extension.sendRequest({method: 'getLocalStorage', key: 'gb_username'}, function(response) {
    if(response.data == 0) {
        $('#gbg > .gbtc > .gbt:first-child').css('display', 'none');
		$('#gbvg > .gbtc > .gbt:first-child').css('display', 'none');
	}
});

chrome.extension.sendRequest({method: 'getLocalStorage', key: 'nav_home'}, function(response) {
    if(response.data != 0)
        $('#home-section').css('display', 'block');
});

chrome.extension.sendRequest({method: 'getLocalStorage', key: 'nav_recommended'}, function(response) {
    if(response.data != 0)
        $('#lhn-recommendations').css('display', 'block');
});

chrome.extension.sendRequest({method: 'getLocalStorage', key: 'bottombar_previousitem'}, function(response) {
    if(response.data != 0)
        $('#entries-up').css('display', 'block');
});

chrome.extension.sendRequest({method: 'getLocalStorage', key: 'markasread_menu'}, function(response) {
    if(response.data == 0) {
		$('#mark-all-as-read-split-button > div:first-child').css('visibility', 'visible');
        $('#mark-all-as-read-split-button > div:nth-child(2)').css('visibility', 'hidden');
	}
});

var hotkey_3col = 1;
chrome.extension.sendRequest({method: 'getLocalStorage', key: 'hotkey_3col'}, function(response) {
    if(response.data != 0)
        hotkey_3col = 1;
});