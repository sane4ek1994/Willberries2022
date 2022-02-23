function search() {
    const input = document.querySelector('.search-block > input'),
          searchBtn = document.querySelector('.search-block > button');

    input.addEventListener('input', (e) => {
        console.log(e.target.value);
    })
   
}

search();
      