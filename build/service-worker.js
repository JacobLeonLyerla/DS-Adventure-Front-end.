"use strict";var precacheConfig=[["/index.html","4959c46a9bdfa408397c193abed4c3d9"],["/static/css/main.8d551e9b.css","c624ba47051a72ce8fe0a70e3fa968d9"],["/static/js/main.c9620da1.js","4e790cb468b937bd028b3731c752473f"],["/static/media/3_game_background.98c8f9c8.gif","98c8f9c817b4817743de3816f1a0b7a6"],["/static/media/asassinbattle.c2817362.gif","c2817362fbcf37146eed5489df855ba8"],["/static/media/asassinidle.41773c76.gif","41773c76604b50681ffbb53209652204"],["/static/media/bridgegobbattle.53c496ab.gif","53c496ab561377e0fce96d324d81c2fb"],["/static/media/bridgegobidle.941d6752.gif","941d6752f5eb2d993623b832be61d46d"],["/static/media/dalinarbattle.eb826814.gif","eb8268147beac2a2a85d5ecde9d0e7f9"],["/static/media/dalinaridle.5f82a10c.gif","5f82a10c8ca1b100cfb3f8f342f5de8a"],["/static/media/deathminionbattle.c43dd40e.gif","c43dd40eafe866b9f63ae73cd18b7fa3"],["/static/media/deathminionidle.04569918.gif","0456991829bb43ac4a31f34f32a06a6d"],["/static/media/elfarcherbattle.05232e70.gif","05232e708de33fe25b4db65cc9ca51a8"],["/static/media/elfarcheridle.d26b66ec.gif","d26b66ece7e982e35e2f28902f485e86"],["/static/media/elfknightbattle.269a19d0.gif","269a19d0fae5cbcb0c6105a78801cace"],["/static/media/elfknightidle.aeca9a9a.gif","aeca9a9aac332042ace180a40e68ac00"],["/static/media/game_background_1.51849fd3.gif","51849fd3b15b8b80cd206024838e7117"],["/static/media/gatekeeperbattle.48f7484d.gif","48f7484d12aed986fbe9e8f2f19dfdc8"],["/static/media/gatekeeperidle.211bed81.gif","211bed814720905a639a881126f0d043"],["/static/media/goblinattack.5cf1ee05.gif","5cf1ee05949e1e3b9c40fd22d7fb5804"],["/static/media/goblinidle.f4d6587e.gif","f4d6587e29acfb9175e29ffe682fd9e9"],["/static/media/hobbattle.014e6e45.gif","014e6e4586561c13a54e2ea98e2af25a"],["/static/media/hobidle.40bc8f51.gif","40bc8f51ba870c99db49923d74faa89e"],["/static/media/mage.115e9b59.png","115e9b59e8df549e3e2073fb78e0249b"],["/static/media/magebattle.ebe93116.gif","ebe93116afe2f03c4d02a54e2ed7f833"],["/static/media/mageidle.8712b8ed.gif","8712b8edf7a63ff8d455756fb793ee97"],["/static/media/mageportrait.7bfe0587.png","7bfe0587a6654a16d86b0b43081b41c5"],["/static/media/map1.2c51c00a.jpg","2c51c00ab97c14c2eaf944e63bfcc803"],["/static/media/necro.89b1df5a.jpg","89b1df5aa2419f74f19f3e90609f683a"],["/static/media/necromancerportrait.394a48f5.jpg","394a48f5ff68f3a6f8d6bc9607454dac"],["/static/media/netherspitebattle.d61b5083.gif","d61b5083df822731a78f28ec0060afb9"],["/static/media/netherspiteidle.b3c94050.gif","b3c940509a068e8d90950ac470d956db"],["/static/media/orkbattle.f342d83f.gif","f342d83fb4a23e79e2c90eb87eb10ffc"],["/static/media/orkidle.0be67c39.gif","0be67c39561942b4915da62a98d06f2f"],["/static/media/ranger.88dc88a3.png","88dc88a3d49308211664c260456a28f8"],["/static/media/rangerbattle.6e4249da.gif","6e4249daddc06d03133ccd8c8df2a78a"],["/static/media/rangeridle.1a24083f.gif","1a24083fd0cd45ad4f214f27c532096b"],["/static/media/rangerportrait.dbf8c0e9.png","dbf8c0e9a2b1588fef91d14df43d0530"],["/static/media/rogueportrait.b78fb42f.jpg","b78fb42f8c0f1870da1889be19718e5d"],["/static/media/soothseekerbattle.35ba3a0c.gif","35ba3a0cbe15f411a07044a81cc9c0f5"],["/static/media/soothseekeridle.8e76e36a.gif","8e76e36aff619a0acc17896c03eef377"],["/static/media/warrior.7327c9e1.png","7327c9e1d3a613c2baf3d62f9dbac8fa"],["/static/media/warriorbattle.1a30f658.gif","1a30f658229231db5d3a7f92c53e2666"],["/static/media/warrioridle.59464db6.gif","59464db664e70989df344388f7b076ee"],["/static/media/warriorportrait.dd7811a2.png","dd7811a2689fedc499274880a2a135fa"],["/static/media/wizardbattle.79a3ddfe.gif","79a3ddfead6ab264f9841fecd964d26b"],["/static/media/wizardidle.c62e1564.gif","c62e156436dfb525a179096704ceab15"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,i){var c=new URL(e);return i&&c.pathname.match(i)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],i=new URL(a,self.location),c=createCacheKey(i,hashParamName,t,/\.\w{8}\./);return[i.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(i){return setOfCachedUrls(i).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return i.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),i="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,i),e=urlsToCacheKeys.has(t));var c="/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});