var catCounts = {};
var catImages = $('#cats-container').children('img');
var element;
var countElement;

for (i = 0; i < catImages.length; i++) {
    element = catImages[i];
    elementId = "cat-pic-" + (i + 1);
    element.id = elementId;

    element.classList.add('cat-pic');

    countElement = document.createElement('h2')
    countElement.id = 'count-' + elementId;
    countElement.innerText = element.id + " count: 0";

    catCounts[elementId] = 0;

    $('#count-container').append(countElement);
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

$('#reset-button').click(function (event) {
    resetClicks(event.target);
});