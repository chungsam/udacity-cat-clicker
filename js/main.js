$(function () {

    var model = {

        cats: [],
        addCat: function (cat) {
            this.cats.push(cat);
        },
        getCat: function (catName) {
            return this.cats.find(function (cat) {
                return cat.name === catName;
            })
        },
        getAllCats: function () {
            return this.cats;
        }

    };

    var controller = {

        init: function () {
            view.init();
        },
        getAllCats: function () {
            return model.getAllCats()
        },
        getCat: function (catName) {
            return model.getCat(catName);
        },

        addCat: function (cat) {
            model.add(cat);
        }

    };

    var view = {

        init: function () {
            this.cats = controller.getAllCats();
            this.$buttonsContainer = $('#cats-buttons');
            this.$catsContainer = $('#cats-container');

            // render all added cats
            controller.getAllCats().forEach(function (cat) {

                // create buttons list for each cat
                var buttonElem = document.createElement('button');
                buttonElem.type = 'button';
                buttonElem.innerText = cat.name;

                var catDiv = document.createElement('div');
                catDiv.classList.add('hide');
                catDiv.id = cat.name;

                var nameElem = document.createElement('h2');
                nameElem.innerText = 'Name: ' + cat.name;

                var countElem = document.createElement('h3');
                countElem.innerText = 'Count: ' + cat.clickCount;

                var imageElem = document.createElement('img');
                imageElem.src = cat.imgUrl;
                imageElem.classList.add('cat-img');

                catDiv.appendChild(nameElem);
                catDiv.appendChild(countElem);
                catDiv.appendChild(imageElem);

                view.$buttonsContainer.append(buttonElem);
                view.$catsContainer.append(catDiv);

            });

            // add event listener to buttons to show/hide cats
            this.$buttonsContainer.click(function (e) {
                if (e.target.tagName == 'BUTTON') {
                    var $divElem = $('#' + e.target.innerText);

                    if ($divElem.hasClass('hide')) {
                        $divElem.removeClass('hide');

                    } else {
                        $divElem.addClass('hide');
                    }
                };
            });

            // add event listener to cat pics to increment count
            this.$catsContainer.click(function (e) {
                if (e.target.tagName == 'IMG') {
                    var cat = controller.getCat(e.target.parentElement.id)
                    cat.clickCount++;
                }
                
                view.render();
            });

            // add button to reset all cat counts
            var resetButton = document.createElement('button');
            resetButton.type = 'button';
            resetButton.id = 'reset-button';
            resetButton.innerText = 'Reset';


            this.$buttonsContainer.append(resetButton);
            $('#reset-button').click(function(e){
                view.cats.forEach(function(cat){
                    cat.clickCount = 0;
                });

                view.render();
            })

            view.render();
        },

        render: function () {
            // refresh cat counts
            view.cats.forEach(function (cat) {
                var $countElem = $('#' + cat.name + '>h3');
                $countElem.text('Count: ' + cat.clickCount);
            })
        }
    };

    model.addCat({
        name: 'Alazzam',
        imgUrl: 'images/cat1.jpg',
        clickCount: 0
    });
    model.addCat({
        name: 'Bruno',
        imgUrl: 'images/cat2.jpeg',
        clickCount: 0
    });
    model.addCat({
        name: 'Coolio',
        imgUrl: 'images/cat3.jpg',
        clickCount: 0
    });

    controller.init();

});