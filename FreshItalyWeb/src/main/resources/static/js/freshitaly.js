/**
 * 
 */
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
        	o[this.name] = this.value || '';
        }
    });
    return o;
};

function populateSelect(url, element, parameters){
	$.ajax({
	    url: url,
	    type:'GET',
	    dataType: 'json',
	    success: function( json ) {
	    	alert(JSON.stringify(json));
			$.each(json, function(i, obj){
            	$(element).append($('<option>').text(obj.text).attr('value', obj.id));
	        });
	    }
	});
}

function populateForm(url, element, parameters){
    $('.ajax-loader').show();
    $.ajax({
        type: 'POST',
        url: url,
        dataType: 'json',
        timeout: 10000,

        success: function(data){
            if(data){
            	fillForm($(element), data);
            }
        },
        error: function(data, errorThrown){
            alert('request failed :'+errorThrown);
        },
        complete: function(){
              $('.ajax-loader').hide();
        }
  });
	
}

function fillForm(frm, data) {
	$.each(data, function(key, value){
		var $ctrl = $('[name='+key+']', frm);
		if($ctrl.is('textarea')){
			$ctrl.val(value);
		}
		if($ctrl.is('select')){
			$("option",$ctrl).each(function(){
				if (this.value==value) { this.selected=true; }
			});
		} else {
			switch($ctrl.attr("type")) {
				case "text" :  case "date" :  case "hidden":
					$ctrl.val(value);
					break;
				case "radio" : case "checkbox":
					$ctrl.each(function(){
						if($(this).attr('value') == value) {
							$(this).attr("checked",value);
						}
					});
					break;
			}
		}
	});
}

// Registration Form
  $(document).ready(function() {
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            first_name: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please enter your First Name'
                    }
                }
            },
             last_name: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please enter your Last Name'
                    }
                }
            },
			 user_name: {
                validators: {
                     stringLength: {
                        min: 8,
                    },
                    notEmpty: {
                        message: 'Please enter your Username'
                    }
                }
            },
			 user_password: {
                validators: {
                     stringLength: {
                        min: 8,
                    },
                    notEmpty: {
                        message: 'Please enter your Password'
                    }
                }
            },
			confirm_password: {
                validators: {
                     stringLength: {
                        min: 8,
                    },
                    notEmpty: {
                        message: 'Please confirm your Password'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please enter your Email Address'
                    },
                    emailAddress: {
                        message: 'Please enter a valid Email Address'
                    }
                }
            },
            contact_no: {
                validators: {
                  stringLength: {
                        min: 12, 
                        max: 12,
                    notEmpty: {
                        message: 'Please enter your Contact No.'
                     }
                }
            },
			 department: {
                validators: {
                    notEmpty: {
                        message: 'Please select your Department/Office'
                    }
                }
            },
                }
            }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });
});
