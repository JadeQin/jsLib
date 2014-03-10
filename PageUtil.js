/**
 * 翻页组件
 * 根据记录总条数，翻页条位置，查询函数，绘制翻页条
 * 
 * @autor qinl 
 */
var PageUtil = {
	defaultPageLines:20,
	pageId : 1,// 当前页
	pageLines : 20,// 每页总条数
	lineCounts : 0,// 总的结果数
	pageCounts : 0,// 总页数
	pageInfo : '',// 翻页条信息
	sch : '',// 查询函数
	isFirst : true,// 首页标志
	isLast : false,// 尾页标志
	/**
	 * 初始化翻页组件，计算总页数，绘制翻页条，初始化查询函数
	 * 
	 * @param counts
	 *            查询结果总条数
	 * @param loc
	 *            翻页条的位置，放于一个容器内，如td或者div
	 * @param sch
	 *            搜索函数
	 */
	init : function(counts, loc, sch) {
		if (counts < 1) {
			jQuery('#' + loc).empty().append('<span style="color:red;">无记录！</span>');
			return false;
		}
		this.lineCounts = counts;
		this.pageCounts = this.pageCount();
		this.sch = sch;
		this.drawPageInfo(loc);
	},
	/**
	 * 绘制翻页条，构建首页，上一页，下一页，尾页等相关信息
	 * 
	 * @param loc
	 * @param sch
	 */
	drawPageInfo : function(loc, sch) {
		var pageInfo = '<a href="#" onclick="PageUtil.firstPage()" id="firstPage">首页</a>&nbsp;<a href="#" onclick="PageUtil.prePage()" id="prePage">上页</a>&nbsp;'
				+ '<a href="#" onclick="PageUtil.nextPage()" id="nextPage">下页</a>&nbsp;<a href="#" onclick="PageUtil.lastPage()" id="lastPage">尾页</a>&nbsp;'
				+ '第 <span id="firstLine">'
				+ this.firstLine()
				+ '</span>条到 <span id="lastLine">'
				+ this.lastLine()
				+ '</span>条/共 <span id="lineCount">'
				+ this.lineCounts
				+ '</span>条&nbsp;'
				+ '第 <span id="pageId">'
				+ this.currentPage()
				+ '</span>页/共 <span id="pageCounts">'
				+ this.pageCounts
				+ '</span>页&nbsp;'
				+ '跳转到 <input id="gotoPageId" name="pageId" type="text" class="input_textfield_page"> 页&nbsp;'
				+ '每页显示 <input id="pageLines" name="pageLines" type="text" value='
				+ this.pageLines
				+ ' class="input_textfield_page">条'
				+ '<input name="B1522" type="submit" class="List_go" onclick="PageUtil.gotoPage(this)" value="">';
		jQuery('#' + loc).empty().append(pageInfo);
		this.initPageState();
	},
	/**
	 * 根据总条数计算总页数
	 * 
	 * @returns
	 */
	pageCount : function() {
		if (this.lineCounts == 0) {
			return 0;
		} else {
			return parseInt(this.lineCounts / this.pageLines)
					+ ((this.lineCounts % this.pageLines == 0) ? 0 : 1);
		}
	},
	/**
	 * 计算当前页的第一条的位置
	 * 
	 * @returns {Number}
	 */
	firstLine : function() {
		if (this.lineCounts == 0) {
			return 0;
		} else {
			return (this.pageId - 1) * this.pageLines + 1;
		}
	},
	/**
	 * 计算当前页最后一条的位置
	 * 
	 * @returns {Number}
	 */
	lastLine : function() {
		var line = this.pageId * this.pageLines;
		if (line > this.lineCounts) {
			return this.lineCounts;
		} else {
			return line;
		}
	},
	/**
	 * 计算当前页的位置
	 * 
	 * @returns {Number}
	 */
	currentPage : function() {
		if (this.lineCounts == 0) {
			this.pageId = 0;
		}
		if(this.pageId>this.pageCounts){
			this.pageId=this.pageCounts;
		}
		return this.pageId;
	},
	/**
	 * 点击首页 如果当前位置为首页，不处理
	 */
	firstPage : function() {
		if (!this.isFirst) {
			if (this.pageCounts > 0) {
				this.pageId = 1;
			} else {
				this.pageId = 0;
			}
			this.initPageState();
			this.sch();
		}
	},
	/**
	 * 点击上一页 如果当前页为首页，不处理
	 */
	prePage : function() {
		if (!this.isFirst) {
			if (this.pageId > 1 && this.pageCounts > 0) {
				this.pageId--;
			} else {
				this.pageId = 0;
			}
			this.initPageState();
			this.sch();
		}
	},
	/**
	 * 点击下一页 如果当前为尾页，不处理
	 */
	nextPage : function() {
		if (!this.isLast) {
			if (this.pageId < this.pageCounts) {
				this.pageId++;
			} else {
				this.pageId = this.pageCounts;
			}
			this.initPageState();
			this.sch();
		}
	},
	/**
	 * 点击尾页 如果当前为尾页，不处理
	 */
	lastPage : function() {
		if (!this.isLast) {
			this.pageId = this.pageCounts;
			this.initPageState();
			this.sch();
		}
	},
	/**
	 * 跳转 如果未指定第几页，跳转到符合当前行数的第一页
	 */
	gotoPage : function() {
		var pageId = jQuery('#gotoPageId').val();
		if(parseInt(pageId)&&pageId<=this.pageCounts&&pageId>0){
			this.pageId = pageId;
		}else{
			this.pageId = 1;
		}
		var pageLines = jQuery('#pageLines').val();
		if(parseInt(pageLines)&&pageLines<10001&&pageLines>0){
			this.pageLines=pageLines;
		}else{
			this.pageLines = this.defaultPageLines;
		}
		this.sch();
	},
	/**
	 * 初始化首尾页标志
	 */
	initPageState : function() {
		if (this.pageCounts == 1) {
			this.isFirst = true;
			this.isLast = true;
			jQuery('#firstPage').attr('disabled', true);
			jQuery('#prePage').attr('disabled', true);
			jQuery('#nextPage').attr('disabled', true);
			jQuery('#lastPage').attr('disabled', true);
			return;
		}
		if (this.pageId == 1) {
			this.isFirst = true;
			jQuery('#firstPage').attr('disabled', 'disabled');
			jQuery('#prePage').attr('disabled', 'disabled');
		} else {
			this.isFirst = false;
			jQuery('#firstPage').attr('disabled', false);
			jQuery('#prePage').attr('disabled', false);
		}
		if (this.pageId == this.pageCounts) {
			this.isLast = true;
			jQuery('#nextPage').attr('disabled', true);
			jQuery('#lastPage').attr('disabled', true);
		} else {
			this.isLast = false;
			jQuery('#nextPage').attr('disabled', false);
			jQuery('#lastPage').attr('disabled', false);
		}
	}
};