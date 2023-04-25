import { main } from '/layouts/main.js';
await main();

//전체 상품 목록 불러오기
const amountAll = document.querySelector('.prod__item--amount');
const categories = document.querySelectorAll('.nav__cate li');

categories.forEach(category => {
  category.addEventListener('click', () => {
    const selectedCategory = category.dataset.category;
    axios
      .get(`/api/products/${selectedCategory}`) 
      .then((res)=>{
        const items=res.data.info
        console.log(items)
        amountAll.innerText = items.length;
        const list = document.querySelector('.prod__list');
        list.innerHTML = ""; //기존 상품 목록 초기화
        items.forEach((item) => {
          list.innerHTML += createItem(item);
        });

        // URL 변경 코드
        const currentUrl = window.location.href;
        // /products/뒤에오는 문자열 찾기-> 카테고리명으로 변경하기
        const newUrl = currentUrl.replace(/\/products\/(.*)\/?/, `/products/${selectedCategory}`);
        // 브라우저 히스토리에 새 url추가
        window.history.pushState({path: newUrl}, '', newUrl);
      })
  });
});

//상품 렌더링
const createItem = (item) => {
  return `
    <li class="prod__item">
      <a class="prod__link" href="/products?id=${item.id}">
        <img class="prod__link-thumb" src="${item.imgUrl}" />
        <div class="prod__info">
          <p class="prod__title">${item.name}</p>
          <div class="prod__order">
            <span><strong class="prod__order-price">${item.price}</strong>원</span>
            <!-- <button class="prod__add-cart"><img src="/src/views/img/main/cart.png" /></button> -->
          </div>
        </div>
      </a>
    </li>`;
};