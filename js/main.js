$(function () {

    var model = {

        cats: [],
        currentCat: {},
        getCatByName: function (catName) {
            return this.cats.find(function (cat) {
                return cat.name === catName;
            })
        },
        getAllCats: function () {
            return this.cats;
        },
        getCurrentCat: function () {
            return this.currentCat;
        },
        setCurrentCat: function (catName) {
            var existingCat = this.getCatByName(catName);

            this.currentCat = existingCat;
        },
        saveCat: function (cat) {
            var existingCat = model.cats.find(function (existingCat) {
                return existingCat.id == cat.id;
            });

            existingCat = cat;
        },
        addCat: function(cat) {
            this.cats.push(cat);
        }


    };

    var controller = {

        init: function () {
            view.init();
        },
        getAllCats: function () {
            return model.getAllCats()
        },
        getCurrentCat: function () {
            return model.getCurrentCat();
        },
        getCatByName: function (catName) {
            return model.getCatByName(catName);
        },
        setCurrentCat: function (catName) {
            model.setCurrentCat(catName);
        },
        addCat: function(cat) {
            model.addCat(cat);
        },
        saveCat: function (cat) {
            model.saveCat(cat);
        }

    };

    var view = {

        init: function () {
            this.cats = controller.getAllCats();
            this.$buttonsContainer = $('#cats-buttons');
            this.$adminButtonsContainer = $('#admin-buttons');
            this.$catsContainer = $('#cats-container');
            this.currentCat = controller.getCurrentCat();
            
            // on first page load render first cat
            controller.setCurrentCat(this.cats[0].name);

            // render all added cats
            controller.getAllCats().forEach(function (cat) {

                // create buttons list for each cat
                var buttonElem = document.createElement('button');
                buttonElem.type = 'button';
                buttonElem.innerText = cat.name;

                view.$buttonsContainer.append(buttonElem);

            });

            // create container for current cat
            cat = controller.getCurrentCat();

            var catDiv = document.createElement('div');
            catDiv.id = 'cat-div';

            var nameElem = document.createElement('h2');
            nameElem.id = 'cat-name';
            nameElem.innerText = 'Name: ' + cat.name;

            var countElem = document.createElement('h3');
            countElem.id = 'cat-count';
            countElem.innerText = 'Count: ' + cat.clickCount;

            var imageElem = document.createElement('img');
            imageElem.src = cat.imgUrl;
            imageElem.id = 'cat-img';

            view.$catsContainer.append(catDiv);

            // create admin form and fields
            var adminDiv = document.createElement('div');
            adminDiv.id = 'admin-div';

            // hide admin part on init
            adminDiv.classList.add('hide');

            var formDiv = document.createElement('form');
            formDiv.id = 'admin-form';

            var nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.name = 'cat-name';
            nameInput.value = cat.name;

            var imgUrlInput = document.createElement('input');
            imgUrlInput.type = 'text';
            imgUrlInput.name = 'cat-imgUrl';
            imgUrlInput.value = cat.imgUrl;

            var countInput = document.createElement('input');
            countInput.type = 'text';
            countInput.name = 'cat-count';
            countInput.value = cat.clickCount;

            var submitButton = document.createElement('button');
            submitButton.id = 'submit-button';
            submitButton.type = 'button';
            submitButton.name = 'save';
            submitButton.innerText = 'Save';

            formDiv.appendChild(document.createTextNode('Name: '));
            formDiv.appendChild(nameInput);

            formDiv.appendChild(document.createTextNode('Url: '));
            formDiv.appendChild(imgUrlInput);

            formDiv.appendChild(document.createTextNode('Count: '));
            formDiv.appendChild(countInput);

            formDiv.appendChild(submitButton);

            catDiv.appendChild(nameElem);
            catDiv.appendChild(countElem);
            catDiv.appendChild(imageElem);

            adminDiv.appendChild(formDiv);
            catDiv.appendChild(adminDiv);

            // add event listener to buttons to show/hide cats
            this.$buttonsContainer.click(function (e) {

                controller.setCurrentCat(e.target.innerText);

                view.render();
            });

            // add event listener to cat pics to increment count
            this.$catsContainer.click(function (e) {
                if (e.target.tagName == 'IMG') {
                    var cat = controller.getCatByName(view.currentCat.name)
                    cat.clickCount++;
                }

                view.render();
            });

            // add button to reset all cat counts
            var resetButton = document.createElement('button');
            resetButton.type = 'button';
            resetButton.id = 'reset-button';
            resetButton.innerText = 'Reset';

            this.$adminButtonsContainer.append(resetButton);

            // add event listener to reset-button to reset all counts
            $('#reset-button').click(function (e) {
                view.cats.forEach(function (cat) {
                    cat.clickCount = 0;
                });

                view.render();
            })

            // add button to show/hide admin details
            var adminButton = document.createElement('button');
            adminButton.type = 'button';
            adminButton.id = 'admin-button';
            adminButton.innerText = 'Admin';

            this.$adminButtonsContainer.append(adminButton);

            // add event listener to admin-button to show/hide admin area for cat
            var $adminDiv = $('#admin-div')
            var $adminButton = $('#admin-button');

            $adminButton.click(function (e) {
                if ($adminDiv.hasClass('hide')) {
                    $adminDiv.removeClass('hide')
                } else {
                    $adminDiv.addClass('hide');
                }

                view.render();
            });

            // add event listener to admin submit button to change cat data
            var $adminSubmit = $('#submit-button');

            $adminSubmit.click(function (e) {
                var cat = controller.getCurrentCat();
                cat.name = nameInput.value;
                cat.imgUrl = imgUrlInput.value;
                cat.clickCount = countInput.value;

                controller.saveCat(cat);

                view.render();
            })



            view.render();
        },

        render: function () {
            this.currentCat = controller.getCurrentCat();
            var cat = controller.getCurrentCat();
            var cats = controller.getAllCats();

            // render main details for cat
            var $catDivElem = $('#cats-container > div');
            //$catDivElem.attr('id', cat.name);
            $('#cat-name').text('Name: ' + cat.name);
            $('#cat-count').text('Count: ' + cat.clickCount);
            $('#cat-img').attr('src', cat.imgUrl);

            // render admin details for cat
            var $adminFormElements = $('#admin-form').children();
            $adminFormElements.filter('input[name=cat-name]').val(cat.name);
            $adminFormElements.filter('input[name=cat-imgUrl]').val(cat.imgUrl);
            $adminFormElements.filter('input[name=cat-count]').val(cat.clickCount);

            // refresh cat counts
            var $countElem = $('#cat-count');
            $countElem.text('Count: ' + cat.clickCount);

            // refresh buttons
            var catButtons = Array.prototype.slice.call(
                document.getElementById('cats-buttons')
                .querySelectorAll('button'));

            for (i = 0; i < cats.length; i++) {
                catButtons[i].innerText = cats[i].name;
            }

        }
    };

    // seed some cats
    model.addCat({
        id: 1,
        name: 'Alazzam',
        imgUrl: 'images/cat1.jpg',
        clickCount: 0
    });
    model.addCat({
        id: 2,
        name: 'Bruno',
        imgUrl: 'images/cat2.jpeg',
        clickCount: 0
    });
    model.addCat({
        id: 3,
        name: 'Coolio',
        imgUrl: 'images/cat3.jpg',
        clickCount: 0
    });

    controller.init();

});