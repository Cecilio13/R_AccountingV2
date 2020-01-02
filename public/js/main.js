$.noConflict();

jQuery(document).ready(function($) {

	"use strict";

	// [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
	// 	new SelectFx(el);
	// } );
	var textbox = '#ad_beg_bal_shown';
	var hidden = '#ad_beg_bal';
	$(textbox).keyup(function () {
		$(textbox).val(this.value.match(/[0-9.,=]*/));
	var num = $(textbox).val();
		var comma = /,/g;
		num = num.replace(comma,'');
		$(hidden).val(num);
		var numCommas = addCommas(num);
		$(textbox).val(numCommas);
	});
	function addCommas(nStr) {
		nStr += '';
		var comma = /,/g;
		nStr = nStr.replace(comma,'');
		var x = nStr.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}
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
	
	$('#SalesCheckbox').on('click',function(event){
		if(document.getElementById("SalesCheckbox").checked){
            document.getElementById('sub_sales_checkboxes').style.display="block";
            
        }else{
            document.getElementById('sub_sales_checkboxes').style.display="none";
            $('#sub_sales_checkboxes').find('input[type=checkbox]:checked').removeAttr('checked');
        }
	});
	$('#ExpenseCheckbox').on('click',function(event){
		if(document.getElementById("ExpenseCheckbox").checked){
            document.getElementById('sub_expense_checkboxes').style.display="block";
            
        }else{
            document.getElementById('sub_expense_checkboxes').style.display="none";
            $('#sub_expense_checkboxes').find('input[type=checkbox]:checked').removeAttr('checked');
        }
	});
	$('#ProcurementSystemCheckbox').on('click',function(event){
		if(document.getElementById("ProcurementSystemCheckbox").checked){
            document.getElementById('sub_procurement_checkboxes').style.display="block";
            
        }else{
            document.getElementById('sub_procurement_checkboxes').style.display="none";
            
        }
	});
	$('#ApprovalCheckbox').on('click',function(event){
		if(document.getElementById("ApprovalCheckbox").checked){
            document.getElementById('sub_approval_checkboxes').style.display="block";
            
        }else{
            document.getElementById('sub_approval_checkboxes').style.display="none";
            
        }
	});
	$('#ReportCheckbox').on('click',function(event){
		if(document.getElementById("ReportCheckbox").checked){
			document.getElementById('sub_report_checkboxes').style.display="block";
			
		}else{
			document.getElementById('sub_report_checkboxes').style.display="none";
			$('#sub_report_checkboxes').find('input[type=checkbox]:checked').removeAttr('checked');
		}
	});
	$('#AllCheckOption').on('click',function(event){
		if (document.getElementById('AllCheckOption').checked) {
			$('#sub_report_checkboxes :checkbox:enabled').prop('checked', true);
		}
	});
	var journalentrytable=$('#journalentrytable').DataTable({
			paging: false,
			"ordering": true,
			'dom': 'Rlfrtip',
			"autoWidth": false,
			rowReorder: true,
			"columnDefs": [
				{ "width": "5%", "targets": 1 }
			]
			
	});
	if(document.getElementById('journalentrytable_info')){
		document.getElementById('journalentrytable_info').style.display="none";
		document.getElementById('journalentrytable_filter').style.display="none";
	}
	$('#destroydatatable').on('click',function(event){
		$("#journalentrytable").dataTable().fnDestroy();
	});
	$('#rerenderdatatable').on('click',function(event){
		$("#journalentrytable").dataTable().fnDestroy();
		journalentrytable=$("#journalentrytable").DataTable({
			paging: false,
			"ordering": true,
			'dom': 'Rlfrtip',
			"autoWidth": false,
			rowReorder: true
		});
		if(document.getElementById('journalentrytable_info')){
			document.getElementById('journalentrytable_info').style.display="none";
			document.getElementById('journalentrytable_filter').style.display="none";
			console.log('rerendered');
			journalentrytable.on( 'row-reorder', function ( e, diff, edit ) {
			//console.log("asdasdasd->>>> "+edit.triggerRow.data());
			var result = 'Reorder started on row: '+(edit.triggerRow.data())+'<br>';
			
			for ( var i=0, ien=diff.length ; i<ien ; i++ ) {
				var rowData = journalentrytable.row( diff[i].node ).data();
				result += rowData;
				console.log(rowData[113]);
				//result += rowData[1]+' updated to be in position '+
				//    diff[i].newData+' (was '+diff[i].oldData+')<br>';
			}
			});
		}
	});
	$('#showeightcolumn').on('click',function(event){
		var column = journalentrytable.column( 8 );
		column.visible( true );
	});
	$('#hideeightcolumn').on('click',function(event){
		var column = journalentrytable.column( 8 );
		column.visible( false );
	});
	  $('#exporttoexcelbtn').on('click',function(event){
		$("#tablemain").tableExport({

			// Displays table headers (th or td elements) in the <thead>
			headers: true,                    
		  
			// Displays table footers (th or td elements) in the <tfoot>    
			footers: true, 
		  
			// Filetype(s) for the export
			formats: ["xls", "csv", "txt"],           
		  
			// Filename for the downloaded file
			fileName: "id",                         
		  
			// Style buttons using bootstrap framework  
			bootstrap: false,
		  
			// Automatically generates the built-in export buttons for each of the specified formats   
			exportButtons: true,                          
		  
			// Position of the caption element relative to table
			position: "top",                   
		  
			// (Number, Number[]), Row indices to exclude from the exported file(s)
			ignoreRows: null,                             
		  
			// (Number, Number[]), column indices to exclude from the exported file(s)              
			ignoreCols: null,                   
		  
			// Removes all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s)     
			trimWhitespace: false,
		  
			// (Boolean), set direction of the worksheet to right-to-left (default: false)
			RTL: false, 
		  
			// (id, String), sheet name for the exported spreadsheet, (default: 'id') 
			sheetname: "id" 
		  
		  });
		console.log('reset export buttons');
		})
	$('#setselectpickerbuttonjournal_entry').on('click',function(event){
		$('#accjournbale'+document.getElementById('setselectpickerbuttonjournal_entry').getAttribute('data-value')).selectpicker('refresh');
		console.log(document.getElementById('setselectpickerbuttonjournal_entry').getAttribute('data-value'));
		//refreshpicjer();
	})
	$('#setselectpickerbuttonjournal_entry_code').on('click',function(event){
		$('#accjournalcode'+document.getElementById('setselectpickerbuttonjournal_entry_code').getAttribute('data-value')).selectpicker('refresh');
		console.log(document.getElementById('setselectpickerbuttonjournal_entry_code').getAttribute('data-value'));
		//refreshpicjer();
	})
	$('#setselectpickerinvoicedebitcode').on('click',function(event){
		$('#invoice_account_debit_account'+document.getElementById('setselectpickerinvoicedebitcode').getAttribute('data-value')).selectpicker('refresh');
		console.log(document.getElementById('setselectpickerinvoicedebitcode').getAttribute('data-value'));
		//refreshpicjer();
	})
	$('#creditnotedebitcodebutton').on('click',function(event){
		$('#credit_note_account_debit_account').selectpicker('refresh');
		console.log(document.getElementById('creditnotedebitcodebutton').getAttribute('data-value'));
		//refreshpicjer();
	})
	$('#creditnotedebitaccountbutton').on('click',function(event){
		$('#credit_note_account_debit_account_code').selectpicker('refresh');
		console.log(document.getElementById('creditnotedebitaccountbutton').getAttribute('data-value'));
		//refreshpicjer();
	})
	$('#creditnotecreditcodebutton').on('click',function(event){
		$('#credit_note_account_credit_account').selectpicker('refresh');
		console.log(document.getElementById('creditnotecreditcodebutton').getAttribute('data-value'));
		//refreshpicjer();
	})
	$('#creditnotecreditaccountbutton').on('click',function(event){
		$('#credit_note_account_credit_account_code').selectpicker('refresh');
		console.log(document.getElementById('creditnotecreditaccountbutton').getAttribute('data-value'));
		//refreshpicjer();
	})
	$('#bill_credit_account_account_button').on('click',function(event){
		
		$('#bill_account_credit_account').selectpicker('refresh');
	})
	$('#bill_credit_account_code_button').on('click',function(event){
		$('#bill_account_credit_account_code').selectpicker('refresh');
	})
	$('#sales_receipt_account_debit_account_code_button').on('click',function(event){
		$("#"+document.getElementById('sales_receipt_account_debit_account_code_button').getAttribute('data-value')).selectpicker('refresh');
		//console.log('sr acc debit account code button');
		console.log(document.getElementById('sales_receipt_account_debit_account_code_button').getAttribute("data-value"));
	})
	$('#sales_receipt_account_debit_account_button').on('click',function(event){
		$(document.getElementById('supplier_credit_debit_account_code_button').getAttribute('data-value')).selectpicker('refresh');
		console.log('sr acc debit account code button2');
		console.log(document.getElementById('supplier_credit_debit_account_code_button').getAttribute('data-value')+" 123123");
	})
	$('#supplier_credit_debit_account_account_button').on('click',function(event){
		
		$('#supplier_credit_account_debit_account').selectpicker('refresh');
	})
	$('#supplier_credit_debit_account_code_button').on('click',function(event){
		$('#supplier_credit_account_debit_account_code').selectpicker('refresh');
	})
	
	$('#setselectpickerinvoicedebitcodecode').on('click',function(event){
		$('#invoice_account_debit_account_code'+document.getElementById('setselectpickerinvoicedebitcodecode').getAttribute('data-value')).selectpicker('refresh');
		console.log(document.getElementById('setselectpickerinvoicedebitcodecode').getAttribute('data-value'));
		//refreshpicjer();
	})
	$('#setselectpickerinvoicecredtitcode').on('click',function(event){
		$('#invoice_account_credit_account'+document.getElementById('setselectpickerinvoicecredtitcode').getAttribute('data-value')).selectpicker('refresh');
		console.log(document.getElementById('setselectpickerinvoicecredtitcode').getAttribute('data-value'));
		//refreshpicjer();
	})
	$('#setselectpickerinvoicecredtitcodecode').on('click',function(event){
		$('#invoice_account_credit_account_code'+document.getElementById('setselectpickerinvoicecredtitcodecode').getAttribute('data-value')).selectpicker('refresh');
		console.log(document.getElementById('setselectpickerinvoicecredtitcodecode').getAttribute('data-value'));
		//refreshpicjer();
	})
	$('#setselectpickerbutton').on('click',function(event){
		$('.selectpicker').selectpicker('refresh');
		console.log('refresh selectpicker');
		//refreshpicjer();
	})
	$('#destroyselectpickerbutton').on('click',function(event){
		$("."+this.getAttribute('data-class')).selectpicker('destroy');
		console.log(this.getAttribute('data-class'));
		//destroy_select_picker();
	})
	$('#renderselectpickerbutton').on('click',function(event){
		$('.selectpicker').selectpicker('render');
		console.log('render selectpicker');
		//render_select_picker();
	})
	$('#openmodalbtndynamically').on('click',function(event){
		$("#"+this.getAttribute('data-id')).modal()
		//render_select_picker();
	})
	$('#menuToggle').on('click', function(event) {
		$('body').toggleClass('open');
	});
	$('#approval_tab_activator').click(function () {
		$("#myTabApprovals a:eq(0)").click();
		console.log('');
		// or
	   //$('#modalFormUlId a:first').tab('show');
	  
	  });
	$('.search-trigger').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.search-trigger').parent('.header-left').addClass('open');
	});

	$('.search-close').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.search-trigger').parent('.header-left').removeClass('open');
	});
	$('#refresh_debit_cheque_account_select').on('click', function(event) {
		$('#preferred_bedit_cheque_account').selectpicker('refresh');
		console.log('preferred_bedit_cheque_account clicked');
	});
	
	// $('.user-area> a').on('click', function(event) {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	$('.user-menu').parent().removeClass('open');
	// 	$('.user-menu').parent().toggleClass('open');
	// });

	$('#toggle_edit_company_name').on('click', function(event) {
		event.preventDefault();
		
		if($("#company_name").prop('readonly')){
			$("#company_name").prop('readonly', false);
			$("#legal_name").prop('readonly', false);
			$("#business_id_no").prop('readonly', false);
			$("#com_tin_no").prop('readonly', false);
			
		}else{
			$("#company_name").prop('readonly', true);
			$("#legal_name").prop('readonly', true);
			$("#business_id_no").prop('readonly', true);
			$("#com_tin_no").prop('readonly', true);
		}
	});
	$('#toggle_beginning_balance').on('click',function(event){
		if($('#ad_beg_bal_shown').prop('readonly')){
			$('#ad_beg_bal_shown').prop('readonly',false);
		}else{
			$('#ad_beg_bal_shown').prop('readonly',true);
		}
	});
	$('#toggle_sales_receiptsetting').on('click',function(event){
		if($('#preferred_bedit_cheque_account').prop('disabled')){
			
			
			$('#preferred_bedit_cheque_account').prop('disabled',false);
			$('div > div > div > input:text').prop('readonly',false);
			$('#preferred_bedit_cheque_account').selectpicker('refresh');
		}else{
			$('#preferred_bedit_cheque_account').prop('disabled',true);
			$('#preferred_bedit_cheque_account').selectpicker('refresh');
			$('div > div > div > input:text').prop('readonly',false);
		}
	});
	
	$('#toggle_edit_numbering').on('click', function(event) {
		event.preventDefault();
		
		if($("#numbering_sales_exp").prop('readonly')){
			$("#numbering_sales_exp").prop('readonly', false);
			$("#numbering_cash_voucher").prop('readonly', false);
			$("#numbering_cheque_voucher").prop('readonly', false);

			$("#numbering_credit_note").prop('readonly', false);
			$("#numbering_sales_receipt").prop('readonly', false);
			$("#numbering_bill").prop('readonly', false);
			$("#numbering_suppliers_credit").prop('readonly', false);
			$("#numbering_estimate").prop('readonly', false);
			$("#numbering_bill_invoice_main").prop('readonly', false);
			$("#numbering_sales_invoice_branch").prop('readonly', false);
			$("#numbering_bill_invoice_branch").prop('readonly', false);

			
			
			
			
		}else{
			$("#numbering_sales_exp").prop('readonly', true);
			$("#numbering_cash_voucher").prop('readonly', true);
			$("#numbering_cheque_voucher").prop('readonly', true);
			$("#numbering_credit_note").prop('readonly', true);
			$("#numbering_sales_receipt").prop('readonly', true);
			$("#numbering_bill").prop('readonly', true);
			$("#numbering_suppliers_credit").prop('readonly', true);
			$("#numbering_estimate").prop('readonly', true);
			$("#numbering_bill_invoice_main").prop('readonly', true);
			$("#numbering_sales_invoice_branch").prop('readonly', true);
			$("#numbering_bill_invoice_branch").prop('readonly', true);
		}
	});
	
	$('#toggle_edit_cost_center').on('click', function(event) {
		event.preventDefault();
		
		if($("#useCostCenter").prop('disabled')){
			$("#useCostCenter").prop('disabled', false);
			
		}else{
			$("#useCostCenter").prop('disabled', true);
			
		}
	});

	$('#toggle_edit_company_type').on('click', function(event) {
		event.preventDefault();
		
		if($("#tax_form").prop('readonly')){
			$("#tax_form").prop('readonly', false);
			$("#industry").prop('readonly', false);
		}else{
			$("#tax_form").prop('readonly', true);
			$("#industry").prop('readonly', true);
		}
	});

	$('#toggle_edit_contact_info').on('click', function(event) {
		event.preventDefault();
		
		if($("#company_email").prop('readonly')){
			$("#company_email").prop('readonly', false);
			$("#customer_facing_email").prop('readonly', false);
			$("#company_phone").prop('readonly', false);
			$("#website").prop('readonly', false);
		}else{
			$("#company_email").prop('readonly', true);
			$("#customer_facing_email").prop('readonly', true);
			$("#company_phone").prop('readonly', true);
			$("#website").prop('readonly', true);
		}
	});

	$('#toggle_edit_address').on('click', function(event) {
		event.preventDefault();
		
		if($("#company_address").prop('readonly')){
			$("#company_address").prop('readonly', false);
			$("#customer_facing_address").prop('readonly', false);
			$("#legal_address").prop('readonly', false);
			$("#postal1").prop('readonly', false);
			$("#postal2").prop('readonly', false);
			$("#postal3").prop('readonly', false);
		}else{
			$("#company_address").prop('readonly', true);
			$("#customer_facing_address").prop('readonly', true);
			$("#legal_address").prop('readonly', true);
			$("#postal1").prop('readonly', true);
			$("#postal2").prop('readonly', true);
			$("#postal3").prop('readonly', true);
		}
	});

	$('#toggle_edit_sales_form').on('click', function(event) {
		event.preventDefault();
		
		if($("#preferred_invoice_term").prop('readonly')){
			$("#preferred_invoice_term").prop('readonly', false);
			$("#preferred_delivery_method").prop('readonly', false);
			$("#shipping").prop('disabled', false);
			$("#custom_field").prop('disabled', false);
			$("#custom_transaction_number").prop('disabled', false);
			$("#service_date").prop('disabled', false);
			$("#discount").prop('disabled', false);
			$("#deposit").prop('disabled', false);


		}else{
			$("#preferred_invoice_term").prop('readonly', true);
			$("#preferred_delivery_method").prop('readonly', true);
			$("#shipping").prop('disabled', true);
			$("#custom_field").prop('disabled', true);
			$("#custom_transaction_number").prop('disabled', true);
			$("#service_date").prop('disabled', true);
			$("#discount").prop('disabled', true);
			$("#deposit").prop('disabled', true);
		}

	});

	$('#toggle_edit_products_and_services').on('click', function(event) {
		event.preventDefault();
		
		if($("#show_product_column").prop('disabled')){
			$("#show_product_column").prop('disabled', false);
			$("#show_sku_column").prop('disabled', false);
			$("#track_quantity_and_price").prop('disabled', false);
			$("#track_quantity_on_hand").prop('disabled', false);
		}else{
			$("#show_product_column").prop('disabled', true);
			$("#show_sku_column").prop('disabled', true);
			$("#track_quantity_and_price").prop('disabled', true);
			$("#track_quantity_on_hand").prop('disabled', true);
		}

	});

	$('#toggle_edit_sales_messages').on('click', function(event) {
		event.preventDefault();
		
		if($("#form_email_message").prop('readonly')){
			$("#form_email_message").prop('readonly', false);
		}else{
			$("#form_email_message").prop('readonly', true);
		}

	});

	$('#toggle_edit_reminders').on('click', function(event) {
		event.preventDefault();
		
		if($("#default_reminder_message").prop('readonly')){
			$("#default_reminder_message").prop('readonly', false);
		}else{
			$("#default_reminder_message").prop('readonly', true);
		}

	});

	$('#toggle_edit_online_delivery').on('click', function(event) {
		event.preventDefault();
		
		if($("#email_option").prop('readonly')){
			$("#email_option").prop('readonly', false);
		}else{
			$("#email_option").prop('readonly', true);
		}

	});

	$('#toggle_edit_statements').on('click', function(event) {
		event.preventDefault();
		
		if($("#show_aging_table").prop('disabled')){
			$("#show_aging_table").prop('disabled', false);
		}else{
			$("#show_aging_table").prop('disabled', true);
		}

	});

	$('#toggle_edit_bills_and_expenses').on('click', function(event) {
		event.preventDefault();
		
		if($("#show_items_table").prop('disabled')){
			$("#show_items_table").prop('disabled', false);
			$("#track_expense_and_item_by_customer").prop('disabled', false);
			$("#billable").prop('disabled', false);
			$("#bill_payment_terms").prop('readonly', false);
		}else{
			$("#show_items_table").prop('disabled', true);
			$("#track_expense_and_item_by_customer").prop('disabled', true);
			$("#billable").prop('disabled', true);
			$("#bill_payment_terms").prop('readonly', true);
		}

	});

	$('#toggle_edit_purchase_orders').on('click', function(event) {
		event.preventDefault();
		
		if($("#use_purchase_order").prop('disabled')){
			$("#use_purchase_order").prop('disabled', false);
		}else{
			$("#use_purchase_order").prop('disabled', true);
		}

	});

	$('#toggle_edit_expense_messages').on('click', function(event) {
		event.preventDefault();
		
		if($("#purchase_order_email_message").prop('readonly')){
			$("#purchase_order_email_message").prop('readonly', false);
		}else{
			$("#purchase_order_email_message").prop('readonly', true);
		}

	});

	$('#toggle_edit_accounting').on('click', function(event) {
		event.preventDefault();
		
		if($("#first_month_of_fiscal_year").prop('disabled')){
			$("#first_month_of_fiscal_year").prop('disabled', false);
			$("#first_month_of_tax_year").prop('disabled', false);
			$("#accounting_method").prop('disabled', false);
			$("#close_book").prop('disabled', false);
			$("#end_month_of_fiscal_year").prop('disabled', false);
			
		}else{
			$("#first_month_of_fiscal_year").prop('disabled', true);
			$("#first_month_of_tax_year").prop('disabled', true);
			$("#accounting_method").prop('disabled', true);
			$("#close_book").prop('disabled', true);
			$("#end_month_of_fiscal_year").prop('disabled', true);
		}

	});

	$('#toggle_edit_advance_company_type').on('click', function(event) {
		event.preventDefault();
		
		if($("#advance_tax_form").prop('readonly')){
			$("#advance_tax_form").prop('readonly', false);
		}else{
			$("#advance_tax_form").prop('readonly', true);
		}

	});

	$('#toggle_edit_chart_of_accounts').on('click', function(event) {
		event.preventDefault();
		
		if($("#enable_acc_number").prop('disabled')){
			$("#enable_acc_number").prop('disabled', false);
		}else{
			$("#enable_acc_number").prop('disabled', true);
		}

	});

	$('#toggle_edit_categories').on('click', function(event) {
		event.preventDefault();
		
		if($("#track_classes").prop('disabled')){
			$("#track_classes").prop('disabled', false);
			$("#track_location").prop('disabled', false);
		}else{
			$("#track_classes").prop('disabled', true);
			$("#track_location").prop('disabled', true);
		}

	});

	$('#toggle_edit_automation').on('click', function(event) {
		event.preventDefault();
		
		if($("#prefill_form").prop('disabled')){
			$("#prefill_form").prop('disabled', false);
			$("#apply_credit").prop('disabled', false);
			$("#invoice_unbilled_activity").prop('disabled', false);
			$("#apply_bill_payment").prop('disabled', false);
		}else{
			$("#prefill_form").prop('disabled', true);
			$("#apply_credit").prop('disabled', true);
			$("#invoice_unbilled_activity").prop('disabled', true);
			$("#apply_bill_payment").prop('disabled', true);
		}

	});

	$('#toggle_edit_time_tracking').on('click', function(event) {
		event.preventDefault();
		
		if($("#add_service_field").prop('disabled')){
			$("#add_service_field").prop('disabled', false);
			$("#single_time_activity_billable").prop('disabled', false);
		}else{
			$("#add_service_field").prop('disabled', true);
			$("#single_time_activity_billable").prop('disabled', true);
		}

	});
	
	$('#toggle_edit_language').on('click', function(event) {
		event.preventDefault();
		
		if($("#language").prop('disabled')){
			$("#language").prop('disabled', false);
		}else{
			$("#language").prop('disabled', true);
		}

	});

	$('#toggle_edit_currency').on('click', function(event) {
		event.preventDefault();
		
		if($("#home_currency").prop('disabled')){
			$("#home_currency").prop('disabled', false);
			$("#multi_currency").prop('disabled', false);
		}else{
			$("#home_currency").prop('disabled', true);
			$("#multi_currency").prop('disabled', true);
		}

	});

	$('#toggle_edit_other_preferences').on('click', function(event) {
		event.preventDefault();
		
		if($("#date_format").prop('disabled')){
			$("#date_format").prop('disabled', false);
			$("#number_format").prop('disabled', false);
			$("#dup_cheque_num").prop('disabled', false);
			$("#dup_bill_num").prop('disabled', false);
			$("#inactive_time").prop('disabled', false);
		}else{
			$("#date_format").prop('disabled', true);
			$("#number_format").prop('disabled', true);
			$("#dup_cheque_num").prop('disabled', true);
			$("#dup_bill_num").prop('disabled', true);
			$("#inactive_time").prop('disabled', true);
		}

	});
	
	$("#add_customer_form").submit(function(event) {
		event.preventDefault();
		
		$('#addcustomermodal').modal('hide');
	});

	$("#add_invoice_form").submit(function(event) {
		event.preventDefault();
		
		$('#invoicemodal').modal('hide');
	});

	$("#add_payment_form").submit(function(event) {
		event.preventDefault();
		
		$('#receivepaymentmodal').modal('hide');
	});

	$("#add_estimate_form").submit(function(event) {
		event.preventDefault();
		
		$('#estimatemodal').modal('hide');
	});

	$("#add_sales_receipt_form").submit(function(event) {
		event.preventDefault();
		
		$('#salesreceiptmodal').modal('hide');
	});

	$("#add_refund_receipt_form").submit(function(event) {
		event.preventDefault();
		
		$('#refundreceiptmodal').modal('hide');
	});

	$("#add_delayed_charge_form").submit(function(event) {
		event.preventDefault();
		
		$('#delayedchargemodal').modal('hide');
	});

	$("#add_delayed_credit_form").submit(function(event) {
		event.preventDefault();
		
		$('#delayedcreditmodal').modal('hide');
	});

	$("#add_credit_note_form").submit(function(event) {
		event.preventDefault();
		
		$('#creditnotemodal').modal('hide');
	});

	$("#add_expense_form").submit(function(event) {
		event.preventDefault();
		
		$('#expensemodal').modal('hide');
	});

	$("#add_cheque_form").submit(function(event) {
		event.preventDefault();
		
		$('#chequemodal').modal('hide');
	});

	$("#add_bill_form").submit(function(event) {
		event.preventDefault();
		
		$('#billmodal').modal('hide');
	});

	$("#add_purchase_order_form").submit(function(event) {
		event.preventDefault();
		
		$('#purchaseordermodal').modal('hide');
	});

	$("#add_supplier_credit_form").submit(function(event) {
		event.preventDefault();
		
		$('#suppliercreditmodal').modal('hide');
	});

	$("#add_card_credit_form").submit(function(event) {
		event.preventDefault();
		
		$('#creditcardcreditmodal').modal('hide');
	});

});