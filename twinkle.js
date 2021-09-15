/**
 * vim: set noet sts=0 sw=8:
 * +-------------------------------------------------------------------------+
 * |                       === 警告：全局小工具文件 ===                      |
 * |                      对此文件的修改会影响许多用户。                     |
 * |                           修改前请联系维护者。                          |
 * +-------------------------------------------------------------------------+
 *
 * 从Github导入[https://github.com/Xi-Plus/twinkle]
 * 基於 [https://github.com/jimmyxu/twinkle] 和 [https://github.com/vjudge1/twinkle] 的修改
 *
 * ----------
 *
 * 这是经过亂改的Twinkle，是让維護者自己方便使用维基百科的
 * 好帮手。请参见[[WP:TW]]以获取更多信息。
 *
 * 维护者：~~~
 */
// <nowiki>

/* global Morebits */

(function (window, document, $) { // Wrap with anonymous function

var Twinkle = {};
window.Twinkle = Twinkle;  // allow global access

// Check if account is experienced enough to use Twinkle
Twinkle.userAuthorized = Morebits.userIsInGroup('autoconfirmed') || Morebits.userIsInGroup('confirmed');

// for use by custom modules (normally empty)
Twinkle.initCallbacks = [];
Twinkle.addInitCallback = function twinkleAddInitCallback(func) {
	Twinkle.initCallbacks.push(func);
};

Twinkle.defaultConfig = {};
/**
 * Twinkle.defaultConfig.twinkle and Twinkle.defaultConfig.friendly
 *
 * This holds the default set of preferences used by Twinkle. (The |friendly| object holds preferences stored in the FriendlyConfig object.)
 * It is important that all new preferences added here, especially admin-only ones, are also added to
 * |Twinkle.config.sections| in twinkleconfig.js, so they are configurable via the Twinkle preferences panel.
 * For help on the actual preferences, see the comments in twinkleconfig.js.
 */
Twinkle.defaultConfig.twinkle = {
	// General
	summaryAd: ' ([[User:Xiplus/Twinkle|TW]])',
	deletionSummaryAd: ' ([[User:Xiplus/Twinkle|TW]])',
	protectionSummaryAd: ' ([[User:Xiplus/Twinkle|TW]])',
	blockSummaryAd: ' ([[User:Xiplus/Twinkle|TW]])',
	userTalkPageMode: 'tab',
	dialogLargeFont: false,

	// Block
	blankTalkpageOnIndefBlock: false,
	customBlockReasonList: [],

	// Fluff (revert and rollback)
	openTalkPage: [ ],
	openTalkPageOnAutoRevert: false,
	markRevertedPagesAsMinor: [ 'vand' ],
	watchRevertedPages: [ ],
	offerReasonOnNormalRevert: true,
	confirmOnFluff: false,
	showRollbackLinks: [ 'diff', 'others' ],
	customRevertSummary: [],

	// DI (twinkleimage)
	notifyUserOnDeli: true,
	deliWatchPage: 'default',
	deliWatchUser: 'default',

	// CSD
	speedySelectionStyle: 'buttonClick',
	watchSpeedyPages: [ ],
	markSpeedyPagesAsPatrolled: true,

	// these next two should probably be identical by default
	notifyUserOnSpeedyDeletionNomination: [ 'db', 'g1', 'g2', 'g3', 'g5', 'g11', 'g12', 'g13', 'g16', 'a1', 'a2', 'a5', 'a6', 'f6', 'r2', 'r3', 'r7' ],
	welcomeUserOnSpeedyDeletionNotification: [ 'db', 'g1', 'g2', 'g3', 'g5', 'g11', 'g12', 'g13', 'g16', 'a1', 'a2', 'a5', 'a6', 'f6', 'r2', 'r3', 'r7' ],
	promptForSpeedyDeletionSummary: [],
	openUserTalkPageOnSpeedyDelete: [ ],
	deleteTalkPageOnDelete: true,
	deleteRedirectsOnDelete: true,
	deleteSysopDefaultToTag: false,
	speedyWindowHeight: 500,
	speedyWindowWidth: 800,
	logSpeedyNominations: false,
	speedyLogPageName: 'CSD日志',
	noLogOnSpeedyNomination: [ 'o1' ],
	enlargeG11Input: false,

	// Unlink
	unlinkNamespaces: [ '0', '10', '100', '118' ],

	// Warn
	defaultWarningGroup: '1',
	showSharedIPNotice: true,
	watchWarnings: false,
	oldSelect: false,
	customWarningList: [],
	autoMenuAfterRollback: false,

	// XfD
	xfdWatchDiscussion: 'default',
	xfdWatchPage: 'default',
	xfdWatchUser: 'default',
	markXfdPagesAsPatrolled: true,
	FwdCsdToXfd: Morebits.userIsInGroup('sysop'),
	afdDefaultCategory: 'delete',
	afdFameDefaultReason: '沒有足夠的可靠資料來源能夠讓這個條目符合[[Wikipedia:關注度]]中的標準',
	afdSubstubDefaultReason: '過期小小作品',
	XfdClose: Morebits.userIsInGroup('sysop') ? 'all' : 'hide',

	// Copyvio
	copyvioWatchPage: 'default',
	copyvioWatchUser: 'default',
	markCopyvioPagesAsPatrolled: true,
	markDraftCopyvioWithCSD: false,

	// Hidden preferences
	revertMaxRevisions: 50,
	batchdeleteChunks: 50,
	batchMax: 5000,
	batchProtectChunks: 50,
	batchundeleteChunks: 50,
	proddeleteChunks: 50,
	revisionTags: '',
	configPage: 'misaungayay:Xiplus/Twinkle/Preferences',
	projectNamespaceName: mw.config.get('wgFormattedNamespaces')[4],
	sandboxPage: 'Wikipitiya:沙盒'
};

// now some skin dependent config.
switch (mw.config.get('skin')) {
	case 'vector':
		Twinkle.defaultConfig.twinkle.portletArea = 'right-navigation';
		Twinkle.defaultConfig.twinkle.portletId = 'p-twinkle';
		Twinkle.defaultConfig.twinkle.portletName = 'TW';
		Twinkle.defaultConfig.twinkle.portletType = 'menu';
		Twinkle.defaultConfig.twinkle.portletNext = 'p-search';
		break;
	case 'timeless':
		Twinkle.defaultConfig.twinkle.portletArea = '#page-tools .sidebar-inner';
		Twinkle.defaultConfig.twinkle.portletId = 'p-twinkle';
		Twinkle.defaultConfig.twinkle.portletName = 'Twinkle';
		Twinkle.defaultConfig.twinkle.portletType = null;
		Twinkle.defaultConfig.twinkle.portletNext = 'p-userpagetools';
		break;
	default:
		Twinkle.defaultConfig.twinkle.portletArea = null;
		Twinkle.defaultConfig.twinkle.portletId = 'p-cactions';
		Twinkle.defaultConfig.twinkle.portletName = null;
		Twinkle.defaultConfig.twinkle.portletType = null;
		Twinkle.defaultConfig.twinkle.portletNext = null;
}

Twinkle.defaultConfig.friendly = {
	// Tag
	groupByDefault: true,
	watchTaggedPages: false,
	watchMergeDiscussions: false,
	markTaggedPagesAsMinor: false,
	markTaggedPagesAsPatrolled: true,
	tagArticleSortOrder: 'cat',

	// Stub
	enableStub: true,
	customTagList: [],
	watchStubbedPages: false,
	markStubbedPagesAsMinor: false,
	stubArticleSortOrder: 'cat',
	customStubList: [],

	// Talkback
	markTalkbackAsMinor: true,
	insertTalkbackSignature: true,  // always sign talkback templates
	talkbackHeading: wgULS('回复通告', '回覆通告'),
	mailHeading: wgULS('您有新邮件！', '您有新郵件！'),

	// Shared
	markSharedIPAsMinor: true
};

Twinkle.getPref = function twinkleGetPref(name) {
	var result;
	if (typeof Twinkle.prefs === 'object' && typeof Twinkle.prefs.twinkle === 'object') {
		// look in Twinkle.prefs (twinkleoptions.js)
		result = Twinkle.prefs.twinkle[name];
	} else if (typeof window.TwinkleConfig === 'object') {
		// look in TwinkleConfig
		result = window.TwinkleConfig[name];
	}

	if (result === undefined) {
		return Twinkle.defaultConfig.twinkle[name];
	}
	return result;
};

Twinkle.getFriendlyPref = function twinkleGetFriendlyPref(name) {
	var result;
	if (typeof Twinkle.prefs === 'object' && typeof Twinkle.prefs.friendly === 'object') {
		// look in Twinkle.prefs (twinkleoptions.js)
		result = Twinkle.prefs.friendly[name];
	} else if (typeof window.FriendlyConfig === 'object') {
		// look in FriendlyConfig
		result = window.FriendlyConfig[name];
	}

	if (result === undefined) {
		return Twinkle.defaultConfig.friendly[name];
	}
	return result;
};



/**
 * **************** Twinkle.addPortlet() ****************
 *
 * Adds a portlet menu to one of the navigation areas on the page.
 * This is necessarily quite a hack since skins, navigation areas, and
 * portlet menu types all work slightly different.
 *
 * Available navigation areas depend on the skin used.
 * Vector:
 *  For each option, the outer div class contains "vector-menu", the inner div class is "vector-menu-content", and the ul is "vector-menu-content-list"
 *  "mw-panel", outer div class contains "vector-menu-portal". Existing portlets/elements: "p-logo", "p-navigation", "p-interaction", "p-tb", "p-coll-print_export"
 *  "left-navigation", outer div class contains "vector-menu-tabs" or "vector-menu-dropdown". Existing portlets: "p-namespaces", "p-variants" (menu)
 *  "right-navigation", outer div class contains "vector-menu-tabs" or "vector-menu-dropdown". Existing portlets: "p-views", "p-cactions" (menu), "p-search"
 *  Special layout of p-personal portlet (part of "head") through specialized styles.
 * Monobook:
 *  "column-one", outer div class "portlet", inner div class "pBody". Existing portlets: "p-cactions", "p-personal", "p-logo", "p-navigation", "p-search", "p-interaction", "p-tb", "p-coll-print_export"
 *  Special layout of p-cactions and p-personal through specialized styles.
 * Modern:
 *  "mw_contentwrapper" (top nav), outer div class "portlet", inner div class "pBody". Existing portlets or elements: "p-cactions", "mw_content"
 *  "mw_portlets" (sidebar), outer div class "portlet", inner div class "pBody". Existing portlets: "p-navigation", "p-search", "p-interaction", "p-tb", "p-coll-print_export"
 *
 * @param String navigation -- id of the target navigation area (skin dependant, on vector either of "left-navigation", "right-navigation", or "mw-panel")
 * @param String id -- id of the portlet menu to create, preferably start with "p-".
 * @param String text -- name of the portlet menu to create. Visibility depends on the class used.
 * @param String type -- type of portlet. Currently only used for the vector non-sidebar portlets, pass "menu" to make this portlet a drop down menu.
 * @param Node nextnodeid -- the id of the node before which the new item should be added, should be another item in the same list, or undefined to place it at the end.
 *
 * @return Node -- the DOM node of the new item (a DIV element) or null
 */
Twinkle.addPortlet = function(navigation, id, text, type, nextnodeid) {
	// sanity checks, and get required DOM nodes
	var root = document.getElementById(navigation) || document.querySelector(navigation);
	if (!root) {
		return null;
	}

	var item = document.getElementById(id);
	if (item) {
		if (item.parentNode && item.parentNode === root) {
			return item;
		}
		return null;
	}

	var nextnode;
	if (nextnodeid) {
		nextnode = document.getElementById(nextnodeid);
	}

	// verify/normalize input
	var skin = mw.config.get('skin');
	if (skin !== 'vector' || (navigation !== 'left-navigation' && navigation !== 'right-navigation')) {
		type = null; // menu supported only in vector's #left-navigation & #right-navigation
	}
	var outerDivClass, innerDivClass;
	switch (skin) {
		case 'vector':
			// XXX: portal doesn't work
			if (navigation !== 'portal' && navigation !== 'left-navigation' && navigation !== 'right-navigation') {
				navigation = 'mw-panel';
			}
			outerDivClass = 'vector-menu vector-menu-' + (navigation === 'mw-panel' ? 'portal' : type === 'menu' ? 'dropdown vector-menu-dropdown-noicon' : 'tabs');
			innerDivClass = 'vector-menu-content';
			break;
		case 'modern':
			if (navigation !== 'mw_portlets' && navigation !== 'mw_contentwrapper') {
				navigation = 'mw_portlets';
			}
			outerDivClass = 'portlet';
			break;
		case 'timeless':
			outerDivClass = 'mw-portlet';
			innerDivClass = 'mw-portlet-body';
			break;
		default:
			navigation = 'column-one';
			outerDivClass = 'portlet';
			break;
	}

	// Build the DOM elements.
	var outerDiv = document.createElement('nav');
	outerDiv.setAttribute('aria-labelledby', id + '-label');
	// Vector getting vector-menu-empty FIXME TODO
	outerDiv.className = outerDivClass + ' emptyPortlet';
	outerDiv.id = id;
	if (nextnode && nextnode.parentNode === root) {
		root.insertBefore(outerDiv, nextnode);
	} else {
		root.appendChild(outerDiv);
	}

	var h3 = document.createElement('h3');
	h3.id = id + '-label';
	var ul = document.createElement('ul');

	if (skin === 'vector') {
		// add invisible checkbox to keep menu open when clicked
		// similar to the p-cactions ("More") menu
		if (outerDivClass.indexOf('vector-menu-dropdown') !== -1) {
			var chkbox = document.createElement('input');
			chkbox.className = 'vectorMenuCheckbox vector-menu-checkbox'; // remove vectorMenuCheckbox after 1.35-wmf.37 goes live
			chkbox.setAttribute('type', 'checkbox');
			chkbox.setAttribute('aria-labelledby', id + '-label');
			outerDiv.appendChild(chkbox);

			var span = document.createElement('span');
			span.appendChild(document.createTextNode(text));
			h3.appendChild(span);

			var a = document.createElement('a');
			a.href = '#';

			$(a).click(function(e) {
				e.preventDefault();
			});

			h3.appendChild(a);
		}

		outerDiv.appendChild(h3);
		ul.className = 'menu vector-menu-content-list';  // remove menu after 1.35-wmf.37 goes live
	} else {
		h3.appendChild(document.createTextNode(text));
		outerDiv.appendChild(h3);
	}

	if (innerDivClass) {
		var innerDiv = document.createElement('div');
		innerDiv.className = innerDivClass;
		innerDiv.appendChild(ul);
		outerDiv.appendChild(innerDiv);
	} else {
		outerDiv.appendChild(ul);
	}


	return outerDiv;

};


/**
 * **************** Twinkle.addPortletLink() ****************
 * Builds a portlet menu if it doesn't exist yet, and add the portlet link.
 * @param task: Either a URL for the portlet link or a function to execute.
 */
Twinkle.addPortletLink = function(task, text, id, tooltip) {
	if (Twinkle.getPref('portletArea') !== null) {
		Twinkle.addPortlet(Twinkle.getPref('portletArea'), Twinkle.getPref('portletId'), Twinkle.getPref('portletName'), Twinkle.getPref('portletType'), Twinkle.getPref('portletNext'));
	}
	var link = mw.util.addPortletLink(Twinkle.getPref('portletId'), typeof task === 'string' ? task : '#', text, id, tooltip);
	$('.client-js .skin-vector #p-cactions').css('margin-right', 'initial');
	if ($.isFunction(task)) {
		$(link).click(function (ev) {
			task();
			ev.preventDefault();
		});
	}
	if ($.collapsibleTabs) {
		$.collapsibleTabs.handleResize();
	}
	return link;
};


/**
 * **************** General initialization code ****************
 */

var scriptpathbefore = mw.util.wikiScript('index') + '?title=',
	scriptpathafter = '&action=raw&ctype=text/javascript&happy=yes';

// Retrieve the user's Twinkle preferences
$.ajax({
	url: scriptpathbefore + 'User:' + encodeURIComponent(mw.config.get('wgUserName')) + '/twinkleoptions.js' + scriptpathafter,
	dataType: 'text'
})
	.fail(function () {
		mw.notify('未能加载twinkleoptions.js');
	})
	.done(function (optionsText) {

		// Quick pass if user has no options
		if (optionsText === '') {
			return;
		}

		// Twinkle options are basically a JSON object with some comments. Strip those:
		optionsText = optionsText.replace(/(?:^(?:\/\/[^\n]*\n)*\n*|(?:\/\/[^\n]*(?:\n|$))*$)/g, '');

		// First version of options had some boilerplate code to make it eval-able -- strip that too. This part may become obsolete down the line.
		if (optionsText.lastIndexOf('window.Twinkle.prefs = ', 0) === 0) {
			optionsText = optionsText.replace(/(?:^window.Twinkle.prefs = |;\n*$)/g, '');
		}

		try {
			var options = JSON.parse(optionsText);

			// Assuming that our options evolve, we will want to transform older versions:
			// if ( options.optionsVersion === undefined ) {
			// ...
			// options.optionsVersion = 1;
			// }
			// if ( options.optionsVersion === 1 ) {
			// ...
			// options.optionsVersion = 2;
			// }
			// At the same time, twinkleconfig.js needs to be adapted to write a higher version number into the options.

			if (options) {
				Twinkle.prefs = options;
			}
		} catch (e) {
			mw.notify('未能解析twinkleoptions.js');
		}
	})
	.always(function () {
		$(Twinkle.load);
	});

// Developers: you can import custom Twinkle modules here
// For example, mw.loader.load(scriptpathbefore + "User:UncleDouggie/morebits-test.js" + scriptpathafter);

Twinkle.load = function () {
	// Don't activate on special pages other than those on the whitelist so that
	// they load faster, especially the watchlist.
	var specialPageWhitelist = [ 'Block', 'Contributions', 'DeletedContributions', 'Prefixindex', 'AbuseLog' ];
	var isSpecialPage = mw.config.get('wgNamespaceNumber') === -1 &&
		specialPageWhitelist.indexOf(mw.config.get('wgCanonicalSpecialPageName')) === -1 ;

	// Prevent users that are not autoconfirmed from loading Twinkle as well.
	if (isSpecialPage || !Twinkle.userAuthorized) {
		return;
	}

	// Prevent clickjacking
	if (window.top !== window.self) {
		return;
	}

	// Set custom Api-User-Agent header, for server-side logging purposes
	Morebits.wiki.api.setApiUserAgent('Twinkle~szy~/2.0 (' + mw.config.get('wgDBname') + ')');

	// Load the modules in the order that the tabs should appear
	// User/user talk-related
	// Twinkle.arv();
	// Twinkle.warn();
	if (Morebits.userIsInGroup('sysop')) {
		// Twinkle.block();
	}
	// Twinkle.shared();
	// Twinkle.talkback();
	// Deletion
	// Twinkle.speedy();
	// Twinkle.copyvio();
	// Twinkle.xfd();
	// Twinkle.image();
	// Maintenance
	// Twinkle.protect();
	Twinkle.tag();
	// Twinkle.stub();
	// Misc. ones last
	// Twinkle.diff();
	// Twinkle.unlink();
	// Twinkle.config.init();
	// Twinkle.fluff.init();
	if (Morebits.userIsInGroup('sysop')) {
		// Twinkle.batchdelete();
		// Twinkle.batchundelete();
	}
	if (Twinkle.getPref('XfdClose') !== 'hide') {
		// Twinkle.close();
	}

	Twinkle.addPortletLink(mw.util.wikiScript('index') + '?title=' + Twinkle.getPref('configPage'), wgULS('设置', '設定'), 'tw-config', wgULS('设置Twinkle参数', '設定Twinkle參數'));

	// Run the initialization callbacks for any custom modules
	Twinkle.initCallbacks.forEach(function (func) {
		func();
	});
	Twinkle.addInitCallback = function (func) {
		func();
	};

	// Increases text size in Twinkle dialogs, if so configured
	if (Twinkle.getPref('dialogLargeFont')) {
		mw.util.addCSS('.morebits-dialog-content, .morebits-dialog-footerlinks { font-size: 100% !important; } ' +
			'.morebits-dialog input, .morebits-dialog select, .morebits-dialog-content button { font-size: inherit !important; }');
	}
};

}(window, document, jQuery)); // End wrap with anonymous function

// </nowiki>
