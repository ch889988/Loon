/*
 * 节点解锁查询
 * 感谢并修改自 https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/streaming-ui-check.js
 * 脚本功能：检查节点是否支持Dazn/Discovery/Param/Disney/Netflix/ChatGPT/YouTube解锁服务
 * 原作者：XIAO_KOP
 */
const NF_BASE_URL = "https://www.netflix.com/title/81280792";
const DISNEY_BASE_URL = 'https://www.disneyplus.com';
const DISNEY_LOCATION_BASE_URL = 'https://disney.api.edge.bamgrid.com/graph/v1/device/graphql';
const YTB_BASE_URL = "https://www.youtube.com/premium";
const Dazn_BASE_URL = "https://startup.core.indazn.com/misl/v5/Startup";
const Param_BASE_URL = "https://www.paramountplus.com/"

const Discovery_token_BASE_URL = "https://us1-prod-direct.discoveryplus.com/token?deviceId=d1a4a5d25212400d1e6985984604d740&realm=go&shortlived=true"
const Discovery_BASE_URL = "https://us1-prod-direct.discoveryplus.com/users/me"

const GPT_BASE_URL = 'https://chat.openai.com/'
const GPT_RegionL_URL = 'https://chat.openai.com/cdn-cgi/trace'

const Google_BASE_URL = 'https://www.google.com/maps/timeline'

var inputParams = $environment.params;
var nodeName = inputParams.node;

let flags = new Map([[ "AC" , "🇦🇨" ] ,["AE","🇦🇪"], [ "AF" , "🇦🇫" ] , [ "AI" , "🇦🇮" ] , [ "AL" , "🇦🇱" ] , [ "AM" , "🇦🇲" ] , [ "AQ" , "🇦🇶" ] , [ "AR" , "🇦🇷" ] , [ "AS" , "🇦🇸" ] , [ "AT" , "🇦🇹" ] , [ "AU" , "🇦🇺" ] , [ "AW" , "🇦🇼" ] , [ "AX" , "🇦🇽" ] , [ "AZ" , "🇦🇿" ] , ["BA", "🇧🇦"], [ "BB" , "🇧🇧" ] , [ "BD" , "🇧🇩" ] , [ "BE" , "🇧🇪" ] , [ "BF" , "🇧🇫" ] , [ "BG" , "🇧🇬" ] , [ "BH" , "🇧🇭" ] , [ "BI" , "🇧🇮" ] , [ "BJ" , "🇧🇯" ] , [ "BM" , "🇧🇲" ] , [ "BN" , "🇧🇳" ] , [ "BO" , "🇧🇴" ] , [ "BR" , "🇧🇷" ] , [ "BS" , "🇧🇸" ] , [ "BT" , "🇧🇹" ] , [ "BV" , "🇧🇻" ] , [ "BW" , "🇧🇼" ] , [ "BY" , "🇧🇾" ] , [ "BZ" , "🇧🇿" ] , [ "CA" , "🇨🇦" ] , [ "CF" , "🇨🇫" ] , [ "CH" , "🇨🇭" ] , [ "CK" , "🇨🇰" ] , [ "CL" , "🇨🇱" ] , [ "CM" , "🇨🇲" ] , [ "CN" , "🇨🇳" ] , [ "CO" , "🇨🇴" ] , [ "CP" , "🇨🇵" ] , [ "CR" , "🇨🇷" ] , [ "CU" , "🇨🇺" ] , [ "CV" , "🇨🇻" ] , [ "CW" , "🇨🇼" ] , [ "CX" , "🇨🇽" ] , [ "CY" , "🇨🇾" ] , [ "CZ" , "🇨🇿" ] , [ "DE" , "🇩🇪" ] , [ "DG" , "🇩🇬" ] , [ "DJ" , "🇩🇯" ] , [ "DK" , "🇩🇰" ] , [ "DM" , "🇩🇲" ] , [ "DO" , "🇩🇴" ] , [ "DZ" , "🇩🇿" ] , [ "EA" , "🇪🇦" ] , [ "EC" , "🇪🇨" ] , [ "EE" , "🇪🇪" ] , [ "EG" , "🇪🇬" ] , [ "EH" , "🇪🇭" ] , [ "ER" , "🇪🇷" ] , [ "ES" , "🇪🇸" ] , [ "ET" , "🇪🇹" ] , [ "EU" , "🇪🇺" ] , [ "FI" , "🇫🇮" ] , [ "FJ" , "🇫🇯" ] , [ "FK" , "🇫🇰" ] , [ "FM" , "🇫🇲" ] , [ "FO" , "🇫�" ] , [ "FR" , "🇫🇷" ] , [ "GA" , "🇬🇦" ] , [ "GB" , "🇬🇧" ] , [ "HK" , "🇭🇰" ] ,["HU","🇭🇺"], [ "ID" , "🇮🇩" ] , [ "IE" , "🇮🇪" ] , [ "IL" , "🇮🇱" ] , [ "IM" , "🇮🇲" ] , [ "IN" , "🇮🇳" ] , [ "IS" , "🇮🇸" ] , [ "IT" , "🇮🇹" ] , [ "JP" , "🇯🇵" ] , [ "KR" , "🇰🇷" ] , [ "LU" , "🇱🇺" ] , [ "MO" , "🇲🇴" ] , [ "MX" , "🇲🇽" ] , [ "MY" , "🇲🇾" ] , [ "NL" , "🇳🇱" ] , [ "PH" , "🇵🇭" ] , [ "RO" , "🇷🇴" ] , [ "RS" , "🇷🇸" ] , [ "RU" , "🇷🇺" ] , [ "RW" , "🇷🇼" ] , [ "SA" , "🇸🇦" ] , [ "SB" , "��🇧" ] , [ "SC" , "🇸🇨" ] , [ "SD" , "🇸🇩" ] , [ "SE" , "🇸🇪" ] , [ "SG" , "🇸🇬" ] , [ "TH" , "🇹🇭" ] , [ "TN" , "🇹🇳" ] , [ "TO" , "🇹🇴" ] , [ "TR" , "🇹🇷" ] , [ "TV" , "🇹🇻" ] , [ "TW" , "🇨🇳" ] , [ "UK" , "🇬🇧" ] , [ "UM" , "🇺🇲" ] , [ "US" , "🇺🇸" ] , [ "UY" , "🇺🇾" ] , [ "UZ" , "🇺🇿" ] , [ "VA" , "🇻🇦" ] , [ "VE" , "🇻🇪" ] , [ "VG" , "🇻🇬" ] , [ "VI" , "🇻🇮" ] , [ "VN" , "🇻🇳" ] , [ "ZA" , "🇿🇦"]])

let result = {
    "title": '  ChatGPT解锁查询',
    "ChatGPT": '<b>Netflix: </b>检测失败，请重试 ❗️',
}

let arrow = " ➟ "

Promise.all([gptTest()]).then(value => {
    let content = "------------------------------------</br>"+([result["ChatGPT"]]).join("</br></br>")
    content = content + "</br>------------------------------------</br>"+"<font color=#CD5C5C>"+"<b>节点</b> ➟ " + nodeName+ "</font>"
    content =`<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">` + content + `</p>`
    console.log(content);
    $done({"title":result["title"],"htmlMessage":content})
}).catch (values => {
    console.log("reject:" + values);
    let content = "------------------------------------</br>"+([result["ChatGPT"],result["YouTube"]]).join("</br></br>")
    content = content + "</br>------------------------------------</br>"+"<font color=#CD5C5C>"+"<b>节点</b> ➟ " + nodeName+ "</font>"
    content =`<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">` + content + `</p>`
    $done({"title":result["title"],"htmlMessage":content})
})


//chatgpt
support_countryCodes=["T1","XX","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BD","BB","BE","BZ","BJ","BT","BA","BW","BR","BG","BF","CV","CA","CL","CO","KM","CR","HR","CY","DK","DJ","DM","DO","EC","SV","EE","FJ","FI","FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU","IS","IN","ID","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI","KW","KG","LV","LB","LS","LR","LI","LT","LU","MG","MW","MY","MV","ML","MT","MH","MR","MU","MX","MC","MN","ME","MA","MZ","MM","NA","NR","NP","NL","NZ","NI","NE","NG","MK","NO","OM","PK","PW","PA","PG","PE","PH","PL","PT","QA","RO","RW","KN","LC","VC","WS","SM","ST","SN","RS","SC","SL","SG","SK","SI","SB","ZA","ES","LK","SR","SE","CH","TH","TG","TO","TT","TN","TR","TV","UG","AE","US","UY","VU","ZM","BO","BN","CG","CZ","VA","FM","MD","PS","KR","TW","TZ","TL","GB"]

function gptTest() {
    return new Promise((resolve, reject) => {
        let params = {
            url: GPT_BASE_URL,
            node: nodeName,
            timeout: 5000, //ms
        }
        $httpClient.get(params, (errormsg,response,data) => {
            console.log("----------GPT--------------");
            if (errormsg) {
                console.log("GPT request failed:!!! " + errormsg);
                result["ChatGPT"] = "<b>ChatGPT: </b>未支持 🚫"
                // resolve(errormsg);
                resolve("不支持 ChatGPT")
                return;
            } 
            let resp = JSON.stringify(data)
            console.log("ChatGPT Main Test")
            let jdg = resp.indexOf("text/plain")
            if (jdg == -1) {
                let p = {
                    url: GPT_RegionL_URL,
                    node: nodeName,
                    timeout: 5000, //ms
                }
                $httpClient.get(p, (emsg, resheader, resData) => {
                    console.log("----------GPT RegionL--------------");
                    if (emsg) {
                        console.log("GPT RegionL request error:" + errormsg);
                        result["ChatGPT"] = "<b>ChatGPT: </b>检测失败 ❗️";
                        resolve(emsg);
                        return;
                    }

                    console.log("ChatGPT Region Test")
                    let region = resData.split("loc=")[1].split("\n")[0]
                    console.log("ChatGPT Region: "+region)
                    let res = support_countryCodes.indexOf(region)
                    if (res != -1) {
                        result["ChatGPT"] = "<b>ChatGPT: </b>支持 "+arrow+ "⟦"+flags.get(region.toUpperCase())+"⟧ 🎉"
                        console.log("支持 ChatGPT")
                        resolve(region)
                    } else {
                        result["ChatGPT"] = "<b>ChatGPT: </b>未支持 🚫"
                        console.log("不支持 ChatGPT")
                        resolve("不支持 ChatGPT")
                    }
                })
            } else {
                result["ChatGPT"] = "<b>ChatGPT: </b>未支持 🚫"
                console.log("不支持 ChatGPT")
                resolve("不支持 ChatGPT")
            }
        })
    })
}

//google送中
function googleToCN() {
    return new Promise((resolve, reject) => {
        let params = {
            url: Google_BASE_URL,
            node: nodeName,
            timeout: 3000, //ms
            headers:{
                'Accept-Encoding' : `gzip, deflate, br`,
                'Connection' : `keep-alive`,
                'Accept' : `text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8`,
                'Host' : `www.google.com`,
                'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Mobile/15E148 Safari/604.1`,
                'Accept-Language' : `zh-CN,zh-Hans;q=0.9`
            }
        }

        $httpClient.get(params, (errormsg,response,data) => {
            console.log("----------Google2CN--------------");
            if (errormsg) {
                console.log("Google2CN request failed:" + errormsg);
                result["Google2CN"] = "<b>2CN: </b>检测失败 ❗️";
                resolve(errormsg);
                return;
            }
            if (response.status == 400) {
                result["Google2CN"] = "<b>2CN: </b>已被送中"
                resolve("404 Not Found");
            } else {
                result["Google2CN"] = "<b>2CN: </b>未被送中"
                resolve(response.status);
            }
        })
    })
}
