(function(){
	var CustomDropdown = function(context,options){
		this.init(context,options);
	};

	CustomDropdown.prototype = (function(){
		var DEFAULT = {
			customclass : "cdd",
			defaultvalue : "Choose",
			animateTime : 100
		};
		var $target,
			$newSelect,
			$newSelectUl,
			$newSelectLi,
			$newSelectDefault,
			selectedValue;

		var createCustomSelect = function(){
			var $ul = $("<ul class='"+DEFAULT.customclass+"_ul'>"), 
				li = "";
			$target.find("option").each(function(){
				li += "<li class='"+DEFAULT.customclass+"_li' data-value='"+$(this).val()+"'>"+$(this).text()+"</li>";
			});
			$ul.append(li);
			$ul.insertAfter($target);
			$ul.wrap("<ul class='"+DEFAULT.customclass+"' id='"+DEFAULT.customid+"'></ul>");
			$("<li class='"+DEFAULT.customclass+"_selected'>"+selectedValue+"</li>").insertBefore($ul);

			$newSelect = $("." + DEFAULT.customclass);
			$newSelectUl = $("." + DEFAULT.customclass + "_ul");
			$newSelectLi = $("." + DEFAULT.customclass + "_li");
			$newSelectDefault = $("." + DEFAULT.customclass + "_selected");

			$newSelectLi.eq(0).addClass("first");
			$newSelect.height($newSelectDefault.outerHeight());
		};

		var bindEvent = function(){
			$newSelectDefault.off("click").on("click",function(){
				$newSelect.toggleClass("clicked");
				var newHeight = $newSelect.hasClass("clicked") ? $(this).outerHeight() + $newSelectUl.outerHeight() : $(this).outerHeight(); 
				$newSelect.animate({
					"height" : newHeight
				},DEFAULT.animateTime);
			});

			$newSelectLi.off("click").on("click",function(){
				$newSelect.animate({
					"height" : $newSelectDefault.outerHeight()
				},DEFAULT.animateTime,function(){
					$newSelect.removeClass("clicked");	
				});
				$newSelectDefault.text($(this).text());
				$target.val($(this).data("value"));
			});
		};

		return {
			init : function(context,options){
				$target = context;
				DEFAULT = $.extend(DEFAULT, options);
				selectedValue = $target.find("option:selected").text();
				//$target.hide();
				createCustomSelect();
				bindEvent();
			}
		};
	})();

	$.fn.customDropdown = function(options){
		return this.each(function(){
			$(this).data("cdd", new CustomDropdown($(this),options));
		});
	};

})();


// usage insde jquery ready function
$(function(){
	$(".dropdown").customDropdown({
		customid : "dropdown", // 
		customclass : "cdd",
		defaultvalue : "choose value"
	});
});