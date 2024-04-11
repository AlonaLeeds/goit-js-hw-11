import{S as d,i as h}from"./assets/vendor-8c59ed88.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m="43236176-8efbdba212834d112cbf0fa21",p="https://pixabay.com/api/?";function g(i){const r=new URLSearchParams({key:m,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${p}${r}`).then(o=>{if(!o.ok)throw new Error(o.statusText);return o.json()})}const y=new d(".gallery a",{captionsData:"alt",captionDelay:350});function b(i,r){i.innerHTML=L(r),y.refresh()}function L(i){return i.map(({webformatURL:r,largeImageURL:o,tags:a,likes:e,views:t,comments:s,downloads:u})=>` <div class="photo-card">
    <a href="${o}">
      <img class="photo-img" src="${r}" alt="${a}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${e}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${t}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${s}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${u}
      </p>
    </div>
    </div>`).join("")}const c=document.querySelector(".search-form"),S=document.querySelector(".search-form__input"),l=document.querySelector(".gallery"),n=document.querySelector(".preloader");c.addEventListener("submit",$);function v(){n.classList.remove("is-hidden")}function P(){n.classList.add("is-hidden")}function $(i){i.preventDefault(),l.innerHTML="",v(),n.classList.remove("is-hidden");const r=S.value.trim();if(r===""){f("Please fill out the input field!"),c.reset(),n.classList.add("is-hidden");return}g(r).then(o=>{if(o.hits.length===0){f("Sorry, there are no images matching your search query. Please try again!");return}b(l,o.hits)}).catch(o=>console.log(o)).finally(()=>{n.classList.add("is-hidden"),P(),c.reset()})}const w={title:"",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fff",titleColor:"#fff",timeout:3e3,pauseOnHover:!1};function f(i){h.error({...w,message:`${i}`})}
//# sourceMappingURL=commonHelpers.js.map
