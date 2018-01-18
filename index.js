/**
 * 导出json为EXCEL文件
 * @author chenmo
 * @date 2017/11/29 0029
 */

/**
* json =[
 *  title: []
 *  data: []
 * ]
* */
 module.exports = function (json, FileName, type) {
        var tmpDown; //导出的二进制对象

        var keyMap = []; //获取keys

        json.title.map(function (value, index) {
            keyMap.push(value);
            json.title[index] = value;
        });
        //数据处理
        var arr = [];
        keyMap.map(function (k, j) {
            var temp = Object.assign({}, {
                v: k,
                position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + '1'
            })
            arr.push(temp)
        })
        json.data.map(function (v, i) {
            v.map(function (k, n) {
                var temp = Object.assign({}, {
                    v: k,
                    position: (v > 25 ? getCharCol(j) : String.fromCharCode(65 + n)) + (i + 2)
                })
                arr.push(temp)
            })
        });

        var tmpdata = [];//用来保存转换好的json
        arr.map(function (v, i) {
            tmpdata[v.position] = {
                v: v.v
            }
        });

        var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
        var tmpWB = {
            SheetNames: ['mySheet'], //保存的表标题
            Sheets: {
                'mySheet': Object.assign({},
                    tmpdata, //内容
                    {
                        '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                    })
            }
        };
        tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
            {bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
        ))], {
            type: ""
        });//创建二进制对象写入转换好的字节流
        var href = URL.createObjectURL(tmpDown); //创建对象超链接

        var link = document.createElement("a");
        link.href = href;
        link.style = "visibility:hidden";
        link.download = FileName + ".xlsx";

        document.body.appendChild(link);
        link.click();
        setTimeout(function () { //延时释放
            URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
            document.body.removeChild(link);
        }, 100);
    };

    function s2ab(s) { //字符串转字符流
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
    function getCharCol(n) {
        var temCol = '',
            s = '',
            m = 0
        while (n > 0) {
            m = n % 26 + 1
            s = String.fromCharCode(m + 64) + s
            n = (n - m) / 26
        }
        return s
    }