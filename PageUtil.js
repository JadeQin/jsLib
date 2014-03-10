/**
 * ��ҳ���
 * ���ݼ�¼����������ҳ��λ�ã���ѯ���������Ʒ�ҳ��
 * 
 * @autor qinl 
 */
var PageUtil = {
	defaultPageLines:20,
	pageId : 1,// ��ǰҳ
	pageLines : 20,// ÿҳ������
	lineCounts : 0,// �ܵĽ����
	pageCounts : 0,// ��ҳ��
	pageInfo : '',// ��ҳ����Ϣ
	sch : '',// ��ѯ����
	isFirst : true,// ��ҳ��־
	isLast : false,// βҳ��־
	/**
	 * ��ʼ����ҳ�����������ҳ�������Ʒ�ҳ������ʼ����ѯ����
	 * 
	 * @param counts
	 *            ��ѯ���������
	 * @param loc
	 *            ��ҳ����λ�ã�����һ�������ڣ���td����div
	 * @param sch
	 *            ��������
	 */
	init : function(counts, loc, sch) {
		if (counts < 1) {
			jQuery('#' + loc).empty().append('<span style="color:red;">�޼�¼��</span>');
			return false;
		}
		this.lineCounts = counts;
		this.pageCounts = this.pageCount();
		this.sch = sch;
		this.drawPageInfo(loc);
	},
	/**
	 * ���Ʒ�ҳ����������ҳ����һҳ����һҳ��βҳ�������Ϣ
	 * 
	 * @param loc
	 * @param sch
	 */
	drawPageInfo : function(loc, sch) {
		var pageInfo = '<a href="#" onclick="PageUtil.firstPage()" id="firstPage">��ҳ</a>&nbsp;<a href="#" onclick="PageUtil.prePage()" id="prePage">��ҳ</a>&nbsp;'
				+ '<a href="#" onclick="PageUtil.nextPage()" id="nextPage">��ҳ</a>&nbsp;<a href="#" onclick="PageUtil.lastPage()" id="lastPage">βҳ</a>&nbsp;'
				+ '�� <span id="firstLine">'
				+ this.firstLine()
				+ '</span>���� <span id="lastLine">'
				+ this.lastLine()
				+ '</span>��/�� <span id="lineCount">'
				+ this.lineCounts
				+ '</span>��&nbsp;'
				+ '�� <span id="pageId">'
				+ this.currentPage()
				+ '</span>ҳ/�� <span id="pageCounts">'
				+ this.pageCounts
				+ '</span>ҳ&nbsp;'
				+ '��ת�� <input id="gotoPageId" name="pageId" type="text" class="input_textfield_page"> ҳ&nbsp;'
				+ 'ÿҳ��ʾ <input id="pageLines" name="pageLines" type="text" value='
				+ this.pageLines
				+ ' class="input_textfield_page">��'
				+ '<input name="B1522" type="submit" class="List_go" onclick="PageUtil.gotoPage(this)" value="">';
		jQuery('#' + loc).empty().append(pageInfo);
		this.initPageState();
	},
	/**
	 * ����������������ҳ��
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
	 * ���㵱ǰҳ�ĵ�һ����λ��
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
	 * ���㵱ǰҳ���һ����λ��
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
	 * ���㵱ǰҳ��λ��
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
	 * �����ҳ �����ǰλ��Ϊ��ҳ��������
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
	 * �����һҳ �����ǰҳΪ��ҳ��������
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
	 * �����һҳ �����ǰΪβҳ��������
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
	 * ���βҳ �����ǰΪβҳ��������
	 */
	lastPage : function() {
		if (!this.isLast) {
			this.pageId = this.pageCounts;
			this.initPageState();
			this.sch();
		}
	},
	/**
	 * ��ת ���δָ���ڼ�ҳ����ת�����ϵ�ǰ�����ĵ�һҳ
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
	 * ��ʼ����βҳ��־
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