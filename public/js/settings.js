$.noConflict();

jQuery(document).ready(function($) {

	"use strict";


	jQuery('.selectpicker').selectpicker;
	$('.SettingsDiv select').prop('disabled', true);
    $('.SettingsDiv input').prop('readonly', true);
    console.log('input enabling');
    $("#add_bank_form :input").prop("readonly", false);
    $("#add_bank_form :input").prop("disabled", false);
    $("#edit_bank_form :input").prop("readonly", false);
	$("#edit_bank_form :input").prop("disabled", false);
	$('#reset_default').on('click',function(event){
		$('.SettingsDiv select').prop('disabled', true);
		$('.SettingsDiv input').prop('readonly', true);
		console.log('input enabling 222');
		$("#add_bank_form :input").prop("readonly", false);
		$("#add_bank_form :input").prop("disabled", false);
		$("#edit_bank_form :input").prop("readonly", false);
		$("#edit_bank_form :input").prop("disabled", false);
	});
	$('#company_form').on('submit',function(event){
		$("#company_form :input").prop("readonly", false);
	});
	$('#sales_form').on('submit',function(event){
		$("#sales_form :input").prop("disabled", false);
	});
	$('#expenses_form').on('submit',function(event){
		$("#expenses_form :input").prop("disabled", false);
	});
	$('#advance_form').on('submit',function(event){
		$("#advance_form :input").prop("disabled", false);
	});
	
});