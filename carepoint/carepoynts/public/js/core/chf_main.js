$(document).ready(function() {

	// Global actions
	$("input[type=radio]").change(function() {
		if($(this).attr("checked") == true) {
			$(this).parents(".formitem").find(".radio_wrap label").removeClass("active");
			$(this).parent().find("label").addClass("active");
		}
	});
	$("input[type=checkbox]","#electrocardiogram").change(function() {
		if($(this).val() == "unknown" || $(this).val() == "other") {
			$(this).parents(".formitem").find("input[type=checkbox]").removeAttr("checked");
			$(this).parents(".formitem").find("label").removeClass("active");
			$(this).attr("checked","checked");
		}
		if($(this).val() == "anterior" || $(this).val() == "lateral") {
			$("input[value='other'],input[value='unknown']","#electrocardiogram").removeAttr("checked").parents(".radio_wrap").find("label").removeClass("active");
		}
		
		if($(this).attr("checked") == true) {
			$(this).parent().find("label").addClass("active");
		} else {
			$(this).parent().find("label").removeClass("active");
		}
	});
	
	// To animate the risk bar
	if($(".bar-percent").length >= 1) {
		var percent = parseInt($(".bar-percent").attr("data-percent"));
		var speed = 500+percent*5;
		setTimeout(function() {
			$(".bar-percent").animate({
				width: percent+"%"
			}, speed, function() {
				$(".percent").fadeIn(100);
			});
		},500);
	}
	
	// Pneumonia Stuff
	$("#pneumonia").submit(function() {
		var missing = $("input[value=utd]:checked").length;
		if(missing > 4) {
			throwError($(this));
		} else {
			count = missing;
			
			if($("#age").val() == "") {
				count = count+1;
			}
			if($("input[name='Male']:checked").length <= 0) {
				count = count+1;
			}
			if($("#urea_mgdl").val() == "" && $("#urea_mmoll").val() == "" && $("#blood_urea_nitrogen_mgdl").val() == "" && $("#blood_urea_nitrogen_mmoll").val() == "") {
				count = count+1;
			} else {
				count = count-1;
			}
			if(count > 3) {
				throwError($(this));
			} else {
				return true;
			}
		}
		return false;
	});
	
	// Heart Failure Stuff
	$("#heart_failure").submit(function() {
		var missing = $("input[value=utd]:checked").length;
		if(missing > 4) {
			throwError($(this));
		} else {
			count = missing;
			
			if($("#age").val() == "") {
				count = count+1;
			}
			if($("input[name='Male']:checked").length <= 0) {
				count = count+1;
			}
			if($("input[name='blood_urea_nitrogen_mgdl']").val() == "" && $("input[name='blood_urea_nitrogen_mmoll']").val() == "" && $("input[name='creatinine_mgdl']").val() == "" && $("input[name='creatinine_mmoll']").val() == "") {
				count = count+1;
			} else {
				count = count-1;
			}
			if(count > 3) {
				throwError($(this));
			} else {
				return true;
			}
		}
		return false;
	});
	
	// Heart Attack Stuff	
	$("#heart_attack").submit(function() {
		var missing = $("input[value=utd]:checked").length;
		if(missing > 4) {
			throwError($(this));
		}	else {
			count = missing;
			
			if($("#age").val() == "") {
				count = count+1;
			}
			if($("input[name='Male']:checked").length <= 0) {
				count = count+1;
			}
			if($("#chest_pain_yes").is(":checked") && $("input[name='chest_pain_length']:checked").length <= 0) {
				count = count+1;
			}
			if($("#ecg_yes").is(":checked")) {
				$("#electrocardiogram > .formitem").each(function() {
					if($(this).find("input[type=radio]:checked").length <= 0) {
						count = count+1;
					}
				});
				if($("#stemi_yes").is(":checked") && $("#mi_location_container").find("input[type=checkbox]:checked").length <= 0) {
					count = count+1;
				}
			}
			if($("#urea_mgdl").val() == "" && $("#urea_mmoll").val() == "" && $("#blood_urea_nitrogen_mgdl").val() == "" && $("#blood_urea_nitrogen_mmoll").val() == "") {
				count = count+1;
			} else {
				count = count-1;
			}
			if(count > 3) {
				throwError($(this));
			} else {
				return true;
			}
		}
		return false;
	});
	
	function throwError(form) {
		form.find("p.error").remove();
		var message = $("<p class='error'>There is not enough patient information to calculate an estimated risk score.</p>").hide().fadeIn(300);
		$(".fieldset:last",form).prepend(message);
	}
	
	$("input[name='bbb']").change(function() {
		if($(this).val() == "lbbb" && $("#stemi_yes").is(":checked")) {
		
			$("input[name='stemi']").removeAttr("checked");
			$("label[for='stemi_yes']").removeClass("active");
			
			$("#mi_location_container").hide();
			$("input[type=radio],input[type=checkbox]","#mi_location_container").removeAttr("checked");
			$("label","#mi_location_container").removeClass("active");
			
		}
	});
	
	if($("#stemi_yes").is(":checked")) {
		$("#mi_location_container").show();
	}
	$("input[name='stemi']").change(function() {
		if($(this).val() == "1") {
			$("#mi_location_container").show();
			if($("#bbb_lbbb").is(":checked")) {
				$("#bbb_lbbb").removeAttr("checked");
				$("label[for='bbb_lbbb']").removeClass("active");
			}
		} else {
			$("#mi_location_container").hide();
			$("input[type=radio]","#mi_location_container").removeAttr("checked");
			$("label","#mi_location_container").removeClass("active");
		}
	});
	
	$("input[type=text]",".textitem").focus(function() {
		$(this).parents(".textitem").find("input[type=radio]").removeAttr("checked");
	});
	$("input[type=text]",".textitem").blur(function() {
		var value = 0;
		$(this).parents(".textitem").find("input[type=text]").each(function() {
			if($(this).val() != "") {
				value = value+1;
			}
		});		
		if(value < 1) {
			$(this).parents(".textitem").find("input[type=radio]").attr("checked","checked");
		}
	});
	$("input[type=radio]",".textitem").change(function() {
		if($(this).is(":checked")) {
			$(this).parents(".textitem").find("input[type=text]").val("");
		}
	});
	
	if($("#chest_pain_yes").is(":checked")) {
		$("#chest_pain_length").show();
	}
	$("input[name='CPno']").change(function() {
		if($(this).val() == "0") {
			$("#chest_pain_length").show();
		} else {
			$("#chest_pain_length").hide();
			$("input[type=radio]","#chest_pain_length").removeAttr("checked");
			$("label","#chest_pain_length").removeClass("active");
		}
	});
	
	if($("#ecg_yes").is(":checked")) {
		$("#electrocardiogram").show();
	}
	$("input[name='ECGutd']").change(function() {
		if($(this).val() == "0") {
			$("#electrocardiogram").show();
		} else {
			$("#electrocardiogram").hide();
			$("input[type=radio],input[type=checkbox]","#electrocardiogram").removeAttr("checked");
			$("label","#electrocardiogram").removeClass("active");
		}
	});
	
	$("button[type='reset']").click(function() {
		$("label").removeClass("active");
	});
	
	// Uncomment to add tooltip on click only. 
	// Will need to adjust CSS as well if this is enabled.
	/*
	$(".tooltip").click(function() {
		if($(this).hasClass("active")) {
			$(this).removeClass("active");
		} else {
			$(".tooltip.active").removeClass("active");
			$(this).addClass("active");
		}
	});
	
	$(document).click(function() {
		if($(event.target).parents(".tooltip").length == 0 && !$(event.target).hasClass("tooltip")) {
			$(".tooltip.active").removeClass("active");
		}
	});
	*/
	
});