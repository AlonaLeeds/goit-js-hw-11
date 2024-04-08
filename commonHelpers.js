import{a as m,S as g,n as d}from"./assets/vendor-26307178.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();class b{constructor(){this.searchQuery="",this.page=1,this.PER_PAGE=40}async fetchGallery(){const t={method:"get",url:"https://pixabay.com/api/",params:{key:"43218628-434600724cd02d3e35d2dc910",q:`${this.searchQuery}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:`${this.page}`,per_page:`${this.PER_PAGE}`}};try{const n=(await m(t)).data;return this.incrementPage(),n}catch(o){console.error(o)}}incrementPage(){this.page+=1}resetPage(){this.page=1}resetEndOfHits(){this.endOfHits=!1}get query(){return this.searchQuery}set query(t){this.searchQuery=t}}let v=new g(".photo-card a",{captions:!0,captionsData:"alt",captionDelay:250});const i={searchForm:document.querySelector(".search-form"),galleryContainer:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let c=0;const l=new b;i.searchForm.addEventListener("submit",P);i.loadMoreBtn.addEventListener("click",u);const L={rootMargin:"50px",root:null,threshold:.3};new IntersectionObserver(u,L);function P(s){if(s.preventDefault(),i.galleryContainer.innerHTML="",l.query=s.currentTarget.elements.searchQuery.value.trim(),l.resetPage(),l.query===""){d.Notify.warning("Please, fill the main field");return}c=0,f(),h(hits)}searchForm.reset();function u(){l.incrementPage(),f()}async function f(){i.loadMoreBtn.classList.add("is-hidden");const s=await l.fetchGallery(),{hits:t,total:o}=s;if(c+=t.length,!t.length){d.Notify.failure("Sorry, there are no images matching your search query. Please try again."),i.loadMoreBtn.classList.add("is-hidden");return}h(t),c+=t.length,c<o&&(d.Notify.success(`Hooray! We found ${o} images !!!`),i.loadMoreBtn.classList.remove("is-hidden")),c>=o&&d.Notify.info("We're sorry, but you've reached the end of search results.")}function h(s){const t=s.map(({webformatURL:o,largeImageURL:n,tags:e,likes:r,views:a,comments:p,downloads:y})=>`<div class="photo-card">
    <a href="${n}">
      <img class="photo-img" src="${o}" alt="${e}" loading="lazy" />
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
    </div>`).join("");i.galleryContainer.insertAdjacentHTML("beforeend",t),v.refresh()}
//# sourceMappingURL=commonHelpers.js.map
