(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var auth=require("./controller/auth"),post=require("./controller/post"),file=require("./controller/file"),user=require("./controller/user"),comment=require("./controller/comment"),hex=require("./hex"),api=require("./api"),menu=require("./menu"),message=require("./message");ko.subscribable.fn.trimmed=function(){return ko.computed({read:function(){return this().trim()},write:function(e){this(e.trim()),this.valueHasMutated()},owner:this})},route(/^posts/,function(){menu.active("posts"),post.list("post").catch(message.error)}),route(/^pages/,function(){menu.active("pages"),post.list("page").catch(message.error)}),route(/^blocks/,function(){menu.active("blocks"),post.list("block").catch(message.error)}),route(/^post\/([^\/]+)/,function(e){menu.active("posts"),post.edit(e).catch(message.error)}),route(/^page\/([^\/]+)/,function(e){menu.active("pages"),post.edit(e).catch(message.error)}),route(/^block\/([^\/]+)/,function(e){menu.active("blocks"),post.edit(e).catch(message.error)}),route(/^new\/([^\/]+)/,function(e){menu.active(e+"s"),post.create(e).catch(message.error)}),route(/^files/,function(){menu.active("files"),route.go("directory/"+hex.hex("/"))}),route(/^directory\/([^\/]+)/,function(e){menu.active("files"),file.directory(hex.string(e)).catch(message.error)}),route(/^file\/([^\/]+)/,function(e){menu.active("files"),file.file(hex.string(e)).catch(message.error)}),route(/^comments\/([^\/]+)/,function(e){menu.active("posts"),comment.list(e).catch(message.error)}),route(/^users/,function(){menu.active("users"),user.list().catch(message.error)}),route(/^user\/new/,function(){menu.active("users"),user.create().catch(message.error)}),route(/^user\/([^\/]+)/,function(e){menu.active("users"),user.edit(e).catch(message.error)}),route(/^login/,function(){menu.active(),auth.form().catch(message.error)}),route(/^logout/,function(){menu.active(),auth.logout()}),route(/.*/,function(){route.go(api.hasKey()?"posts":"login")});
},{"./api":2,"./controller/auth":3,"./controller/comment":4,"./controller/file":5,"./controller/post":6,"./controller/user":7,"./hex":8,"./menu":10,"./message":11}],2:[function(require,module,exports){
var xhr=require("./xhr");exports.login=function(e,r){var n={method:"POST",url:"/api/auth",data:JSON.stringify({username:e,password:r}),headers:{"Content-Type":"application/json"}};return xhr(n).then(function(e){return JSON.parse(e)})},exports.posts=function(e){var r={url:"/api/entries/"+e,headers:{"X-Key":apiKey()}};return xhr(r).then(function(e){return JSON.parse(e).data})},exports.post=function(e){var r={url:"/api/entry/"+encodeURIComponent(e),headers:{"X-Key":apiKey()}};return xhr(r).then(function(e){return JSON.parse(e).data})},exports.entryInfo=function(e){var r={url:"/api/entry/"+encodeURIComponent(e)+"/info",headers:{"X-Key":apiKey()}};return xhr(r).then(function(e){return JSON.parse(e).data})},exports.comments=function(e){var r={url:"/api/post/"+encodeURIComponent(e)+"/comments",headers:{"X-Key":apiKey()}};return xhr(r).then(function(e){return JSON.parse(e).data})},exports.removeComment=function(e){var r={method:"DELETE",url:"/api/comment/"+encodeURIComponent(e),headers:{"X-Key":apiKey()}};return xhr(r).then(function(e){return JSON.parse(e)})},exports.updatePost=function(e,r){var n={method:"PUT",url:"/api/entry/"+e,data:JSON.stringify(r),headers:{"X-Key":apiKey(),"Content-Type":"application/json"}};return xhr(n).then(function(e){return JSON.parse(e)})},exports.savePost=function(e){var r={method:"POST",url:"/api/entry",data:JSON.stringify(e),headers:{"X-Key":apiKey(),"Content-Type":"application/json"}};return xhr(r).then(function(e){return JSON.parse(e)})},exports.removePost=function(e){var r={method:"DELETE",url:"/api/entry/"+encodeURIComponent(e),headers:{"X-Key":apiKey()}};return xhr(r).then(function(e){return JSON.parse(e)})},exports.directory=function(e){var r={url:"/api/directory/"+encodeURIComponent(window.btoa(e)),headers:{"X-Key":apiKey()}};return xhr(r).then(function(e){return JSON.parse(e).data})},exports.createDirectory=function(e,r){var n={method:"POST",url:"/api/directory/"+encodeURIComponent(window.btoa(e))+"/"+encodeURIComponent(r),headers:{"X-Key":apiKey()}};return xhr(n).then(function(e){return JSON.parse(e)})},exports.removeDirectory=function(e){var r={method:"DELETE",url:"/api/directory/"+encodeURIComponent(window.btoa(e)),headers:{"X-Key":apiKey()}};return xhr(r).then(function(e){return JSON.parse(e)})},exports.file=function(e){var r={url:"/api/file/"+encodeURIComponent(window.btoa(e)),headers:{"X-Key":apiKey()}};return xhr(r).then(function(e){return JSON.parse(e)})},exports.removeFile=function(e){var r={method:"DELETE",url:"/api/file/"+encodeURIComponent(window.btoa(e)),headers:{"X-Key":apiKey()}};return xhr(r).then(function(e){return JSON.parse(e)})},exports.users=function(){var e={url:"/api/users",headers:{"X-Key":apiKey()}};return xhr(e).then(function(e){return JSON.parse(e).data})},exports.user=function(e){var r={url:"/api/user/"+encodeURIComponent(e),headers:{"X-Key":apiKey()}};return xhr(r).then(function(e){return JSON.parse(e).data})},exports.updateUser=function(e,r){var n={method:"PUT",data:JSON.stringify(r),url:"/api/user/"+encodeURIComponent(e),headers:{"X-Key":apiKey(),"Content-Type":"application/json"}};return xhr(n).then(function(e){return JSON.parse(e)})},exports.saveUser=function(e){var r={method:"POST",data:JSON.stringify(e),url:"/api/user",headers:{"X-Key":apiKey(),"Content-Type":"application/json"}};return xhr(r).then(function(e){return JSON.parse(e)})},exports.removeUser=function(e){var r={method:"DELETE",url:"/api/user/"+encodeURIComponent(e),headers:{"X-Key":apiKey()}};return xhr(r).then(function(e){return JSON.parse(e)})},exports.hasKey=function(){return!!sessionStorage.getItem("api-key")};var apiKey=exports.apiKey=function(){var e=sessionStorage.getItem("api-key");if(!e)throw new Error("API key is not set");return e};
},{"./xhr":17}],3:[function(require,module,exports){
var view=require("../view"),api=require("../api"),message=require("../message"),validate=require("../validate");exports.form=function(){var e={username:ko.observable(""),password:ko.observable(""),login:function(r){validate.clear(r);var s=e.username(),a=e.password();return""===s&&validate.error("username","Username is not entered."),""===a&&validate.error("password","Password is not entered."),validate.hasError(r)?!1:void api.login(s,a).then(function(e){"success"===e.status?(sessionStorage.setItem("api-key",e.data.key),sessionStorage.setItem("user-id",e.data.id),sessionStorage.setItem("user-type",e.data.type),route.go("posts")):validate.formError(r,e.message)},message.error)}};return view.show("login",e)},exports.logout=function(){sessionStorage.removeItem("api-key"),sessionStorage.removeItem("user-id"),sessionStorage.removeItem("user-type"),route.go("login")};
},{"../api":2,"../message":11,"../validate":13,"../view":14}],4:[function(require,module,exports){
var message=require("../message"),view=require("../view"),api=require("../api");exports.list=function(e){return api.entryInfo(e).then(function(n){return api.comments(e).then(function(e){e.forEach(function(e){e.expanded=ko.observable(!1),e.expand=function(){e.expanded(e.expanded()?!1:!0)},e.remove=function(){confirm("Remove the comment?")&&api.removeComment(e.$id).then(function(e){"success"===e.status?route.refresh():message.error(e.message)},message.error)}});var r={title:n.title,comments:e};return view.show("comments",r)})})};
},{"../api":2,"../message":11,"../view":14}],5:[function(require,module,exports){
function compareEntry(e,r){function o(){return e.name<r.name?-1:1}return e.directory?r.directory?o():-1:r.directory?1:o()}var view=require("../view"),api=require("../api"),hex=require("../hex"),message=require("../message");exports.directory=function(e){return api.directory(e).then(function(r){r.sort(compareEntry),r.forEach(function(r){r.encoded=hex.hex(("/"===e?"":e)+"/"+r.name)});var o="/";if("/"!==e){var t=e.split(/\//);o=hex.hex("/"+t.slice(1,t.length-1).join("/"))}var n={directory:e,entries:r,subdirectory:ko.observable("").trimmed(),subdirectory_form:ko.observable(!1),upload_form:ko.observable(!1),parent:o,progress:ko.observable(0),addSubdirectory:function(){api.createDirectory(e,n.subdirectory()).then(function(e){"success"===e.status&&route.refresh()})},showSubdirectoryForm:function(){n.subdirectory_form(!0),n.upload_form(!1)},cancelDirectoryForm:function(){n.subdirectory_form(!1)},removeDirectory:function(){confirm("Remove current directory?")&&api.removeDirectory(e).then(function(e){"success"===e.status&&(message.info("Directory successfully removed."),route.go("directory/"+o))})},upload:function(){var r=document.getElementById("directory-file").files[0];if(r){var o=new FileReader;o.onload=function(){var t=new XMLHttpRequest;t.upload.addEventListener("progress",n.uploadProgress,!1),t.addEventListener("load",n.uploadComplete,!1),t.addEventListener("error",n.uploadFailed,!1),t.addEventListener("abort",n.uploadCanceled,!1),t.open("POST","/api/upload/"+encodeURIComponent(window.btoa(e))),t.setRequestHeader("X-Key",api.apiKey()),t.setRequestHeader("X-File-Name",r.name),t.setRequestHeader("Content-Type","application/octet-stream"),t.send(new Uint8Array(o.result))},o.readAsArrayBuffer(r)}},uploadProgress:function(e){e.lengthComputable&&n.progress(Math.round(100*e.loaded/e.total))},uploadComplete:function(){route.refresh(),message.info("File uploaded.")},uploadFailed:function(){},uploadCanceled:function(){n.upload_form(!1)},showUploadForm:function(){n.upload_form(!0),n.subdirectory_form(!1)},cancelUploadForm:function(){n.upload_form(!1)}};return view.show("directory",n)})},exports.file=function(e){return api.file(e).then(function(r){var o=e.split(/\//),t=hex.hex("/"+o.slice(1,o.length-1).join("/")),n={file:e,parent:t,size:r.data.size,date:r.data.modified,remove:function(){confirm("Remove file "+e+"?")&&api.removeFile(e).then(function(e){"success"===e.status&&(message.info("File removed."),route.go("directory/"+t))})}};return view.show("file",n)})};
},{"../api":2,"../hex":8,"../message":11,"../view":14}],6:[function(require,module,exports){
var view=require("../view"),api=require("../api"),message=require("../message"),postVm=require("../vm/post_vm");exports.list=function(e){var t=sessionStorage.getItem("user-type"),s=sessionStorage.getItem("user-id");return api.posts(e).then(function(o){o.sort(function(e,t){return t.date_updated-e.date_updated}),o.forEach(function(e){e.expanded=ko.observable(!1),e.expand=function(){e.expanded(e.expanded()?!1:!0)},e.editable="admin"===t||s===e.author,e.remove=function(){confirm("Remove the post?")&&api.removePost(e.$id).then(function(e){"success"===e.status?(message.info("The post was removed."),route.refresh()):message.error(e.message)},message.error).done()}});var r=0,n={type:e,posts:ko.observableArray([]),hasMore:ko.observable(r+5<o.length),more:function(){r+=5;for(var e=Math.min(r+5,o.length),t=r;e>t;t++)n.posts.push(o[t]);n.hasMore(r+5<o.length)}};n.posts(o.slice(0,5)),view.show("posts",n)})},exports.edit=function(e){return api.users().then(function(t){return api.post(e).then(function(e){return view.show("post",postVm.create(t,e)).then(function(){var e=document.getElementById("post-content");e.style.height=e.scrollHeight+10+"px"})})})},exports.create=function(e){return api.users().then(function(t){var s=postVm.create(t);return s.type(e),view.show("post",s)})};
},{"../api":2,"../message":11,"../view":14,"../vm/post_vm":15}],7:[function(require,module,exports){
var api=require("../api"),view=require("../view"),message=require("../message"),userVm=require("../vm/user_vm");exports.list=function(){var e=sessionStorage.getItem("user-type"),r=sessionStorage.getItem("user-id");return api.users().then(function(s){s.forEach(function(s){s.expanded=ko.observable(!1),s.expand=function(){s.expanded(s.expanded()?!1:!0)},s.remove=function(){confirm("Remove the user?")&&api.removeUser(s.$id).then(function(e){"success"===e.status?(message.info("The user was removed."),route.refresh()):message.error(e.message)},message.error).done()},s.editable="admin"===e||s.$id===r});var t={users:s,mytype:e};return view.show("users",t)},message.error)},exports.edit=function(e){return api.user(e).then(function(e){return view.show("user",userVm.create(e))},message.error)},exports.create=function(){return view.show("user",userVm.create())};
},{"../api":2,"../message":11,"../view":14,"../vm/user_vm":16}],8:[function(require,module,exports){
exports.hex=function(r){for(var t="",n=0;n<r.length;n++)t+=r.charCodeAt(n).toString(16);return t},exports.string=function(r){"string"!=typeof r&&(r=r.toString());for(var t="",n=0;n<r.length;n+=2)t+=String.fromCharCode(parseInt(r.substr(n,2),16));return t};
},{}],9:[function(require,module,exports){
module.exports=[{code:"ab",name:"Abkhaz"},{code:"aa",name:"Afar"},{code:"af",name:"Afrikaans"},{code:"ak",name:"Akan"},{code:"sq",name:"Albanian"},{code:"am",name:"Amharic"},{code:"ar",name:"Arabic"},{code:"an",name:"Aragonese"},{code:"hy",name:"Armenian"},{code:"as",name:"Assamese"},{code:"av",name:"Avaric"},{code:"ae",name:"Avestan"},{code:"ay",name:"Aymara"},{code:"az",name:"Azerbaijani"},{code:"bm",name:"Bambara"},{code:"ba",name:"Bashkir"},{code:"eu",name:"Basque"},{code:"be",name:"Belarusian"},{code:"bn",name:"Bengali"},{code:"bh",name:"Bihari"},{code:"bi",name:"Bislama"},{code:"bs",name:"Bosnian"},{code:"br",name:"Breton"},{code:"bg",name:"Bulgarian"},{code:"my",name:"Burmese"},{code:"ca",name:"Catalan; Valencian"},{code:"ch",name:"Chamorro"},{code:"ce",name:"Chechen"},{code:"ny",name:"Chichewa; Chewa; Nyanja"},{code:"zh",name:"Chinese"},{code:"cv",name:"Chuvash"},{code:"kw",name:"Cornish"},{code:"co",name:"Corsican"},{code:"cr",name:"Cree"},{code:"hr",name:"Croatian"},{code:"cs",name:"Czech"},{code:"da",name:"Danish"},{code:"dv",name:"Divehi; Dhivehi; Maldivian;"},{code:"nl",name:"Dutch"},{code:"en",name:"English"},{code:"eo",name:"Esperanto"},{code:"et",name:"Estonian"},{code:"ee",name:"Ewe"},{code:"fo",name:"Faroese"},{code:"fj",name:"Fijian"},{code:"fi",name:"Finnish"},{code:"fr",name:"French"},{code:"ff",name:"Fula; Fulah; Pulaar; Pular"},{code:"gl",name:"Galician"},{code:"ka",name:"Georgian"},{code:"de",name:"German"},{code:"el",name:"Greek, Modern"},{code:"gn",name:"Guaraní"},{code:"gu",name:"Gujarati"},{code:"ht",name:"Haitian; Haitian Creole"},{code:"ha",name:"Hausa"},{code:"he",name:"Hebrew (modern)"},{code:"hz",name:"Herero"},{code:"hi",name:"Hindi"},{code:"ho",name:"Hiri Motu"},{code:"hu",name:"Hungarian"},{code:"is",name:"Icelandic"},{code:"io",name:"Ido"},{code:"ig",name:"Igbo"},{code:"id",name:"Indonesian"},{code:"ia",name:"Interlingua"},{code:"ie",name:"Interlingue"},{code:"iu",name:"Inuktitut"},{code:"ik",name:"Inupiaq"},{code:"ga",name:"Irish"},{code:"it",name:"Italian"},{code:"ja",name:"Japanese"},{code:"jv",name:"Javanese"},{code:"kl",name:"Kalaallisut, Greenlandic"},{code:"kn",name:"Kannada"},{code:"kr",name:"Kanuri"},{code:"ks",name:"Kashmiri"},{code:"kk",name:"Kazakh"},{code:"km",name:"Khmer"},{code:"ki",name:"Kikuyu, Gikuyu"},{code:"rw",name:"Kinyarwanda"},{code:"ky",name:"Kirghiz, Kyrgyz"},{code:"rn",name:"Kirundi"},{code:"kv",name:"Komi"},{code:"kg",name:"Kongo"},{code:"ko",name:"Korean"},{code:"ku",name:"Kurdish"},{code:"kj",name:"Kwanyama, Kuanyama"},{code:"lo",name:"Lao"},{code:"la",name:"Latin"},{code:"lv",name:"Latvian"},{code:"li",name:"Limburgish, Limburgan, Limburger"},{code:"ln",name:"Lingala"},{code:"lt",name:"Lithuanian"},{code:"lu",name:"Luba-Katanga"},{code:"lg",name:"Luganda"},{code:"lb",name:"Luxembourgish, Letzeburgesch"},{code:"mk",name:"Macedonian"},{code:"mg",name:"Malagasy"},{code:"ms",name:"Malay"},{code:"ml",name:"Malayalam"},{code:"mt",name:"Maltese"},{code:"gv",name:"Manx"},{code:"mr",name:"Marathi (Marāṭhī)"},{code:"mh",name:"Marshallese"},{code:"mn",name:"Mongolian"},{code:"mi",name:"Māori"},{code:"na",name:"Nauru"},{code:"nv",name:"Navajo, Navaho"},{code:"ng",name:"Ndonga"},{code:"ne",name:"Nepali"},{code:"nd",name:"North Ndebele"},{code:"se",name:"Northern Sami"},{code:"no",name:"Norwegian"},{code:"nb",name:"Norwegian Bokmål"},{code:"nn",name:"Norwegian Nynorsk"},{code:"ii",name:"Nuosu"},{code:"oc",name:"Occitan"},{code:"oj",name:"Ojibwe, Ojibwa"},{code:"cu",name:"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic"},{code:"or",name:"Oriya"},{code:"om",name:"Oromo"},{code:"os",name:"Ossetian, Ossetic"},{code:"pa",name:"Panjabi, Punjabi"},{code:"ps",name:"Pashto, Pushto"},{code:"fa",name:"Persian"},{code:"pl",name:"Polish"},{code:"pt",name:"Portuguese"},{code:"pi",name:"Pāli"},{code:"qu",name:"Quechua"},{code:"ro",name:"Romanian, Moldavian, Moldovan"},{code:"rm",name:"Romansh"},{code:"ru",name:"Russian"},{code:"sm",name:"Samoan"},{code:"sg",name:"Sango"},{code:"sa",name:"Sanskrit (Saṁskṛta)"},{code:"sc",name:"Sardinian"},{code:"gd",name:"Scottish Gaelic; Gaelic"},{code:"sr",name:"Serbian"},{code:"sn",name:"Shona"},{code:"sd",name:"Sindhi"},{code:"si",name:"Sinhala, Sinhalese"},{code:"sk",name:"Slovak"},{code:"sl",name:"Slovene"},{code:"so",name:"Somali"},{code:"nr",name:"South Ndebele"},{code:"st",name:"Southern Sotho"},{code:"es",name:"Spanish; Castilian"},{code:"su",name:"Sundanese"},{code:"sw",name:"Swahili"},{code:"ss",name:"Swati"},{code:"sv",name:"Swedish"},{code:"tl",name:"Tagalog"},{code:"ty",name:"Tahitian"},{code:"tg",name:"Tajik"},{code:"ta",name:"Tamil"},{code:"tt",name:"Tatar"},{code:"te",name:"Telugu"},{code:"th",name:"Thai"},{code:"bo",name:"Tibetan Standard, Tibetan, Central"},{code:"ti",name:"Tigrinya"},{code:"to",name:"Tonga (Tonga Islands)"},{code:"ts",name:"Tsonga"},{code:"tn",name:"Tswana"},{code:"tr",name:"Turkish"},{code:"tk",name:"Turkmen"},{code:"tw",name:"Twi"},{code:"ug",name:"Uighur, Uyghur"},{code:"uk",name:"Ukrainian"},{code:"ur",name:"Urdu"},{code:"uz",name:"Uzbek"},{code:"ve",name:"Venda"},{code:"vi",name:"Vietnamese"},{code:"vo",name:"Volapük"},{code:"wa",name:"Walloon"},{code:"cy",name:"Welsh"},{code:"fy",name:"Western Frisian"},{code:"wo",name:"Wolof"},{code:"xh",name:"Xhosa"},{code:"yi",name:"Yiddish"},{code:"yo",name:"Yoruba"},{code:"za",name:"Zhuang, Chuang"}];
},{}],10:[function(require,module,exports){
var model={visible:ko.observable(!1),active:ko.observable()};exports.active=function(e){e?(model.active(e),model.visible(!0)):(model.active(),model.visible(!1))};var menu=document.getElementById("menu");ko.applyBindings(model,menu);
},{}],11:[function(require,module,exports){
exports.info=function(e){var n=document.getElementById("messages"),t=document.createElement("div");t.className="alert alert-success message",t.innerHTML=e,n.appendChild(t),setTimeout(function(){n.removeChild(t)},2e3)},exports.error=function(e){var n=document.createElement("button");n.className="close",n.innerHTML="&times;";var t=document.createElement("span");t.innerHTML=e.toString();var a=document.getElementById("messages"),s=document.createElement("div");s.className="alert alert-danger message",s.appendChild(n),s.appendChild(t),n.addEventListener("click",function(){a.removeChild(s)},!1),a.appendChild(s)};
},{}],12:[function(require,module,exports){
exports.show=function(){document.getElementById("spinner").style.display="block"},exports.hide=function(){document.getElementById("spinner").style.display="none"};
},{}],13:[function(require,module,exports){
exports.clear=function(e){var r,t,o=e.querySelectorAll(".error-message");for(t=0;t<o.length;t++)r=o.item(t),r.parentNode.classList.remove("has-error"),r.parentNode.removeChild(r);for(o=e.parentNode.querySelectorAll(".alert-danger"),t=0;t<o.length;t++)r=o.item(t),r.parentNode.removeChild(r)},exports.hasError=function(e){return e.querySelectorAll(".error-message").length>0},exports.error=function(e,r){var t=document.getElementById(e),o=document.createElement("div");o.className="error-message",o.innerHTML=r,t.parentNode.appendChild(o),t.parentNode.classList.add("has-error")},exports.formError=function(e,r){var t=document.createElement("div");t.className="alert alert-danger",t.innerHTML=r,e.parentNode.insertBefore(t,e)};
},{}],14:[function(require,module,exports){
var xhr=require("./xhr"),content=document.getElementById("content");exports.show=function(n,e){return console.log("Loading template "+n),xhr({url:"/admin/tpl/"+n+".html"}).then(function(n){1===content.children.length&&ko.removeNode(content.children[0]);var t=document.createElement("div");t.innerHTML=n,content.appendChild(t),ko.applyBindings(e,t)})},window.formatDate=function(n){return new Date(1e3*n).toISOString().substring(0,10)};
},{"./xhr":17}],15:[function(require,module,exports){
function findAuthor(e,t){for(var a,o=0;o<e.length;o++)if(e[o].$id===t){a=e[o];break}if(!a)throw new Error("No author "+data.author);return a}function isoDateToUnix(e){var t=e.match(/^(\d{4})\-(\d{2})\-(\d{2})$/);if(!t)throw new Error("Date does not match pattern: "+e);var a=new Date;return a.setUTCHours(0,0,0,0),a.setUTCFullYear(parseInt(t[1],10),parseInt(t[2],10)-1,parseInt(t[3],10)),Math.floor(a.getTime()/1e3)}function validatePost(e){""===e.title()&&validate.error("post-title","Title is not entered.");var t=e.slug();""===t?validate.error("post-slug","Slug is not entered."):t.match(/^[a-z0-9\-_]+$/)||validate.error("post-slug","Use lowercase letters, numbers, hyphen and underscore."),""===e.content()&&validate.error("post-content","Content is not entered.");var a=e.date();""===a?e.published()&&validate.error("post-date","Publish date is not entered."):a.match(/^\d{4}\-\d{2}\-\d{2}$/)||validate.error("post-date","Date must be in the YYYY-MM-DD format.");var o=e.update();""===o?validate.error("post-update","Update date is not entered."):o.match(/^\d{4}\-\d{2}\-\d{2}$/)||validate.error("post-update","Update date must be in the YYYY-MM-DD format.")}function submitPost(e,t){var a=document.getElementById("post-form");return validate.clear(a),validatePost(e),validate.hasError(a)?!1:void(e.$id?updatePost(a,e,t):savePost(a,e,t))}function updatePost(e,t,a){api.updatePost(t.$id,t.toJS()).then(function(o){"success"===o.status?(message.info("Post updated."),a||route.go(t.type()+"s")):(validate.formError(e,o.message),window.scroll(0,0))},message.error).done()}function savePost(e,t,a){api.savePost(t.toJS()).then(function(o){"success"===o.status?(message.info("Post saved."),route.go(a?t.type()+"/"+o.data:t.type()+"s")):(validate.formError(e,o.message),window.scroll(0,0))},message.error).done()}var api=require("../api"),message=require("../message"),validate=require("../validate"),languages=require("../languages");exports.create=function(e,t){var a=sessionStorage.getItem("user-id"),o=sessionStorage.getItem("user-type"),r=findAuthor(e,a),s={authors:e,title:ko.observable("Untitled").trimmed(),slug:ko.observable("untitled").trimmed(),description:ko.observable("").trimmed(),content:ko.observable("").trimmed(),type:ko.observable("post"),content_type:ko.observable("markdown"),published:ko.observable(!1),commenting:ko.observable(!0),tags:ko.observable("").trimmed(),comments:ko.observable(0),author:ko.observable(r),author_selectable:"admin"===o,date:ko.observable("").trimmed(),update:ko.observable("").trimmed(),submit:function(){submitPost(s,!0)},save:function(){submitPost(s,!1)},language:ko.observable(),languages:languages,toJS:function(){var e,t=s.tags().trim(),a=s.date();""!==a&&(e=isoDateToUnix(a));var o=isoDateToUnix(s.update());return{author:s.author().$id,title:s.title(),slug:s.slug(),description:s.description(),content:s.content(),type:s.type(),date_published:e,date_updated:o,commenting:s.commenting(),published:s.published(),content_type:s.content_type(),tags:""===t?[]:t.split(/\, */),language:s.language()}}};if(t){if(r=findAuthor(e,t.author),"undefined"!=typeof t.date_published){var n=new Date(1e3*t.date_published);s.date(n.toISOString().substring(0,10))}s.$id=t.$id,s.author(r),s.title(t.title),s.slug(t.slug),s.description(t.description||""),s.content(t.content),s.type(t.type),s.content_type(t.content_type),s.published(t.published),s.commenting(t.commenting),s.tags(t.tags.join(", ")),s.comments(t.comments),s.language(t.language)}else s.title.subscribe(function(e){s.slug(speakingurl(e))});return s.update((new Date).toISOString().substring(0,10)),s.published.subscribe(function(e){e&&""===s.date()&&s.date((new Date).toISOString().substring(0,10))}),s};
},{"../api":2,"../languages":9,"../message":11,"../validate":13}],16:[function(require,module,exports){
var message=require("../message"),api=require("../api"),validate=require("../validate");exports.create=function(e){var r=sessionStorage.getItem("user-type"),s={username:ko.observable("").trimmed(),fullname:ko.observable("").trimmed(),type:ko.observable("author"),link:ko.observable("").trimmed(),password:ko.observable("").trimmed(),password_edit:ko.observable(!0),password_text:ko.observable(!1),error:ko.observable(""),creating:!0,files:ko.observable(!1),mytype:r,save:function(e){if(validate.clear(e),s.password_edit()){var r=s.password();""===r?validate.error("user-password","Password is not set."):r.length<6&&validate.error("user-password","Password length must be at least 6.")}var a=s.username();""===a?validate.error("user-username","Username is not set."):a.match(/^[a-zA-Z0-9]+$/)||validate.error("user-username","Use letters and numbers only.");var t=s.fullname();""===t&&validate.error("user-fullname","Full name is not set.");var o=s.link();return""!==o&&(o.match(/https?:\/\//)||validate.error("user-link","Link must start with http:// or https:// prefix.")),validate.hasError(e)?!1:(s.$id?api.updateUser(s.$id,s.toJS()).then(function(r){"success"===r.status?route.go("users"):validate.formError(e,r.message)},message.error):api.saveUser(s.toJS()).then(function(r){"success"===r.status?route.go("users"):validate.formError(e,r.message)},message.error),!1)},toJS:function(){var e={username:s.username(),fullname:s.fullname(),type:s.type(),link:s.link(),files:s.files()};return s.password_edit()&&(e.password=s.password()),e}};return s.password_text.subscribe(function(e){document.getElementById("user-password").type=e?"text":"password"}),e&&(s.$id=e.$id,s.creating=!1,s.username(e.username),s.fullname(e.fullname),s.type(e.type),s.link(e.link),s.password_edit(!1),s.files(e.files)),s};
},{"../api":2,"../message":11,"../validate":13}],17:[function(require,module,exports){
var spin=require("./spin"),count=0;module.exports=function(e){return new Promise(function(t,n){var s=new XMLHttpRequest;s.open(e.method||"GET",e.url,!0),Object.keys(e.headers||{}).forEach(function(t){s.setRequestHeader(t,e.headers[t])}),s.onreadystatechange=function(){4===s.readyState&&(count-=1,0===count&&spin.hide(),200!==s.status?n(new Error("Server responded with a status of "+s.status)):t(s.responseText))},0===count&&spin.show(),count+=1,s.send(e.data)})};
},{"./spin":12}]},{},[1])


//# sourceMappingURL=admin.bundle.js.map