// ==UserScript==
// @name         hentai-cover以图搜种
// @description  解放搜索过程,图片自带磁力链接
// @version      1.0
// @author       psrx
// @namespace    https://github.com/Masotan
// @match        https://hentai-covers.site/*
// @run-at       document-end
// @grant        GM_xmlhttpRequest
// ==/UserScript==
!function(){
  function f(a, span, urltitle) {
    a.httping = GM_xmlhttpRequest({
      method: "GET",
      url: `https://sukebei.nyaa.si/?f=0&c=0_0&q="${urltitle}"`,
      onload: (res) => {
        let cili = new DOMParser().parseFromString(res.responseText, 'text/html').querySelector('.container>.table-responsive>table>tbody>tr>td:nth-child(3)>a:nth-child(2)')
        if (!cili) {
          a.href = `https://e-hentai.org/?f_doujinshi=1&f_manga=1&f_artistcg=1&f_gamecg=1&f_western=1&f_non-h=1&f_imageset=1&f_cosplay=1&f_asianporn=1&f_misc=1&f_search="${urltitle}"&f_apply=Apply+Filter`
          a.target = '_blank'
          span.style.color = 'rgb(230, 247, 0)'
          a.style.color = 'rgb(230, 247, 0)'
          span.textContent = '没找到,点标题去隔壁站瞅瞅'
          return
        }
        a.href = cili.href
        span.style.color = 'rgb(57, 241, 0)'
        a.style.color = 'rgb(57, 241, 0)'
        span.textContent = '搜索完毕,请点击标题下载'
      }
    })
    setTimeout(() => {
      if (span.textContent === '正在搜索...') {
        a.httping.abort()
        f(a, span, urltitle)
      }
    }, 5000)
  }
  
  document.querySelector('.content-width>#content-listing-tabs>#tabbed-content-group>.visible>.pad-content-listing').onmouseover = (e) => {
    let a = e.target
    if (a.localName !== 'a' || a.ok) return
    a.ok = true
    let span = a.nextElementSibling
    span.textContent = '正在搜索...'
    f(a, span, encodeURIComponent(a.textContent))
  }
}()

