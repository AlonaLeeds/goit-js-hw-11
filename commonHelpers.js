import{a as m,S as g,n as u}from"./assets/vendor-26307178.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();class b{constructor(){this.searchQuery="",this.page=1,this.PER_PAGE=40}async fetchGallery(){const t={method:"get",url:"https://pixabay.com/api/",params:{key:"43218628-434600724cd02d3e35d2dc910",q:`${this.searchQuery}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:`${this.page}`,per_page:`${this.PER_PAGE}`}};try{const i=(await m(t)).data;return this.incrementPage(),i}catch(s){console.error(s)}}incrementPage(){this.page+=1}resetPage(){this.page=1}resetEndOfHits(){this.endOfHits=!1}get query(){return this.searchQuery}set query(t){this.searchQuery=t}}let v=new g(".photo-card a",{captions:!0,captionsData:"alt",captionDelay:250});const n={searchForm:document.querySelector(".search-form"),galleryContainer:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let c=0;const l=new b;n.searchForm.addEventListener("submit",P);n.loadMoreBtn.addEventListener("click",d);const L={rootMargin:"50px",root:null,threshold:.3};new IntersectionObserver(d,L);function P(o){o.preventDefault();const t=event.currentTarget.elements.searchQuery;if(t.value="",n.galleryContainer.innerHTML="",l.query=o.currentTarget.elements.searchQuery.value.trim(),l.resetPage(),l.query===""){u.Notify.warning("Please, fill the main field");return}c=0,f(),h(hits)}function d(){l.incrementPage(),f()}async function f(){n.loadMoreBtn.classList.add("is-hidden");const o=await l.fetchGallery(),{hits:t,total:s}=o;if(c+=t.length,!t.length){u.Notify.failure("Sorry, there are no images matching your search query. Please try again."),n.loadMoreBtn.classList.add("is-hidden");return}h(t),c+=t.length,c<s&&(u.Notify.success(`Hooray! We found ${s} images !!!`),n.loadMoreBtn.classList.remove("is-hidden")),c>=s&&u.Notify.info("We're sorry, but you've reached the end of search results.")}function h(o){const t=o.map(({webformatURL:s,largeImageURL:i,tags:e,likes:r,views:a,comments:p,downloads:y})=>`<div class="photo-card">
    <a href="${i}">
      <img class="photo-img" src="${s}" alt="${e}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${r}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${a}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${p}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${y}
      </p>
    </div>
    </div>`).join("");n.galleryContainer.insertAdjacentHTML("beforeend",t),v.refresh()}
//# sourceMappingURL=commonHelpers.js.map
