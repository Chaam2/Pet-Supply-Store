const userToken = localStorage.getItem('userToken');

function renderHeader() {
  const header = document.querySelector('header');

  //로그인 한 유저의 헤더
  if (userToken) {
    header.innerHTML = `
  <nav class="nav">
    <a href="/"><img class="nav__logo" src="/img/logo.png" width="140" /></a>

    <ul class="nav__user-menu">
      <li>
        <a class="nav__mypage" href="/mypage"><img class="icon" src="/img/profile.png" /></a>
      </li>
      <li>
        <a href="/orders/cart"><img class="icon" src="/img/cart.png" /></a>
      </li>
    </ul>
  </nav>
`;
  }
  //로그인 안 한 유저의 헤더
  else {
    header.innerHTML = `
      <nav class="nav">
        <a href="/">
          <img class="nav__logo" src="/img/logo.png" width="140" />
        </a>

        <ul class="nav__user-menu">
          <li>
            <a class="nav__login" href="/signin">
              로그인
            </a>
          </li>
          <li>
            <a href="/orders/cart">
              <img class="icon" src="/img/cart.png" />
            </a>
          </li>
        </ul>
      </nav>
    `;
  }
}

export { renderHeader };
