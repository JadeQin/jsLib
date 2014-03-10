/**
 * loc-input的id
 * date-指定的日期，格式为yyyy-MM-dd
 */

function DatePicker(options){
	DatePickerView.loc=options.loc;
	var dom=$('#'+DatePickerView.loc);
	dom.attr('readonly',true).click(function(){
		DatePickerView.setDate(dom.val());
		DatePickerView.input=dom;
		DatePickerView.show();
	})
}

var DatePickerView = {};
DatePickerView.show = function(){
	DatePickerView.draw();
	DatePickerView.panel.style.display="";
	DatePickerView.panel.style.left = DatePickerView.input.position().left+"px";
	DatePickerView.panel.style.top = DatePickerView.input.position().top + DatePickerView.input.height()+"px";
}

DatePickerView.hide = function(){
	DatePickerView.panel.style.display="none";
}

DatePickerView.refresh = function(){
	$('#CpyDatePicker_year').val(DatePickerView.getYear());
	$('#CpyDatePicker_month').val(DatePickerView.getMonth());
	DatePickerView.buildBody();
}

DatePickerView.nextYear=function(){
	DatePickerView.year++;
	DatePickerView.refresh();
}

DatePickerView.preYear=function(){
	DatePickerView.year--;
	DatePickerView.refresh();	
}


DatePickerView.preMonth=function(){
	if(DatePickerView.month>1){
		DatePickerView.month--;
		DatePickerView.refresh();
	}	
}

DatePickerView.nextMonth=function(){
	if(DatePickerView.month<12){
		DatePickerView.month++;
		DatePickerView.refresh();
	}	
}

/**
 * 画出头部年月变化部分
 * 
 * @returns
 */
DatePickerView.buildControl = function() {
	var html ="<tr><td colspan='7'>"
		+ "<span><a href='#' onclick='DatePickerView.preYear()'><</a></span>&nbsp;"
		+ "<input size=4 id='CpyDatePicker_year' value=" + DatePickerView.getYear() +">&nbsp;"
		+ "<span><a href=#  onclick='DatePickerView.nextYear()'>></a></span>&nbsp;"
		+ "<span><a href='#' onclick='DatePickerView.preMonth()'><</a></span>&nbsp;"
		+ "<input size=4 id='CpyDatePicker_month' value=" + DatePickerView.getMonth() +">&nbsp;"
		+ "<span><a href=#  onclick='DatePickerView.nextMonth()'>></a></span></td></tr>";
	$('#datePicker_control').append(html);
};

/**
 * 画出头部的星期
 * 
 * @returns
 */
DatePickerView.buildHead = function() {
	var weeks = [ '日', '一', '二', '三', '四', '五', '六' ];
	var html='<tr>';
	for ( var i in weeks) {
		html=html+'<td>' + weeks[i] + '</td>';
	}
	$('#datePicker_head').append(html+'</tr>');
};
DatePickerView.getYear= function(){
	if(!DatePickerView.year){
		DatePickerView.year = (new Date).getFullYear();
	}
	return DatePickerView.year;
}
DatePickerView.getMonth= function(){
	
	if(!DatePickerView.month){
		DatePickerView.month = ((new Date).getMonth())+1;
	}
	
	return DatePickerView.month;
}
/**
 * 画出日历的主体部分
 * 
 * @returns
 */
DatePickerView.buildBody = function() {
	var year = DatePickerView.getYear();
	var month = DatePickerView.getMonth();
	var days = new Date(year, month, 0).getDate();
	var week = new Date(year, month - 1, 1).getDay();
	$('#datePicker_body').html('');
	var firstLine = $('<tr></tr>');
	var firstDay = 1;
	for ( var i = 0; i < 7; i++) {
		if (i < week) {
			firstLine.append('<td></td>');
		} else {
			firstLine.append($('<td>').append(DatePickerView._buildTD(firstDay++)));
		}
	}
	$('#datePicker_body').append(firstLine);

	var plusDay = days - (7 - week);
	for ( var i = 0; i < Math.ceil(plusDay / 7); i++) {
		var line = $('<tr></tr>');
		for ( var j = 0; j < 7; j++) {
			var day = (7 - week) + (i * 7 + j + 1);
			if (day > days)
				break;
			line.append($('<td>').append(DatePickerView._buildTD(day)));
		}
		$('#datePicker_body').append(line);
	}
};

/**
 * 在页面画出日历
 * 
 * @param CpyDatePicker
 * @returns
 */
DatePickerView.draw = function() {
	if(DatePickerView.drawed) 
		return ;
	DatePickerView.buildPanel();
	DatePickerView.buildControl();
	DatePickerView.buildHead();
	DatePickerView.buildBody();
	DatePickerView.drawed = true;
	
};

DatePickerView.buildPanel = function(){
	
	var div = document.createElement("div")
	div.setAttribute("id","datePicker_div");
	div.innerHTML = "<table onmouseover='DatePickerView.show()' " +
			" onmouseout='DatePickerView.hide()'> <tbody id='datePicker_control'></tbody>"
		+ "<tbody id='datePicker_head'></tbody>"
		+ "<tbody id='datePicker_body'></tbody></table>"
	div.style.display="none";
	div.style.position="absolute";

	DatePickerView.panel = div;
	
	
	document.body.appendChild(div);
	
}


/**
 * 构建日期的格子
 * 
 * @param val
 * @param self
 * @returns
 */
DatePickerView._buildTD = function(val) {
	return $('<td>').append($('<a href=#>' + val + '</a>').click(function() {
		DatePickerView.setInputDate(DatePickerView.getFullDate(val));
	}));
};

DatePickerView.setInputDate = function(val){
	if(DatePickerView.input)
		DatePickerView.input.val(val);
	DatePickerView.hide();
}


DatePickerView.getFullDate = function(day){
	var ret = DatePickerView.getYear();
	ret = ret+"-";
	if(DatePickerView.getMonth()<10){
		ret = ret +"0"+DatePickerView.getMonth();
	}else{
		ret = ret + DatePickerView.getMonth();	
	}
	if(day<10){
		ret = ret +"-0"+day;
	}else{
		ret = ret +"-"+day;
	}
	return ret;
}

/**
 * 年月变化之后刷新日历
 */
DatePickerView.setDate = function(date) {
	if(!date && date==""){
		DatePickerView.year = null;
		DatePickerView.month = null;
	}else{
		if(date.length==10){
			DatePickerView.year = parseInt(date.substring(0,4));
			DatePickerView.month = parseInt(date.substring(5,7));
			if(DatePickerView.month==0){
				DatePickerView.month = parseInt(date.substring(6,7))
			}
			
		}
	}
	DatePickerView.refresh();
};

