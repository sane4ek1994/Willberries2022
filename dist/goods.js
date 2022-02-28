(()=>{"use strict";var __webpack_modules__={220:()=>{eval('\n;// CONCATENATED MODULE: ./src/modules/cart.js\nconst cart = function () {\r\n    const cartBtn = document.querySelector(".button-cart"); // Кнопка для активации модального окна\r\n    const cart = document.getElementById("modal-cart"); // Модальное окно\r\n    const closebtn = cart.querySelector(".modal-close"); // Кнопака закрытия модального окна\r\n    const goodsContainer = document.querySelector(".long-goods-list"); // Окно с товаром\r\n    const cartTable = document.querySelector(".cart-table__goods"); // Окно корзины\r\n    const modalform = document.querySelector(".modal-form"); // Форма в модальном окне\r\n    const totalPriceEl = document.querySelector(".card-table__total"); // Сумма все корзины\r\n  \r\n    const formInputName = document.querySelector(\'[name="nameCustomer"]\'); // input имени из модальной формы\r\n    const formInputPhone = document.querySelector("[name=\'phoneCustomer\']"); // input телефона из модальной формы\r\n  \r\n    // функция удаления товара из корзины\r\n    const deleteCartItem = (id) => {\r\n      const cart = JSON.parse(localStorage.getItem("cart"));\r\n  \r\n      const newCart = cart.filter((good) => {\r\n        return good.id !== id;\r\n      });\r\n  \r\n      localStorage.setItem("cart", JSON.stringify(newCart));\r\n      renderCartGoods(JSON.parse(localStorage.getItem("cart")));\r\n    };\r\n  \r\n    // Функция увеличения колличества товара в корзине\r\n    const plusCartItem = (id) => {\r\n      const cart = JSON.parse(localStorage.getItem("cart"));\r\n  \r\n      const newCart = cart.map((good) => {\r\n        if (good.id === id) {\r\n          good.count++;\r\n        }\r\n        return good;\r\n      });\r\n  \r\n      localStorage.setItem("cart", JSON.stringify(newCart));\r\n      renderCartGoods(JSON.parse(localStorage.getItem("cart")));\r\n    };\r\n  \r\n    // Функция уменьшения колличества товара в корзине\r\n    const minusCartItem = (id) => {\r\n      const cart = JSON.parse(localStorage.getItem("cart"));\r\n  \r\n      const newCart = cart.map((good) => {\r\n        if (good.id === id) {\r\n          if (good.count > 0) {\r\n            good.count--;\r\n          }\r\n        }\r\n        return good;\r\n      });\r\n  \r\n      localStorage.setItem("cart", JSON.stringify(newCart));\r\n      renderCartGoods(JSON.parse(localStorage.getItem("cart")));\r\n    };\r\n  \r\n    // Сохранения товара в localStorage\r\n    const addToCart = (id) => {\r\n      const goods = JSON.parse(localStorage.getItem("goods")); // База с товарами\r\n      const clickedGood = goods.find((good) => good.id === id); // id товара\r\n      // localStorage корзины\r\n      const cart = localStorage.getItem("cart")\r\n        ? JSON.parse(localStorage.getItem("cart"))\r\n        : [];\r\n  \r\n      // Увеличеть количество товара или добавления его в корзину\r\n      if (cart.some((good) => good.id === clickedGood.id)) {\r\n        cart.map((good) => {\r\n          if (good.id === clickedGood.id) {\r\n            good.count++;\r\n          }\r\n          return good;\r\n        });\r\n      } else {\r\n        clickedGood.count = 1;\r\n        cart.push(clickedGood);\r\n      }\r\n  \r\n      // Готовая база товара в корзине\r\n      localStorage.setItem("cart", JSON.stringify(cart));\r\n    };\r\n  \r\n    // Отрисовка товара в корзине\r\n    const renderCartGoods = (goods) => {\r\n      cartTable.innerHTML = ``;\r\n  \r\n      goods.forEach((good) => {\r\n        const tr = document.createElement("tr");\r\n        tr.innerHTML = `\r\n                          <td>${good.name}</td>\r\n                          <td>${good.price}$</td>\r\n                          <td><button class="cart-btn-minus"">-</button></td>\r\n                          <td>${good.count}</td>\r\n                          <td><button class=" cart-btn-plus"">+</button></td>\r\n                          <td data-totalPrice="">${+good.price * +good.count}$</td>\r\n                          <td><button class="cart-btn-delete"">x</button></td>\r\n              `;\r\n        cartTable.append(tr);\r\n  \r\n        // Оживляем кнопки корзины\r\n        tr.addEventListener("click", (event) => {\r\n          if (event.target.classList.contains("cart-btn-minus")) {\r\n            minusCartItem(good.id);\r\n          } else if (event.target.classList.contains("cart-btn-plus")) {\r\n            plusCartItem(good.id);\r\n          } else if (event.target.classList.contains("cart-btn-delete")) {\r\n            deleteCartItem(good.id);\r\n          }\r\n        });\r\n      });\r\n      // Функция посчета суммы корзины\r\n      let totalPrice = 0;\r\n      goods.forEach((item) => {\r\n        const priceEl = item.price * item.count;\r\n        console.log(priceEl);\r\n        totalPrice += priceEl;\r\n        console.log(totalPrice);\r\n      });\r\n      totalPriceEl.innerText = totalPrice + "$";\r\n    };\r\n  \r\n    const sandForm = (nameInput, phoneInput) => {\r\n      const cartArray = localStorage.getItem("cart")\r\n        ? JSON.parse(localStorage.getItem("cart"))\r\n        : [];\r\n  \r\n      fetch("https://jsonplaceholder.typicode.com/posts", {\r\n        method: "POST",\r\n        body: JSON.stringify({\r\n          cart: cartArray,\r\n          name: nameInput,\r\n          phone: phoneInput,\r\n        }),\r\n      }).then(() => {\r\n        formInputName.value = "";\r\n        formInputPhone.value = "";\r\n        localStorage.removeItem("cart");\r\n        cart.style.display = "";\r\n      });\r\n    };\r\n  \r\n    modalform.addEventListener("submit", (e) => {\r\n      e.preventDefault();\r\n  \r\n      const nameInput = formInputName.value;\r\n      const phoneInput = formInputPhone.value;\r\n  \r\n      sandForm(nameInput, phoneInput);\r\n    });\r\n  \r\n    // Функция вызова модального окна\r\n    cartBtn.addEventListener("click", () => {\r\n      const cartArray = localStorage.getItem("cart")\r\n        ? JSON.parse(localStorage.getItem("cart"))\r\n        : [];\r\n  \r\n      renderCartGoods(cartArray);\r\n  \r\n      cart.style.display = "flex";\r\n    });\r\n  \r\n    // Функция закрытия модальног окна\r\n    closebtn.addEventListener("click", () => {\r\n      cart.style.display = "";\r\n    });\r\n  \r\n    // Функция закрытия окна по нажатию вне его\r\n    cart.addEventListener("click", (e) => {\r\n      if (!e.target.closest(".modal") && e.target.classList.contains("overlay")) {\r\n        cart.style.display = "";\r\n      }\r\n    });\r\n  \r\n    // Функция закрытия окна при нажатии на Escape\r\n    window.addEventListener("keydown", (e) => {\r\n      if (e.key === "Escape") {\r\n        cart.style.display = "";\r\n      }\r\n    });\r\n  \r\n    // Функция добавления товара в корзину при нажатии на кнопку с ценой\r\n    if (goodsContainer) {\r\n      goodsContainer.addEventListener("click", (event) => {\r\n        if (event.target.closest(".add-to-cart")) {\r\n          const buttonToCart = event.target.closest(".add-to-cart");\r\n          const goodId = buttonToCart.dataset.id;\r\n  \r\n          addToCart(goodId);\r\n        }\r\n      });\r\n    }\r\n  };\r\n\n;// CONCATENATED MODULE: ./src/modules/getGoods.js\nconst getGoods = () => {\r\n    const links = document.querySelectorAll(\'.navigation-link\'),\r\n          viewAll = document.querySelector(\'.more\');\r\n\r\n    const renderGoods = (goods) => {\r\n        const goodsContainer = document.querySelector(\'.long-goods-list\');\r\n        goodsContainer.innerHTML = \'\';\r\n\r\n        goods.forEach(good => {\r\n            const goodBlock = document.createElement(\'div\');\r\n            goodBlock.classList.add(\'col-lg-3\');\r\n            goodBlock.classList.add(\'col-sm-6\');\r\n            goodBlock.innerHTML = `\r\n            <div class="goods-card">\r\n                <span class="label ${good.label ? null : \'d-none\'}">${good.label}</span>\r\n                <img src=db/${good.img} alt=${good.name} class="goods-image">\r\n                <h3 class="goods-title">${good.name}</h3>\r\n                \r\n                <p class="goods-description">${good.description}</p>\r\n\r\n                <button class="button goods-card-btn add-to-cart" data-id=${good.id}>\r\n                    <span class="button-price">$${good.price}</span>\r\n                </button>\r\n            </div>\r\n            `;\r\n\r\n            goodsContainer.append(goodBlock);\r\n        })\r\n    }\r\n\r\n    const getData = (value, category) => {\r\n        fetch(\'https://testdb-5ef1d-default-rtdb.europe-west1.firebasedatabase.app/db.json\')\r\n        .then(res => res.json())\r\n        .then(data => {\r\n            const array = data.filter(item => category ? item[category] === value : data); // Запомни этот прием!\r\n\r\n            localStorage.setItem(\'goods\', (JSON.stringify(array)))\r\n\r\n            if (window.location.pathname !== \'/goods.html\') {\r\n                window.location.href = \'/goods.html\'\r\n            } else {\r\n                renderGoods(array);\r\n            }\r\n            \r\n        })\r\n    }\r\n\r\n    links.forEach(link => {\r\n        link.addEventListener(\'click\', (e) => {\r\n            e.preventDefault();\r\n            const linkValue = link.textContent;\r\n            const category = link.dataset.field;\r\n            getData(linkValue, category);\r\n        })\r\n    })\r\n\r\n    if (viewAll) {\r\n        viewAll.addEventListener("click", function (event) {\r\n          event.preventDefault;\r\n    \r\n          getData();\r\n        });\r\n      }\r\n\r\n    if (localStorage.getItem(\'goods\') && window.location.pathname === \'/goods.html\') {\r\n        renderGoods(JSON.parse(localStorage.getItem(\'goods\')));\r\n    }\r\n}\r\n\n;// CONCATENATED MODULE: ./src/modules/search.js\nfunction search() {\r\n    const input = document.querySelector(\'.search-block > input\'),\r\n          searchBtn = document.querySelector(\'.search-block > button\');\r\n\r\n    const renderGoods = (goods) => {\r\n        const goodsContainer = document.querySelector(\'.long-goods-list\');\r\n        goodsContainer.innerHTML = \'\';\r\n\r\n        goods.forEach(good => {\r\n            const goodBlock = document.createElement(\'div\');\r\n            goodBlock.classList.add(\'col-lg-3\');\r\n            goodBlock.classList.add(\'col-sm-6\');\r\n            goodBlock.innerHTML = `\r\n            <div class="goods-card">\r\n                <span class="label ${good.label ? null : \'d-none\'}">${good.label}</span>\r\n                <img src=db/${good.img} alt=${good.name} class="goods-image">\r\n                <h3 class="goods-title">${good.name}</h3>\r\n                \r\n                <p class="goods-description">${good.description}</p>\r\n\r\n                <button class="button goods-card-btn add-to-cart" data-id=${good.id}>\r\n                    <span class="button-price">$${good.price}</span>\r\n                </button>\r\n            </div>\r\n            `;\r\n\r\n            goodsContainer.append(goodBlock);\r\n        })\r\n    }\r\n\r\n    const getData = (value) => {\r\n        fetch(\'https://testdb-5ef1d-default-rtdb.europe-west1.firebasedatabase.app/db.json\')\r\n        .then(res => res.json())\r\n        .then(data => {\r\n            const array = data.filter(good => good.name.toLowerCase().includes(value.toLowerCase()))\r\n\r\n            localStorage.setItem(\'goods\', (JSON.stringify(array)))\r\n\r\n            if (window.location.pathname !== \'/goods.html\') {\r\n                window.location.href = \'/goods.html\'\r\n            } else {\r\n                renderGoods(array);\r\n            }\r\n            \r\n        })\r\n    }\r\n\r\n    searchBtn.addEventListener(\'click\', () => {\r\n        getData(input.value);  \r\n    })\r\n}\r\n\r\n      \n;// CONCATENATED MODULE: ./src/goods.js\n\r\n\r\n\r\n\r\ncart();\r\ngetGoods();\r\nsearch();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHFDQUFxQyw2QkFBNkIsSUFBSSxXQUFXO0FBQ2pGLDhCQUE4QixVQUFVLE1BQU0sV0FBVztBQUN6RCwwQ0FBMEMsVUFBVTtBQUNwRDtBQUNBLCtDQUErQyxpQkFBaUI7QUFDaEU7QUFDQSw0RUFBNEUsUUFBUTtBQUNwRixrREFBa0QsV0FBVztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE07O0FDcERzQztBQUNRO0FBQ0o7QUFDMUM7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSLE1BQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95Ly4vc3JjL21vZHVsZXMvY2FydC5qcz9hYzBlIiwid2VicGFjazovL3kvLi9zcmMvbW9kdWxlcy9nZXRHb29kcy5qcz9kNTlhIiwid2VicGFjazovL3kvLi9zcmMvbW9kdWxlcy9zZWFyY2guanM/ZTA3NSIsIndlYnBhY2s6Ly95Ly4vc3JjL2dvb2RzLmpzPzdiZGEiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNhcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBjYXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24tY2FydFwiKTsgLy8g0JrQvdC+0L/QutCwINC00LvRjyDQsNC60YLQuNCy0LDRhtC40Lgg0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LBcclxuICAgIGNvbnN0IGNhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWNhcnRcIik7IC8vINCc0L7QtNCw0LvRjNC90L7QtSDQvtC60L3QvlxyXG4gICAgY29uc3QgY2xvc2VidG4gPSBjYXJ0LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwtY2xvc2VcIik7IC8vINCa0L3QvtC/0LDQutCwINC30LDQutGA0YvRgtC40Y8g0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LBcclxuICAgIGNvbnN0IGdvb2RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb25nLWdvb2RzLWxpc3RcIik7IC8vINCe0LrQvdC+INGBINGC0L7QstCw0YDQvtC8XHJcbiAgICBjb25zdCBjYXJ0VGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcnQtdGFibGVfX2dvb2RzXCIpOyAvLyDQntC60L3QviDQutC+0YDQt9C40L3Ri1xyXG4gICAgY29uc3QgbW9kYWxmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbC1mb3JtXCIpOyAvLyDQpNC+0YDQvNCwINCyINC80L7QtNCw0LvRjNC90L7QvCDQvtC60L3QtVxyXG4gICAgY29uc3QgdG90YWxQcmljZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkLXRhYmxlX190b3RhbFwiKTsgLy8g0KHRg9C80LzQsCDQstGB0LUg0LrQvtGA0LfQuNC90YtcclxuICBcclxuICAgIGNvbnN0IGZvcm1JbnB1dE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm5hbWVDdXN0b21lclwiXScpOyAvLyBpbnB1dCDQuNC80LXQvdC4INC40Lcg0LzQvtC00LDQu9GM0L3QvtC5INGE0L7RgNC80YtcclxuICAgIGNvbnN0IGZvcm1JbnB1dFBob25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltuYW1lPSdwaG9uZUN1c3RvbWVyJ11cIik7IC8vIGlucHV0INGC0LXQu9C10YTQvtC90LAg0LjQtyDQvNC+0LTQsNC70YzQvdC+0Lkg0YTQvtGA0LzRi1xyXG4gIFxyXG4gICAgLy8g0YTRg9C90LrRhtC40Y8g0YPQtNCw0LvQtdC90LjRjyDRgtC+0LLQsNGA0LAg0LjQtyDQutC+0YDQt9C40L3Ri1xyXG4gICAgY29uc3QgZGVsZXRlQ2FydEl0ZW0gPSAoaWQpID0+IHtcclxuICAgICAgY29uc3QgY2FydCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjYXJ0XCIpKTtcclxuICBcclxuICAgICAgY29uc3QgbmV3Q2FydCA9IGNhcnQuZmlsdGVyKChnb29kKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGdvb2QuaWQgIT09IGlkO1xyXG4gICAgICB9KTtcclxuICBcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjYXJ0XCIsIEpTT04uc3RyaW5naWZ5KG5ld0NhcnQpKTtcclxuICAgICAgcmVuZGVyQ2FydEdvb2RzKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjYXJ0XCIpKSk7XHJcbiAgICB9O1xyXG4gIFxyXG4gICAgLy8g0KTRg9C90LrRhtC40Y8g0YPQstC10LvQuNGH0LXQvdC40Y8g0LrQvtC70LvQuNGH0LXRgdGC0LLQsCDRgtC+0LLQsNGA0LAg0LIg0LrQvtGA0LfQuNC90LVcclxuICAgIGNvbnN0IHBsdXNDYXJ0SXRlbSA9IChpZCkgPT4ge1xyXG4gICAgICBjb25zdCBjYXJ0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNhcnRcIikpO1xyXG4gIFxyXG4gICAgICBjb25zdCBuZXdDYXJ0ID0gY2FydC5tYXAoKGdvb2QpID0+IHtcclxuICAgICAgICBpZiAoZ29vZC5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgIGdvb2QuY291bnQrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdvb2Q7XHJcbiAgICAgIH0pO1xyXG4gIFxyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImNhcnRcIiwgSlNPTi5zdHJpbmdpZnkobmV3Q2FydCkpO1xyXG4gICAgICByZW5kZXJDYXJ0R29vZHMoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNhcnRcIikpKTtcclxuICAgIH07XHJcbiAgXHJcbiAgICAvLyDQpNGD0L3QutGG0LjRjyDRg9C80LXQvdGM0YjQtdC90LjRjyDQutC+0LvQu9C40YfQtdGB0YLQstCwINGC0L7QstCw0YDQsCDQsiDQutC+0YDQt9C40L3QtVxyXG4gICAgY29uc3QgbWludXNDYXJ0SXRlbSA9IChpZCkgPT4ge1xyXG4gICAgICBjb25zdCBjYXJ0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNhcnRcIikpO1xyXG4gIFxyXG4gICAgICBjb25zdCBuZXdDYXJ0ID0gY2FydC5tYXAoKGdvb2QpID0+IHtcclxuICAgICAgICBpZiAoZ29vZC5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgIGlmIChnb29kLmNvdW50ID4gMCkge1xyXG4gICAgICAgICAgICBnb29kLmNvdW50LS07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnb29kO1xyXG4gICAgICB9KTtcclxuICBcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjYXJ0XCIsIEpTT04uc3RyaW5naWZ5KG5ld0NhcnQpKTtcclxuICAgICAgcmVuZGVyQ2FydEdvb2RzKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjYXJ0XCIpKSk7XHJcbiAgICB9O1xyXG4gIFxyXG4gICAgLy8g0KHQvtGF0YDQsNC90LXQvdC40Y8g0YLQvtCy0LDRgNCwINCyIGxvY2FsU3RvcmFnZVxyXG4gICAgY29uc3QgYWRkVG9DYXJ0ID0gKGlkKSA9PiB7XHJcbiAgICAgIGNvbnN0IGdvb2RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImdvb2RzXCIpKTsgLy8g0JHQsNC30LAg0YEg0YLQvtCy0LDRgNCw0LzQuFxyXG4gICAgICBjb25zdCBjbGlja2VkR29vZCA9IGdvb2RzLmZpbmQoKGdvb2QpID0+IGdvb2QuaWQgPT09IGlkKTsgLy8gaWQg0YLQvtCy0LDRgNCwXHJcbiAgICAgIC8vIGxvY2FsU3RvcmFnZSDQutC+0YDQt9C40L3Ri1xyXG4gICAgICBjb25zdCBjYXJ0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjYXJ0XCIpXHJcbiAgICAgICAgPyBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY2FydFwiKSlcclxuICAgICAgICA6IFtdO1xyXG4gIFxyXG4gICAgICAvLyDQo9Cy0LXQu9C40YfQtdGC0Ywg0LrQvtC70LjRh9C10YHRgtCy0L4g0YLQvtCy0LDRgNCwINC40LvQuCDQtNC+0LHQsNCy0LvQtdC90LjRjyDQtdCz0L4g0LIg0LrQvtGA0LfQuNC90YNcclxuICAgICAgaWYgKGNhcnQuc29tZSgoZ29vZCkgPT4gZ29vZC5pZCA9PT0gY2xpY2tlZEdvb2QuaWQpKSB7XHJcbiAgICAgICAgY2FydC5tYXAoKGdvb2QpID0+IHtcclxuICAgICAgICAgIGlmIChnb29kLmlkID09PSBjbGlja2VkR29vZC5pZCkge1xyXG4gICAgICAgICAgICBnb29kLmNvdW50Kys7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZ29vZDtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjbGlja2VkR29vZC5jb3VudCA9IDE7XHJcbiAgICAgICAgY2FydC5wdXNoKGNsaWNrZWRHb29kKTtcclxuICAgICAgfVxyXG4gIFxyXG4gICAgICAvLyDQk9C+0YLQvtCy0LDRjyDQsdCw0LfQsCDRgtC+0LLQsNGA0LAg0LIg0LrQvtGA0LfQuNC90LVcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjYXJ0XCIsIEpTT04uc3RyaW5naWZ5KGNhcnQpKTtcclxuICAgIH07XHJcbiAgXHJcbiAgICAvLyDQntGC0YDQuNGB0L7QstC60LAg0YLQvtCy0LDRgNCwINCyINC60L7RgNC30LjQvdC1XHJcbiAgICBjb25zdCByZW5kZXJDYXJ0R29vZHMgPSAoZ29vZHMpID0+IHtcclxuICAgICAgY2FydFRhYmxlLmlubmVySFRNTCA9IGBgO1xyXG4gIFxyXG4gICAgICBnb29kcy5mb3JFYWNoKChnb29kKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICAgICAgdHIuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke2dvb2QubmFtZX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke2dvb2QucHJpY2V9JDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxidXR0b24gY2xhc3M9XCJjYXJ0LWJ0bi1taW51c1wiXCI+LTwvYnV0dG9uPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7Z29vZC5jb3VudH08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48YnV0dG9uIGNsYXNzPVwiIGNhcnQtYnRuLXBsdXNcIlwiPis8L2J1dHRvbj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBkYXRhLXRvdGFsUHJpY2U9XCJcIj4keytnb29kLnByaWNlICogK2dvb2QuY291bnR9JDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxidXR0b24gY2xhc3M9XCJjYXJ0LWJ0bi1kZWxldGVcIlwiPng8L2J1dHRvbj48L3RkPlxyXG4gICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgY2FydFRhYmxlLmFwcGVuZCh0cik7XHJcbiAgXHJcbiAgICAgICAgLy8g0J7QttC40LLQu9GP0LXQvCDQutC90L7Qv9C60Lgg0LrQvtGA0LfQuNC90YtcclxuICAgICAgICB0ci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNhcnQtYnRuLW1pbnVzXCIpKSB7XHJcbiAgICAgICAgICAgIG1pbnVzQ2FydEl0ZW0oZ29vZC5pZCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjYXJ0LWJ0bi1wbHVzXCIpKSB7XHJcbiAgICAgICAgICAgIHBsdXNDYXJ0SXRlbShnb29kLmlkKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNhcnQtYnRuLWRlbGV0ZVwiKSkge1xyXG4gICAgICAgICAgICBkZWxldGVDYXJ0SXRlbShnb29kLmlkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICAgIC8vINCk0YPQvdC60YbQuNGPINC/0L7RgdGH0LXRgtCwINGB0YPQvNC80Ysg0LrQvtGA0LfQuNC90YtcclxuICAgICAgbGV0IHRvdGFsUHJpY2UgPSAwO1xyXG4gICAgICBnb29kcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJpY2VFbCA9IGl0ZW0ucHJpY2UgKiBpdGVtLmNvdW50O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHByaWNlRWwpO1xyXG4gICAgICAgIHRvdGFsUHJpY2UgKz0gcHJpY2VFbDtcclxuICAgICAgICBjb25zb2xlLmxvZyh0b3RhbFByaWNlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRvdGFsUHJpY2VFbC5pbm5lclRleHQgPSB0b3RhbFByaWNlICsgXCIkXCI7XHJcbiAgICB9O1xyXG4gIFxyXG4gICAgY29uc3Qgc2FuZEZvcm0gPSAobmFtZUlucHV0LCBwaG9uZUlucHV0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNhcnRBcnJheSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY2FydFwiKVxyXG4gICAgICAgID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNhcnRcIikpXHJcbiAgICAgICAgOiBbXTtcclxuICBcclxuICAgICAgZmV0Y2goXCJodHRwczovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vcG9zdHNcIiwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgY2FydDogY2FydEFycmF5LFxyXG4gICAgICAgICAgbmFtZTogbmFtZUlucHV0LFxyXG4gICAgICAgICAgcGhvbmU6IHBob25lSW5wdXQsXHJcbiAgICAgICAgfSksXHJcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGZvcm1JbnB1dE5hbWUudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIGZvcm1JbnB1dFBob25lLnZhbHVlID0gXCJcIjtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImNhcnRcIik7XHJcbiAgICAgICAgY2FydC5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gIFxyXG4gICAgbW9kYWxmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIFxyXG4gICAgICBjb25zdCBuYW1lSW5wdXQgPSBmb3JtSW5wdXROYW1lLnZhbHVlO1xyXG4gICAgICBjb25zdCBwaG9uZUlucHV0ID0gZm9ybUlucHV0UGhvbmUudmFsdWU7XHJcbiAgXHJcbiAgICAgIHNhbmRGb3JtKG5hbWVJbnB1dCwgcGhvbmVJbnB1dCk7XHJcbiAgICB9KTtcclxuICBcclxuICAgIC8vINCk0YPQvdC60YbQuNGPINCy0YvQt9C+0LLQsCDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsFxyXG4gICAgY2FydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBjb25zdCBjYXJ0QXJyYXkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNhcnRcIilcclxuICAgICAgICA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjYXJ0XCIpKVxyXG4gICAgICAgIDogW107XHJcbiAgXHJcbiAgICAgIHJlbmRlckNhcnRHb29kcyhjYXJ0QXJyYXkpO1xyXG4gIFxyXG4gICAgICBjYXJ0LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgIH0pO1xyXG4gIFxyXG4gICAgLy8g0KTRg9C90LrRhtC40Y8g0LfQsNC60YDRi9GC0LjRjyDQvNC+0LTQsNC70YzQvdC+0LMg0L7QutC90LBcclxuICAgIGNsb3NlYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGNhcnQuc3R5bGUuZGlzcGxheSA9IFwiXCI7XHJcbiAgICB9KTtcclxuICBcclxuICAgIC8vINCk0YPQvdC60YbQuNGPINC30LDQutGA0YvRgtC40Y8g0L7QutC90LAg0L/QviDQvdCw0LbQsNGC0LjRjiDQstC90LUg0LXQs9C+XHJcbiAgICBjYXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICBpZiAoIWUudGFyZ2V0LmNsb3Nlc3QoXCIubW9kYWxcIikgJiYgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwib3ZlcmxheVwiKSkge1xyXG4gICAgICAgIGNhcnQuc3R5bGUuZGlzcGxheSA9IFwiXCI7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIFxyXG4gICAgLy8g0KTRg9C90LrRhtC40Y8g0LfQsNC60YDRi9GC0LjRjyDQvtC60L3QsCDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0L3QsCBFc2NhcGVcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xyXG4gICAgICBpZiAoZS5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuICAgICAgICBjYXJ0LnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBcclxuICAgIC8vINCk0YPQvdC60YbQuNGPINC00L7QsdCw0LLQu9C10L3QuNGPINGC0L7QstCw0YDQsCDQsiDQutC+0YDQt9C40L3RgyDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0L3QsCDQutC90L7Qv9C60YMg0YEg0YbQtdC90L7QuVxyXG4gICAgaWYgKGdvb2RzQ29udGFpbmVyKSB7XHJcbiAgICAgIGdvb2RzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIuYWRkLXRvLWNhcnRcIikpIHtcclxuICAgICAgICAgIGNvbnN0IGJ1dHRvblRvQ2FydCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLmFkZC10by1jYXJ0XCIpO1xyXG4gICAgICAgICAgY29uc3QgZ29vZElkID0gYnV0dG9uVG9DYXJ0LmRhdGFzZXQuaWQ7XHJcbiAgXHJcbiAgICAgICAgICBhZGRUb0NhcnQoZ29vZElkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbiIsImV4cG9ydCBjb25zdCBnZXRHb29kcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdmlnYXRpb24tbGluaycpLFxyXG4gICAgICAgICAgdmlld0FsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3JlJyk7XHJcblxyXG4gICAgY29uc3QgcmVuZGVyR29vZHMgPSAoZ29vZHMpID0+IHtcclxuICAgICAgICBjb25zdCBnb29kc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb25nLWdvb2RzLWxpc3QnKTtcclxuICAgICAgICBnb29kc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAgICAgZ29vZHMuZm9yRWFjaChnb29kID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZ29vZEJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGdvb2RCbG9jay5jbGFzc0xpc3QuYWRkKCdjb2wtbGctMycpO1xyXG4gICAgICAgICAgICBnb29kQmxvY2suY2xhc3NMaXN0LmFkZCgnY29sLXNtLTYnKTtcclxuICAgICAgICAgICAgZ29vZEJsb2NrLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvb2RzLWNhcmRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWwgJHtnb29kLmxhYmVsID8gbnVsbCA6ICdkLW5vbmUnfVwiPiR7Z29vZC5sYWJlbH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1kYi8ke2dvb2QuaW1nfSBhbHQ9JHtnb29kLm5hbWV9IGNsYXNzPVwiZ29vZHMtaW1hZ2VcIj5cclxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cImdvb2RzLXRpdGxlXCI+JHtnb29kLm5hbWV9PC9oMz5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJnb29kcy1kZXNjcmlwdGlvblwiPiR7Z29vZC5kZXNjcmlwdGlvbn08L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBnb29kcy1jYXJkLWJ0biBhZGQtdG8tY2FydFwiIGRhdGEtaWQ9JHtnb29kLmlkfT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbi1wcmljZVwiPiQke2dvb2QucHJpY2V9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgZ29vZHNDb250YWluZXIuYXBwZW5kKGdvb2RCbG9jayk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXREYXRhID0gKHZhbHVlLCBjYXRlZ29yeSkgPT4ge1xyXG4gICAgICAgIGZldGNoKCdodHRwczovL3Rlc3RkYi01ZWYxZC1kZWZhdWx0LXJ0ZGIuZXVyb3BlLXdlc3QxLmZpcmViYXNlZGF0YWJhc2UuYXBwL2RiLmpzb24nKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBhcnJheSA9IGRhdGEuZmlsdGVyKGl0ZW0gPT4gY2F0ZWdvcnkgPyBpdGVtW2NhdGVnb3J5XSA9PT0gdmFsdWUgOiBkYXRhKTsgLy8g0JfQsNC/0L7QvNC90Lgg0Y3RgtC+0YIg0L/RgNC40LXQvCFcclxuXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnb29kcycsIChKU09OLnN0cmluZ2lmeShhcnJheSkpKVxyXG5cclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSAhPT0gJy9nb29kcy5odG1sJykge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2dvb2RzLmh0bWwnXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJHb29kcyhhcnJheSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBsaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xyXG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtWYWx1ZSA9IGxpbmsudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gbGluay5kYXRhc2V0LmZpZWxkO1xyXG4gICAgICAgICAgICBnZXREYXRhKGxpbmtWYWx1ZSwgY2F0ZWdvcnkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGlmICh2aWV3QWxsKSB7XHJcbiAgICAgICAgdmlld0FsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdDtcclxuICAgIFxyXG4gICAgICAgICAgZ2V0RGF0YSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnb29kcycpICYmIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9nb29kcy5odG1sJykge1xyXG4gICAgICAgIHJlbmRlckdvb2RzKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dvb2RzJykpKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gc2VhcmNoKCkge1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWJsb2NrID4gaW5wdXQnKSxcclxuICAgICAgICAgIHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtYmxvY2sgPiBidXR0b24nKTtcclxuXHJcbiAgICBjb25zdCByZW5kZXJHb29kcyA9IChnb29kcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdvb2RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvbmctZ29vZHMtbGlzdCcpO1xyXG4gICAgICAgIGdvb2RzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICBnb29kcy5mb3JFYWNoKGdvb2QgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBnb29kQmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZ29vZEJsb2NrLmNsYXNzTGlzdC5hZGQoJ2NvbC1sZy0zJyk7XHJcbiAgICAgICAgICAgIGdvb2RCbG9jay5jbGFzc0xpc3QuYWRkKCdjb2wtc20tNicpO1xyXG4gICAgICAgICAgICBnb29kQmxvY2suaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ29vZHMtY2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbCAke2dvb2QubGFiZWwgPyBudWxsIDogJ2Qtbm9uZSd9XCI+JHtnb29kLmxhYmVsfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPWRiLyR7Z29vZC5pbWd9IGFsdD0ke2dvb2QubmFtZX0gY2xhc3M9XCJnb29kcy1pbWFnZVwiPlxyXG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwiZ29vZHMtdGl0bGVcIj4ke2dvb2QubmFtZX08L2gzPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImdvb2RzLWRlc2NyaXB0aW9uXCI+JHtnb29kLmRlc2NyaXB0aW9ufTwvcD5cclxuXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGdvb2RzLWNhcmQtYnRuIGFkZC10by1jYXJ0XCIgZGF0YS1pZD0ke2dvb2QuaWR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uLXByaWNlXCI+JCR7Z29vZC5wcmljZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgICAgICBnb29kc0NvbnRhaW5lci5hcHBlbmQoZ29vZEJsb2NrKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldERhdGEgPSAodmFsdWUpID0+IHtcclxuICAgICAgICBmZXRjaCgnaHR0cHM6Ly90ZXN0ZGItNWVmMWQtZGVmYXVsdC1ydGRiLmV1cm9wZS13ZXN0MS5maXJlYmFzZWRhdGFiYXNlLmFwcC9kYi5qc29uJylcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYXJyYXkgPSBkYXRhLmZpbHRlcihnb29kID0+IGdvb2QubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHZhbHVlLnRvTG93ZXJDYXNlKCkpKVxyXG5cclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2dvb2RzJywgKEpTT04uc3RyaW5naWZ5KGFycmF5KSkpXHJcblxyXG4gICAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICE9PSAnL2dvb2RzLmh0bWwnKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvZ29vZHMuaHRtbCdcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlbmRlckdvb2RzKGFycmF5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBnZXREYXRhKGlucHV0LnZhbHVlKTsgIFxyXG4gICAgfSlcclxufVxyXG5cclxuICAgICAgIiwiaW1wb3J0IHsgY2FydCB9IGZyb20gXCIuL21vZHVsZXMvY2FydFwiO1xyXG5pbXBvcnQgeyBnZXRHb29kcyB9IGZyb20gXCIuL21vZHVsZXMvZ2V0R29vZHNcIjtcclxuaW1wb3J0IHsgc2VhcmNoIH0gZnJvbSBcIi4vbW9kdWxlcy9zZWFyY2hcIjtcclxuXHJcbmNhcnQoKTtcclxuZ2V0R29vZHMoKTtcclxuc2VhcmNoKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///220\n')}},__webpack_exports__={};__webpack_modules__[220]()})();