function search() {
    const input = document.querySelector('.search-block > input'),
          searchBtn = document.querySelector('.search-block > button');

    searchBtn.addEventListener('click', () => {
        console.log(input.value);
    })
   
}

search();
      