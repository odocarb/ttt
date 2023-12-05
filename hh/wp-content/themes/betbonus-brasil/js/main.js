// Language Switcher
/*
var lang_switcher = jQuery("header .menu-temp-lang-switcher-container ul#menu-temp-lang-switcher > li")[0];
var header_right = jQuery("header .header-right")[0];
var header = jQuery(".site-header > container > row")[0];

if(jQuery(window).width() < 1199) {
	jQuery(".menu-header-menu-container > #menu-header-menu")[0].appendChild(lang_switcher);
}

jQuery(window).resize(function(){
	if(jQuery(window).width() < 1199) jQuery(".menu-header-menu-container > #menu-header-menu")[0].appendChild(lang_switcher);

	else jQuery("header .header-right #menu-temp-lang-switcher")[0].appendChild(lang_switcher);
});*/


// Navigation
jQuery(document).ready(function(e) {
	jQuery("[href*='#']").click(function(e) {
		e.preventDefault();
		
		var url = this.href;
		var url_array = url.split("#");

		var fixed_header_height = jQuery(".fixed-header")[0].offsetHeight;
		
		jQuery("html, body").animate({
			scrollTop: jQuery(jQuery("#" + url_array[url_array.length - 1]).offset().top)[0] - fixed_header_height - 45
	    }, 500);
	});
});


// Not Recommended and Not Available Pop Up and Welcome Pop Up
jQuery(".not-recommended.pop-up.opened").each(function() {
	jQuery("body").addClass("opened-not-recommended-pop-up");
});

jQuery(".not-recommended.pop-up.opened .image-layout.close").click(function() {
	jQuery("body").removeClass("opened-not-recommended-pop-up");
	jQuery(jQuery(this).parent().parent().parent().parent().parent()).addClass("closed");
	jQuery(jQuery(this).parent().parent().parent().parent().parent()).removeClass("opened");
});

jQuery(".welcome-pop-up.pop-up.opened").each(function() {
	jQuery("body").addClass("opened-welcome-pop-up");
});

jQuery(".welcome-pop-up.pop-up.opened .image-layout.close").click(function() {
	jQuery("body").removeClass("opened-welcome-pop-up");
	jQuery(jQuery(this).parent().parent().parent().parent().parent()).addClass("closed");
	jQuery(jQuery(this).parent().parent().parent().parent().parent()).removeClass("opened");
});

jQuery(".not-available.pop-up.opened").each(function() {
	jQuery("body").addClass("opened-not-available-pop-up");
});

jQuery(".not-available.pop-up.opened .image-layout.close").click(function() {
	jQuery("body").removeClass("opened-not-available-pop-up");
	jQuery(jQuery(this).parent().parent().parent().parent().parent()).addClass("closed");
	jQuery(jQuery(this).parent().parent().parent().parent().parent()).removeClass("opened");
});


// Bottom Bar - Remove
var last_height = 0;
jQuery(window).scroll(function() {
	jQuery(".bottom-bar").each(function() {
		var scroll = jQuery(window).scrollTop();
		var body_size = jQuery("body")[0].offsetHeight;
		
		var bottom_bar_height = this.offsetHeight
		if(bottom_bar_height == 0) bottom_bar_height = last_height;

    	if(body_size - scroll - window.innerHeight <= bottom_bar_height) {
    		last_height = bottom_bar_height;
    		this.style.display = "none";
    	}
    	else this.style.display = null;
	});
});

// Bottom Bar - Cookie Notice
jQuery(window).load(function() {
	jQuery("#cookie-notice").each(function() {
		if(!jQuery(this).hasClass("cookie-notice-hidden")) {
			var cookie_notice_height = this.offsetHeight;
		
			jQuery(".bottom-bar").each(function() {
				this.style.bottom = cookie_notice_height + "px";
			});
		}
	});

	jQuery("#cn-accept-cookie").click(function() {
		jQuery(".bottom-bar").each(function() {	
			this.style.bottom = 0;
		});
	});
});


// Filter
jQuery(".dynamic-layout > .filter").each(function() {
	var rows = jQuery(this).parent().find(".entries"); // All
	var childs = jQuery(rows).children();

	var dynamic_layout = jQuery(this).parent();
	var show_more = jQuery(this).parent().find(".ajax");

	var filter = this;

	jQuery(this).parent().find(".filter .filters > div").click(function() {
		var counter = jQuery(filter).parent()[0].dataset.activeVisibleNumber;
		var remove_show_more = true;

		// Restore
		var body = jQuery(this).parent().parent().parent().find(".entries")[0];
		for(var j = 0; j < childs.length; j++) body.appendChild(childs[j]);

		// Filter
		var clicked_object = this.dataset.filter;
		
		jQuery(this).parent().parent().parent().find(".entries > div").each(function() {
			var entries = this.dataset.filter;
			var entries_array = entries.split(" ");

			if(clicked_object != "All" && !entries_array.includes(clicked_object)) this.remove();
			else if(counter > 0) {
				jQuery(this).removeClass("hide");
				counter--;
			}
			else {
				remove_show_more = false;
				jQuery(this).addClass("hide");
			}
		});

		if(remove_show_more == true) jQuery(show_more).remove();
		else dynamic_layout[0].appendChild(show_more[0]);

		ajax_action();

		// Active Filter
		var filters = jQuery(this).parent().children();
		for(var i = 0; i < filters.length; i++) jQuery(filters[i]).removeClass("active");

		jQuery(this).addClass("active");
	});
});


// Show More/Less
jQuery(".show-more-less-layout a.button-layout").click(function() {
	var button_div = jQuery(this);
	var show_more_less_div = jQuery(this).parent();
	var content_div = show_more_less_div.find(".content-layout");
	var content_height = 0;

	if(show_more_less_div.hasClass("more")) {
		if(button_div.find(".heading-layout span").length > 0) button_div.find(".heading-layout span")[0].innerHTML = show_more_less_show_less_title;
		if(button_div.find(".icon img").length > 0) button_div.find(".icon img")[0].src = show_more_less_show_less_icon_url;

		var content_children = content_div.children();
    	for(var i = 0; i < content_children.length; i++) var content_height = content_height + jQuery(content_children[i]).outerHeight(true);
		content_div[0].setAttribute("style", "height: " + content_height + "px;");
	}
	else {
		if(button_div.find(".heading-layout span").length > 0) button_div.find(".heading-layout span")[0].innerHTML = show_more_less_show_more_title;
		if(button_div.find(".icon img").length > 0) button_div.find(".icon img")[0].src = show_more_less_show_more_icon_url;

		content_div[0].style.height = null;
	}

	show_more_less_div.toggleClass("more");
	show_more_less_div.toggleClass("less");
});


// Ajax
function ajax_action() {
	jQuery(".ajax .title-layout").click(function() {
		var hidden_rows = jQuery(this).parent().parent().find(".card.hide");
		var visible_entries = jQuery(jQuery(this).parent().parent()).data("visible-number");

		var dynamic_layout = jQuery(jQuery(this).parent().parent())[0];

		dynamic_layout.dataset.activeVisibleNumber = parseInt(dynamic_layout.dataset.activeVisibleNumber) + parseInt(visible_entries);
		
		for(var i = 0; i < visible_entries; i++) jQuery(hidden_rows[i]).removeClass("hide");

		if(hidden_rows.length <= visible_entries) jQuery(this).parent().remove();
	});
}

ajax_action();


// Pagination
jQuery(".pagination > div").click(function() {
	var pages = jQuery(this).parent().find(".page");
	var entries = jQuery(this).parent().parent().find(".card");
	var visible_entries = jQuery(jQuery(this).parent().parent()).data("visible-number");
	var active_page = parseInt(jQuery(this).parent().attr("data-active-page"));
	var clicked_page = 0;
	var min = 1;
	var max = pages.length;

	if(jQuery(this).hasClass("left")) clicked_page = active_page - 1;
	else if(jQuery(this).hasClass("right")) clicked_page = active_page + 1;
	else for(var i = 0; i < max; i++) if(pages[i] == this) clicked_page = i + 1;

	if(clicked_page != active_page && clicked_page <= max && clicked_page >= min) {
		for(var i = 0; i < entries.length; i++) {
			if((i + 1) > (clicked_page - 1) * visible_entries && (i + 1) <= clicked_page * visible_entries) jQuery(entries[i]).removeClass("hide");
			else jQuery(entries[i]).addClass("hide");
		}

		jQuery(jQuery(this).parent().find(".page.active")[0]).removeClass("active");
		jQuery(jQuery(this).parent().find(".page")[clicked_page - 1]).addClass("active");

		jQuery(this).parent().attr("data-active-page", clicked_page);
	}
});


// Toggle
jQuery(".toggle-layout .toggle-head .icon").click(function() {
	var toggle = jQuery(this).parent().parent();

	if(jQuery(toggle).hasClass("close")) jQuery(jQuery(this).children()[0]).attr("src", toggle_close_icon_url);
	else jQuery(jQuery(this).children()[0]).attr("src", toggle_open_icon_url);

	jQuery(toggle).toggleClass("close");
	jQuery(toggle).toggleClass("open");
});


// Accordion
jQuery(".accordion-layout .accordion-head .icon").click(function() {
	var active_accordion = jQuery(this).parent().parent();

	var inactive_accordion = jQuery(this).parent().parent().parent().find(".accordion.open");
	var inactive_img = jQuery(inactive_accordion).find(".accordion-head .icon img");

	if(!jQuery(active_accordion).hasClass("open")) {
		if(jQuery(inactive_accordion).hasClass("close")) jQuery(inactive_img).attr("src", accordion_close_icon_url);
		else jQuery(inactive_img).attr("src", accordion_open_icon_url);

		jQuery(inactive_accordion).toggleClass("close");
		jQuery(inactive_accordion).toggleClass("open");
	}

	if(jQuery(active_accordion).hasClass("close")) jQuery(jQuery(this).children()[0]).attr("src", accordion_close_icon_url);
	else jQuery(jQuery(this).children()[0]).attr("src", accordion_open_icon_url);

	jQuery(active_accordion).toggleClass("close");
	jQuery(active_accordion).toggleClass("open");
});


// Tab
jQuery(".tab-layout .title-layout").click(function() {
	var tab_head = jQuery(this).parent().children();
	var tab_body = jQuery(this).parent().parent().find(".tab-body").children();

	for(var i = 0; i < tab_head.length; i++) {
		if(jQuery(tab_head[i]).hasClass("active")) {
			jQuery(tab_head[i]).removeClass("active");
			jQuery(tab_head[i]).addClass("inactive");
			jQuery(tab_body[i]).removeClass("open");
			jQuery(tab_body[i]).addClass("close");
		}
		
		if(tab_head[i] == this) {
			jQuery(tab_head[i]).removeClass("inactive");
			jQuery(tab_head[i]).addClass("active");
			jQuery(tab_body[i]).removeClass("close");
			jQuery(tab_body[i]).addClass("open");
		}
	}
});


// Counter
function counter(element) {
	jQuery(element).prop("Counter", 0).animate({
        Counter: jQuery(element).text()
    }, {
        duration: parseInt(counter_duration),
        easing: "linear",
        step: function(now) {
            jQuery(element).text(Math.ceil(now));
        }
    });
}

jQuery(".counter").each(function() {
	if(jQuery(this).hasClass("composed-title-layout") || jQuery(this).hasClass("composed-heading-layout")) {
		jQuery(this).find(".title > span").each(function() {
			counter(this);
		});
	}
	else if(jQuery(this).hasClass("title-layout") || jQuery(this).hasClass("heading-layout")) {
		jQuery(this).find("span").each(function() {
			counter(this);
		});
	}
	else if(jQuery(this).hasClass("list-composed-headings-layout") || jQuery(this).hasClass("list-composed-titles-layout")) {
		jQuery(this).find(".title > span").each(function() {
			counter(this);
		});
	}
});


// Fixed Header
/*jQuery(window).scroll(function() {
    var scroll = jQuery(window).scrollTop();

    jQuery(".site-header").each(function() {
    	if(scroll > this.offsetHeight) jQuery(this).addClass("fixed-header");
    	else jQuery(this).removeClass("fixed-header");
    });
});*/

var widget_width = 0;
// Fixed First Widget
jQuery(".sidebar").each(function() {
	var sidebar = jQuery(this).children()[0];
	var first_widget = jQuery(this).find(".widget:first-child")[0];
	var section = jQuery(this).parent().parent().parent()[0];

	var row = jQuery(this).parent()[0];
	var rows = jQuery(jQuery(this).parent().parent()[0]).children();

	widget_width = first_widget.offsetWidth;

    jQuery(window).scroll(function() {
    	var scroll = jQuery(window).scrollTop();

		var hero_size = 0;

		for(var i = 0; i < rows.length; i++) if(rows[i] != row) hero_size += rows[i].offsetHeight;
    	
    	if(!jQuery(first_widget).hasClass("fixed-widget")) sidebarSize = sidebar.scrollHeight;

    	if(section.offsetHeight - scroll - first_widget.offsetHeight  < 76) jQuery(first_widget).removeClass("fixed-widget");
    	else if(scroll > sidebarSize + hero_size) jQuery(first_widget).addClass("fixed-widget");
    	else jQuery(first_widget).removeClass("fixed-widget");

    	if(!jQuery(first_widget).hasClass("fixed-widget")) {
    		widget_width = first_widget.offsetWidth;
    		first_widget.style.width = null;
    	}
    	else first_widget.style.width = parseInt(widget_width) + "px";
    });
});


// Fixed CTA - To Do
jQuery(window).scroll(function() {
    var scroll = jQuery(window).scrollTop();

    if(jQuery('.fixed-cta').length > 0) {
    	if(jQuery('.section-1 .row:first-child .heading-layout:first-child').length > 0) {
    		var os = jQuery(jQuery('.section-1 .row:first-child .heading-layout:first-child')[0]).offset().top;
    		var ht = jQuery(jQuery('.section-1 .row:first-child .heading-layout:first-child')[0]).height();

		    if(scroll > os + ht) {
		        jQuery('.fixed-cta').addClass('active');
		    }
		    else {
		        jQuery('.fixed-cta').removeClass('active');
		    }
		}
	}
});


// Menu
jQuery(".menu-item-has-children").mouseover(function() {
	if(jQuery(window).width() >= 1200) {
		var submenu = jQuery(this).find(".sub-menu");
		submenu.addClass("sub-menu-display");
		
		var icon = jQuery(jQuery(this).find(".dropdown img")[0]);
		if(icon.length > 0) icon.attr("src", menu_submenu_close_icon_url);
	}
});

jQuery("li").mouseout(function(){
    if(jQuery(window).width() >= 1200) {
    	var submenu = jQuery(this).find(".sub-menu-display");
        submenu.removeClass("sub-menu-display");
        
        var icon = jQuery(jQuery(this).find(".dropdown img")[0])
       	if(icon.length > 0) icon.attr("src", menu_submenu_open_icon_url);
    }
});

jQuery(".menu-item-has-children .dropdown").click(function() {
	var submenu = jQuery(this).parent().parent().find(".sub-menu");
	var icon = jQuery(jQuery(this).find("img"));

	if(submenu.hasClass("sub-menu-display")) {
		submenu.removeClass("sub-menu-display");
		if(icon.length > 0) icon.attr("src", menu_submenu_open_icon_url);
	}
	else {
		submenu.addClass("sub-menu-display");
		if(icon.length > 0) icon.attr("src", menu_submenu_close_icon_url);
	}
});

jQuery(".icon.burger").click(function() {
	var menu = jQuery(this).parent();
	var icon = jQuery(jQuery(this).find("img"));
	var body = jQuery("body");

	if(menu.hasClass("open")) {
		menu.removeClass("open");
		menu.addClass("close");
		body.removeClass("menu-overlay");

		if(icon.length > 0) icon.attr("src", menu_mobile_open_icon_url);
	}
	else {
		menu.removeClass("close");
		menu.addClass("open");
		body.addClass("menu-overlay");

		if(icon.length > 0) icon.attr("src", menu_mobile_close_icon_url);
	}
});


// Slider
// Navigation - Pagination
jQuery(".carousel .carousel-navigation.pagination .navigation.page").click(function() {
	var new_slide_num = parseInt(this.dataset.num);
	var carousel_slide = jQuery(this).parent().parent().find(".carousel-slide")[0];
	var active_slide_num = parseInt(carousel_slide.dataset.active);
	var slides = jQuery(carousel_slide).children();
	var slide_size = slides[active_slide_num - 1].clientWidth;
	var navigations = jQuery(this).parent().children();

	jQuery(this).addClass("active");
	jQuery(navigations[active_slide_num - 1]).removeClass("active");
	carousel_slide.dataset.active = new_slide_num;

	carousel_slide.style.transform = "translateX(" + (-slide_size * (new_slide_num - 1)) + "px)";
	carousel_slide.style.transition = "transform 0.4s ease-in-out";
});

// Navigation - Arrows
jQuery(".carousel .carousel-navigation.arrows .navigation.arrow").click(function() {
	var carousel_slide = jQuery(this).parent().parent().find(".carousel-slide")[0];
	var active_slide_num = parseInt(carousel_slide.dataset.active);
	var slides = jQuery(carousel_slide).children();

	if(this.dataset.mov == "L") var new_slide_num = active_slide_num - 1;
	else if(this.dataset.mov == "R") var new_slide_num = active_slide_num + 1;

	if(new_slide_num < 1 || new_slide_num > slides.length) return;

	var slide_size = slides[active_slide_num - 1].clientWidth;

	carousel_slide.dataset.active = new_slide_num;

	carousel_slide.style.transform = "translateX(" + (-slide_size * (new_slide_num - 1)) + "px)";
	carousel_slide.style.transition = "transform 0.4s ease-in-out";
});

// Navigation - Draggable
var dragg = false;
var start_x;
var scrollLeft;
var move;

jQuery(".carousel-slide").mousedown(function(e) {
	dragg = true;
	start_x = e.pageX - this.offsetLeft;
	scrollLeft = this.scrollLeft;
});

jQuery(".carousel-slide").mouseleave(function(e) {
	if(dragg == true) {
		e.preventDefault();

		active_slide_num = parseInt(this.dataset.active);
		var slides = jQuery(this).children();
		var slide_size = slides[active_slide_num - 1].clientWidth;

		if(move < -100) var new_slide_num = active_slide_num - 1;
		else if (move > 100) var new_slide_num = active_slide_num + 1;

		if(new_slide_num < 1 || new_slide_num > slides.length || move >= -100 || move <= 100) {
			this.style.transform = "translateX(" + ((active_slide_num - 1) * (-slide_size)) + "px)";
			this.style.transition = "transform 0.4s ease-in-out";

			dragg = false;
			return;
		}

		var navigations = jQuery(jQuery(this).parent().find(".carousel-navigation.pagination")[0]).children();

		jQuery(navigations[new_slide_num - 1]).addClass("active");
		jQuery(navigations[active_slide_num - 1]).removeClass("active");
		this.dataset.active = new_slide_num;

		this.style.transform = "translateX(" + (-slide_size * (new_slide_num - 1)) + "px)";
		this.style.transition = "transform 0.4s ease-in-out";
	}
	dragg = false;
});

jQuery(".carousel-slide").mouseup(function(e) {
	if(dragg == true) {
		e.preventDefault();

		active_slide_num = parseInt(this.dataset.active);
		var slides = jQuery(this).children();
		var slide_size = slides[active_slide_num - 1].clientWidth;

		if(move < -100) var new_slide_num = active_slide_num - 1;
		else if (move > 100) var new_slide_num = active_slide_num + 1;

		if(new_slide_num < 1 || new_slide_num > slides.length || (move >= -100 && move <= 100)) {
			this.style.transform = "translateX(" + ((active_slide_num - 1) * (-slide_size)) + "px)";
			this.style.transition = "transform 0.4s ease-in-out";

			dragg = false;
			return;
		}

		var navigations = jQuery(jQuery(this).parent().find(".carousel-navigation.pagination")[0]).children();

		jQuery(navigations[new_slide_num - 1]).addClass("active");
		jQuery(navigations[active_slide_num - 1]).removeClass("active");
		this.dataset.active = new_slide_num;

		this.style.transform = "translateX(" + (-slide_size * (new_slide_num - 1)) + "px)";
		this.style.transition = "transform 0.4s ease-in-out";
	}
	dragg = false;
});

jQuery(".carousel-slide").mousemove(function(e) {
	if(dragg == false) return;

	e.preventDefault();
	this.style.transition = null;

	active_slide_num = parseInt(this.dataset.active);
	var slides = jQuery(this).children();
	var slide_size = slides[active_slide_num - 1].clientWidth;

	const x = e.pageX - this.offsetLeft;
	const walk = (x - start_x);

	move = scrollLeft - walk;
	this.style.transform = "translateX(" + (-(scrollLeft - walk) + ((active_slide_num - 1) * (-slide_size))) + "px)";
});

// Navigation - Draggable Mobile
jQuery(".carousel-slide").each(function() {
	this.addEventListener("touchstart", function(e) {
		dragg = true;
		start_x = e.changedTouches[0].pageX - this.offsetLeft;
		scrollLeft = this.scrollLeft;
	});

	this.addEventListener("touchleave", function(e) {
		if(dragg == true) {
			e.preventDefault();

			active_slide_num = parseInt(this.dataset.active);
			var slides = jQuery(this).children();
			var slide_size = slides[active_slide_num - 1].clientWidth;

			if(move < -100) var new_slide_num = active_slide_num - 1;
			else if (move > 100) var new_slide_num = active_slide_num + 1;

			if(new_slide_num < 1 || new_slide_num > slides.length || (move >= -100 && move <= 100)) {
				this.style.transform = "translateX(" + ((active_slide_num - 1) * (-slide_size)) + "px)";
				this.style.transition = "transform 0.4s ease-in-out";

				dragg = false;
				return;
			}

			var navigations = jQuery(jQuery(this).parent().find(".carousel-navigation.pagination")[0]).children();

			jQuery(navigations[new_slide_num - 1]).addClass("active");
			jQuery(navigations[active_slide_num - 1]).removeClass("active");
			this.dataset.active = new_slide_num;

			this.style.transform = "translateX(" + (-slide_size * (new_slide_num - 1)) + "px)";
			this.style.transition = "transform 0.4s ease-in-out";
		}
		dragg = false;
	});

	this.addEventListener("touchend", function(e) {
		if(dragg == true) {
			e.preventDefault();

			active_slide_num = parseInt(this.dataset.active);
			var slides = jQuery(this).children();
			var slide_size = slides[active_slide_num - 1].clientWidth;

			if(move < -100) var new_slide_num = active_slide_num - 1;
			else if (move > 100) var new_slide_num = active_slide_num + 1;

			if(new_slide_num < 1 || new_slide_num > slides.length || (move >= -100 && move <= 100)) {
				this.style.transform = "translateX(" + ((active_slide_num - 1) * (-slide_size)) + "px)";
				this.style.transition = "transform 0.4s ease-in-out";

				dragg = false;
				return;
			}

			var navigations = jQuery(jQuery(this).parent().find(".carousel-navigation.pagination")[0]).children();

			jQuery(navigations[new_slide_num - 1]).addClass("active");
			jQuery(navigations[active_slide_num - 1]).removeClass("active");
			this.dataset.active = new_slide_num;

			this.style.transform = "translateX(" + (-slide_size * (new_slide_num - 1)) + "px)";
			this.style.transition = "transform 0.4s ease-in-out";
		}
		dragg = false;
	});

	this.addEventListener("touchmove", function(e) {
		if(dragg == false) return;

		e.preventDefault();
		this.style.transition = null;

		active_slide_num = parseInt(this.dataset.active);
		var slides = jQuery(this).children();
		var slide_size = slides[active_slide_num - 1].clientWidth;

		const x = e.changedTouches[0].pageX - this.offsetLeft;
		const walk = (x - start_x);

		move = scrollLeft - walk;
		this.style.transform = "translateX(" + (-(scrollLeft - walk) + ((active_slide_num - 1) * (-slide_size))) + "px)";
	});
});


// User Rating

function layoutElement(tag, css_class, parent) {
    var element = document.createElement(tag);

    if(css_class !== null) element.className = css_class;

    parent.appendChild(element);

    return element;
}

function layoutImage(img_array, css_class, parent) {
    if(img_array === null) return;

    var img = document.createElement('img');

    if(css_class !== null) img.className = css_class;
    img.src = img_array['url'];
    img.alt = img_array['alt'];

    parent.appendChild(img);

    return img;
}

function layoutHeading(heading, title, css_class, parent) {
    if(title === null) return;

    var heading = document.createElement(heading);

    heading.innerHTML = title;
    if(css_class !== null) heading.className = css_class;

    parent.appendChild(heading);

    return heading;
}

function layoutTitle(heading, title, icon, css_class, parent) {
    if(title === null && icon !== null) return layoutImage(icon, css_class, parent);
    if(title !== null && icon === null) return layoutHeading(heading, title, css_class, parent);
    if(title === null && icon === null) return;

    var div = document.createElement('div');

    if(css_class !== null) div.className = css_class;

    layoutHeading(heading, title, '', div);
    var icon_div = layoutElement('div', 'icon', div);
    layoutImage(icon, '', icon_div);

    parent.appendChild(div);

    return div;

}

function layoutButton(link, heading, title, icon, css_class, parent, target = null, rel = null) {
    if(link === null) return layoutTitle(heading, title, icon, css_class, parent);
    
    var a = document.createElement('a');

    if(css_class !== null) a.className = css_class;
    a.href = link['url'];
    a.title = link['title'];
    if(target !== null) a.target = target;
    if(rel !== null) a.rel = rel;

    if(title !== null) layoutHeading(heading, title, '', a);
     
    if(icon !== null) layoutImage(icon, '', a);

    parent.appendChild(a);

    return a;
}

function layoutScript(url, parent) {
    var script = document.createElement('script');
    script.src = url;

    parent.appendChild(script);
}


function form(form_id) {
    
}

function closePopUp() {
	var pop_up = jQuery('section.pop-up');
    if(pop_up.length > 0) {
        pop_up.remove();

        var body = jQuery('body');
        jQuery(body[0]).removeClass('pop-up-opened');
    }
}


function createPopUp() {
	var url = document.location.origin + '/wp-content/themes/soaposta/ajax/pop-up.php';

	jQuery.ajax({
		url: url,
		data: {
		},
		success: function(data) {		
			var main = jQuery('body main')[0];

			var section_pop_up = layoutElement('section', 'pop-up', main);
			var div_container = layoutElement('div', 'container', section_pop_up);
			var div_englobe = layoutElement('div', 'englobe', div_container);

			var div_center = layoutElement('div', 'center', div_englobe);

			

			var div_title = layoutElement('div', 'title', div_center);
			layoutHeading('H1', data.pop_up.title, null, div_title);

			var div_content = layoutElement('div', 'content', div_center);
			div_content.innerHTML = data.pop_up.content;

			var div_form = layoutElement('div', 'form', div_center);
			div_form.id = 'pop-up-form';

			var form = document.createElement('form');
			div_form.appendChild(form);
			
			var div_field = layoutElement('div', 'field email', form);

			var input = document.createElement('input');
			input.type = 'email';
			input.name = 'email';
			input.required = true;
			input.placeholder = data.pop_up.email.placeholder;
			div_field.appendChild(input);

			var div_error = layoutElement('div', 'error', div_field);

			var div_field = layoutElement('div', 'field submit', form);
			div_field.addEventListener('click', function() {
				var fields = {};

				var fields_el = jQuery('#' + 'pop-up-form' + ' .field input, #' + 'pop-up-form' + ' .field textarea, #' + 'pop-up-form' + ' .field select');
				for(var i = 0; i < fields_el.length; i++) if(fields_el[i].name) {
					var errors = jQuery(jQuery(fields_el[i]).parent().find('.error')[0]).children();
					for(var j = 0; j < errors.length; j++) errors[j].remove();
					
					fields[fields_el[i].name] = {name: fields_el[i].name, type: fields_el[i].type, required: fields_el[i].required, value: fields_el[i].value, checked: fields_el[i].checked};
				}
				
				var url = document.location.origin + '/wp-content/themes/soaposta/ajax/forms.php';

				jQuery.ajax({
					url: url,
					data: {
						form_identifier: 'pop-up-form',
						fields: fields,
						url: location.protocol + '//' + location.host + location.pathname
					},
					success: function(data) {
						for(var i = 0; i < fields_el.length; i++) if(fields_el[i].name) if(data.errors[fields_el[i].name] != true) {
							var error_el = jQuery(fields_el[i]).parent().find('.error')[0];
							for(var j = 0; j < data.errors[fields_el[i].name].length; j++) layoutHeading('span', data.errors[fields_el[i].name][j], null, error_el);
						}

						if(data.success == true) {
							var success_message = jQuery('#' + 'pop-up-form' + ' > form > .success')[0];

							var success_messages = jQuery(success_message).children();
							for(var j = 0; j < success_messages.length; j++) success_messages[j].remove();

							layoutHeading('span', data.success_message, null, success_message);

							closePopUp();
						}
					},
					dataType: 'json'
				});



			}, false);
			var input = document.createElement('input');
			input.type = 'button';
			input.value = data.pop_up.submit;
			div_field.appendChild(input);

			var div_success = layoutElement('div', 'success', form);

			var div_close = layoutElement('div', 'close', div_center);
			div_close.addEventListener('click', closePopUp);
			layoutHeading('span', data.pop_up.close_text, null, div_close);


			var body = jQuery('body');
			jQuery(body[0]).addClass('pop-up-opened');
		},
		dataType: 'json'
	});
}


jQuery(document).ready(function(e) {
	var timeLeft = 30;
    var timerId = setInterval(countdown, 1000);
    
    function countdown() {
      	if(timeLeft == -1) {
		  clearTimeout(timerId);

		  //createPopUp();
	 	}	  
	  	else timeLeft--;
    }
});
