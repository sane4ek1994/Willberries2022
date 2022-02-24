const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link');

    const getData = () => {
        fetch('https://testdb-5ef1d-default-rtdb.europe-west1.firebasedatabase.app/db.json')
        .then(res => res.json())
        .then(data => localStorage.setItem('data', (JSON.stringify(data))))
    }

    links.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            getData();
        })
    })
}

getGoods();