var catCounts = {};
var catImages = $('#cats-container').children('img');
var element;
var countElement;

for (i = 0; i < catImages.length; i++) {
    element = catImages[i];
    elementId = "cat-pic-" + (i + 1);
    element.id = elementId;
    element.classList.add('cat-pic');
    element.classList.add('hide');

    countElement = document.createElement('h2');
    countElement.id = 'count-' + elementId;
    countElement.innerText = element.id + " count: 0";
    countElement.classList.add('hide');

    listElement = document.createElement('li');
    listElement.id = 'list-' + elementId;

    $('#count-container').append(countElement);

    listButtonElement = document.createElement('button');
    listButtonElement.type = 'button';
    listButtonElement.innerText = elementId;

    $('#count-container').append(listElement);
    $('#list-' + elementId).append(listButtonElement);
    $('#cats-list').append(listElement);

    catCounts[elementId] = 0;

}

function catButtonClick(e) {
    console.log('hi!');
    elementId = e.innerHTML;
    $countElement = $("#count-" + elementId);
    $imgElement = $("#" + elementId);

    if ($countElement.hasClass('hide')) {
        $countElement.removeClass('hide');
        $imgElement.removeClass('hide');

    } else {
        $countElement.addClass('hide');
        $imgElement.addClass('hide');
    }
}

function catClick(e) {
    catCounts[e.id]++;
    $countElement = $("#count-" + e.id);

    $countElement.text(e.id + " count: " + catCounts[e.id]);
}

function resetClicks(e) {
    for (i = 0; i < catImages.length; i++) {
        var id = catImages[i].id;
        catCounts[id] = 0;
        $countElement = $("#count-" + id);
        $countElement.text(id + " count: " + catCounts[id]);
    }
}

$('#cats-container').click(function (event) {
    catClick(event.target);
});

$('#cats-list').click(function (event) {
    catButtonClick(event.target);
});

$('#reset-button').click(function (event) {
    resetClicks(event.target);
});