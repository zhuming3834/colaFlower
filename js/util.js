var Util = {
//	baseUrl: 'http://112.74.29.75:8900',
//	baseUrl: 'http://120.76.30.228:8088',
	baseUrl: 'http://120.79.29.194:7080',
	basekey: 'dukeAPP',
	// base32  加密
	base32Encode: function(srcString){
		var          i        = 0;  
        var          index    = 0;  
        var          digit    = 0;  
        var          currByte;  
        var          nextByte;  
        var retrunString = '';  
        var BASE32CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
          
        for (var i=0; i< srcString.length;) {
            //var          index    = 0;  
            currByte = (srcString.charCodeAt(i) >= 0) ? srcString.charCodeAt(i)  
                                       : (srcString.charCodeAt(i) + 256);   
  
            if (index > 3) {  
                if ((i + 1) < srcString.length) {  
                       nextByte = (srcString.charCodeAt(i + 1) >= 0)   
                                                 ? srcString.charCodeAt(i + 1)  
                                                  : (srcString.charCodeAt(i + 1) + 256);  
                } else {  
                    nextByte = 0;  
                }  
  
                digit     = currByte & (0xFF >> index);  
                index     = (index + 5) % 8;  
                digit <<= index;  
                digit |= (nextByte >> (8 - index));  
                i++;  
            } else {  
                digit     = (currByte >> (8 - (index + 5))) & 0x1F;  
                index     = (index + 5) % 8;  
  
                if (index == 0) {  
                    i++;  
                }  
            }  
  
            retrunString = retrunString + BASE32CHAR.charAt(digit);  
        }  
		return retrunString.toLowerCase();  
	},
	// base32  解密
	base32Decode: function(encodeString){
		var    i;  
        var    index;  
        var    lookup;  
        var    offset;  
        var    digit;  
        var encodeString = encodeString.toUpperCase();  
        var stringLen = parseInt((encodeString.length * 5) / 8);  
        var bytes = new Array(stringLen);  
        for ( var a=0;a<stringLen;a++){  
            bytes[a]=0;  
        }  
  
        for (i = 0, index = 0, offset = 0; i < encodeString.length; i++) {  
            var charCode0 = '0'.charCodeAt(0);  
            lookup = encodeString.charCodeAt(i) - charCode0;  
  
            if ((lookup < 0) || (lookup >= BASE32LOOOKUP.length)) {  
                continue;  
            }  
  
            digit = BASE32LOOOKUP[lookup];  
  
            if (digit == 0xFF) {  
                continue;  
            }  
  
            if (index <= 3) {  
                index = (index + 5) % 8;  
  
                if (index == 0) {  
                    bytes[offset] = bytes[offset] | digit;  
                      
                    offset++;  
  
                    if (offset >= bytes.length) {  
                        break;  
                    }  
                } else {  
                    bytes[offset] = bytes[offset] | (digit << (8 - index));  
                      
                }  
            } else {  
                index = (index + 5) % 8;  
                bytes[offset] = bytes[offset] | (digit >>> index);  
                  
                offset++;  
  
                if (offset >= bytes.length) {  
                    break;  
                }  
  
                bytes[offset] = bytes[offset] | (digit << (8 - index));  
                if(bytes[offset]>=256){  
                  
                    //var lp = parseInt(bytes[offset]/256);  
                    
                    bytes[offset] %= 256;   
                }  
            }  
        }  
  
        //return bytes.join(',');  
        var realkeyString = '';  
        var decodeString = '';  
        for ( var a=0;a<bytes.length;a++){  
                                          
            var realkey  = String.fromCharCode(bytes[a]);    
            realkeyString += realkey;  
            //decodeString += bytes[a];  
              
        }  
        return realkeyString;  
	},
	// 校验手机号
	checkPhone: function(phone){ 
	// 表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束
	    if(!(/^1[34578]\d{9}$/.test(phone))){ 
	    		// 手机号有误
	        return false; 
	    }else{
	    		return true; 
	    }
	},
	// 贷款详情 使用
	getUrlKey: function(){
		var urlStr = window.location.href;
		var keys = urlStr.split('?')[1].split('=')[1];
		return keys;
	},
	// 获取url里面的code
	getQueryString: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
		return unescape(r[2]);
		return '';
	}
}
