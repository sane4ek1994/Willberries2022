function search() {
    const input = document.querySelector('.search-block > input'),
          searchBtn = document.querySelector('.search-block > button');

    searchBtn.addEventListener('click', () => {

        if (!input.value) {
            console.log('Введите данные!');
        } else {
            console.log(input.value);
        } 
        
    })
}

search();
      