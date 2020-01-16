export function number_format(number, decimals, dec_point, thousands_sep) {
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

export function addCommas(nStr) {
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
export function PrintElem(elem){
var mywindow = window.open('', 'PRINT', 'height=400,width=600');
if(elem=="printablereport_employee_contact_list"){
   document.getElementById('report_main_above_button').style.display="none";
}
mywindow.document.write('<html><head><title>' + document.title  + '</title>');
mywindow.document.write('</head><body style="width:100%;">');
//mywindow.document.write('<h1>' + document.title  + '</h1>');
mywindow.document.write(document.getElementById(elem).innerHTML);
mywindow.document.write('<style>');
mywindow.document.write('.report-main{width:100%;}#tablemain{width:100%;border-spacing:0px;}#report_employee_companynameheader{border:0px solid black;}');
mywindow.document.write('#tablemain th{border-top:1px solid #ccc;border-bottom:2px solid #ccc;}');
mywindow.document.write('#tablemain tr td{border-bottom:1px solid #ccc;padding-left:0px;padding-right:0px;}');
mywindow.document.write('</style>');
mywindow.document.write('</body></html>');
if(elem=="printablereport_employee_contact_list"){
   document.getElementById('report_main_above_button').style.display="table-row";
}


mywindow.document.close(); // necessary for IE >= 10
mywindow.focus(); // necessary for IE >= 10*/

mywindow.print();
mywindow.close();

return true;
}

