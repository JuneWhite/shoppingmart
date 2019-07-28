/**
 * Created by Administrator on 2019/7/2.
 */
export default {
	capitalize(value) {
		if (!value) {
			return '';
		} else {
			value = value.toString()
			return value.charAt(0).toUpperCase() + value.slice(1)
		}
	},
	timeformate(value, fmt) {
		if (value == 0) {
			return '';
		}
		value *= 1000;
		let curDate = new Date(value);
		var o = {
			"M+": curDate.getMonth() + 1,                 //月份
			"d+": curDate.getDate(),                    //日
			"h+": curDate.getHours(),                   //小时
			"m+": curDate.getMinutes(),                 //分
			"s+": curDate.getSeconds(),                 //秒
			"q+": Math.floor((curDate.getMonth() + 3) / 3), //季度
			"S": curDate.getMilliseconds()             //毫秒
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (curDate.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;

	},
	strrepeat(value, separation) {
		let valueInfo = value.split('-');
		let indent = '';
		for (let i = 0; i < valueInfo.length - 1; i++) {
			indent += separation;
		}
		return indent;
	},
	replace(value,repstr){
		return value.replace(repstr,'')
	}
}
