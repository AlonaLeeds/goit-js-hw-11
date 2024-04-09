import{a as g,S as b,n as u,i as P}from"./assets/vendor-ec30e11c.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();class v{constructor(){this.searchQuery="",this.page=1,this.PER_PAGE=40}async fetchGallery(){const t={method:"get",url:"https://pixabay.com/api/",params:{key:"43218628-434600724cd02d3e35d2dc910",q:`${this.searchQuery}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:`${this.page}`,per_page:`${this.PER_PAGE}`}};try{const n=(await g(t)).data;return this.incrementPage(),n}catch(s){console.error(s)}}incrementPage(){this.page+=1}resetPage(){this.page=1}resetEndOfHits(){this.endOfHits=!1}get query(){return this.searchQuery}set query(t){this.searchQuery=t}}let L=new b(".photo-card a",{captions:!0,captionsData:"alt",captionDelay:250});const i={searchForm:document.querySelector(".search-form"),galleryContainer:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let c=0;const l=new v;i.searchForm.addEventListener("submit",$);i.loadMoreBtn.addEventListener("click",d);const w={rootMargin:"50px",root:null,threshold:.3};new IntersectionObserver(d,w);function $(o){if(o.preventDefault(),i.galleryContainer.innerHTML="",l.query=o.currentTarget.elements.searchQuery.value.trim(),l.resetPage(),l.query===""){p("Please fill out the input field!"),i.searchForm.reset(),u.Notify.warning("Please, fill the main field");return}c=0,f(),h(hits)}function d(){l.incrementPage(),f()}async function f(){i.loadMoreBtn.classList.add("is-hidden");const o=await l.fetchGallery(),{hits:t,total:s}=o;if(c+=t.length,!t.length){p("Sorry, there are no images matching your search query. Please try again!"),i.loadMoreBtn.classList.add("is-hidden");return}h(t),c+=t.length,c<s&&(u.Notify.success(`Hooray! We found ${s} images !!!`),i.loadMoreBtn.classList.remove("is-hidden")),c>=s&&u.Notify.info("We're sorry, but you've reached the end of search results.")}function h(o){const t=o.map(({webformatURL:s,largeImageURL:n,tags:e,likes:r,views:a,comments:m,downloads:y})=>`<div class="photo-card">
    <a href="${n}">
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
        ${m}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${y}
      </p>
    </div>
    </div>`).join("");i.galleryContainer.insertAdjacentHTML("beforeend",t),L.refresh()}const M={title:"",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fff",titleColor:"#fff",timeout:3e3,pauseOnHover:!1};function p(o){P.error({...M,message:`${o}`})}
//# sourceMappingURL=commonHelpers.js.map
