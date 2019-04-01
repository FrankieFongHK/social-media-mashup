function include(file) {
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;

    document.getElementsByTagName('head').item(0).appendChild(script);
}

function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

include('js/timeago.min.js');

var flickrResponse = function () {
    getRecentPosts().then(function(flickrArticles) {
        console.log('flickrResponse: %o', flickrArticles);
        var item_width = $('.bricks-wrapper').width() * 0.23;
        flickrArticles.map(function(article) {
            var title = article["title"];
            var url = article["url"];
            var thumbnail = article["thumbnail"];
            var description = article["description"];
            var post_date = article["post_date"] * 1000;
            var img_height = article["img_height"];
            var img_width = article["img_width"];
            var measure_width = item_width / img_width * img_height;
            console.log('flickr: ' + item_width + '/' + img_width + '*' + img_height);

            const content = '<article class="grid-item entry format-standard">' +
                '<div class="entry-thumb">' +
                '<a href="' + url + '" class="thumb-link" target="_blank">' +
                '<img src="' + thumbnail + '" style="width: 100%;" alt="' + title + '">' +
                '</a>' +
                '<div class="ssk-group" data-url="' + url + '">'+
                    '<a href="" class="ssk ssk-facebook"></a>' +
                    '<a href="" class="ssk ssk-twitter"></a>' +
                    '<a href="" class="ssk ssk-google-plus"></a>' +
                    '<a href="" class="ssk ssk-pinterest"></a>' +
                    '<a href="" class="ssk ssk-tumblr"></a>' +
                    '<a href="" class="ssk ssk-email"></a>' +
                '</div>' +
                '</div>' +
                '<div class="entry-text">' +
                '<div class="entry-header">' +
                '<h1 class="entry-title"><a href="' + url + '" target="_blank">' + title + '</a></h1>' +
                '</div>' +
                '<div class="entry-excerpt">' +
                description +
                '</div>' +
                '</div>' +
                '<div class="entry-info flickr">' +
                '<img class="article-icon" src="images/ic-flickr.png" /> <span style="text-decoration:underline;">Posted</span> <b>' + timeago.format(post_date) + '</b>' +
                '</div>' +
                '</article>';

            $('.bricks-wrapper').append(content).masonry('layout');
            $('.bricks-wrapper').masonry("reloadItems").masonry("layout");

            SocialShareKit.init({ reinitialize: true });
        });
        $('.bricks-wrapper').imagesLoaded().progress(function () {
            $('.bricks-wrapper').masonry('layout');
        });
    });
};

var facebookRes = function (articles) {
    console.log(articles);
    articles.map(post => {
        var content = '<article class="grid-item entry format-standard facebook">' +
            '<div id="fb-embed-' + post.id + '" class="entry-thumb facebook">' +
            '<fb:post id="fb-rendered-' + post.id + '" href="' + post['url'] + '" ></fb:post>' +
            '</div>' +
            '<div class="entry-info facebook">' +
            '<img class="article-icon" src="images/ic-facebook.png" /> <span style="text-decoration:underline;">Posted</span> <b>' + timeago.format(post['post_date']) + '</b>' +
            '</div>'
        '</article>';
        $('.bricks-wrapper').append(content).masonry('layout');

        console.log('width: ' + $('#fb-embed-' + post.id).width());
        //$('#fb-rendered-' + post.id).attr("data-width", $('#fb-embed-' + post.id).width());
        FB.XFBML.parse(document.getElementById('fb-embed-' + post.id), function(){
            $('.bricks-wrapper').masonry("reloadItems").masonry("layout");
        });
    });
    $('.bricks-wrapper').imagesLoaded().progress(function () {
        console.log("imagesLoaded @@@@@");
        $('.bricks-wrapper').masonry('layout');
    });
};

var facebookResponse = function () {
    getFacebookPosts(facebookRes);
};

function youtubeResponse() {
    searchYoutubePost().then(articles => {
        console.log('youtubeResponse: %o', articles);
        var item_width = $('.bricks-wrapper').width() * 0.23;
        articles.map(article => {
            console.log(article);
            var title = article["title"];
            var description = article["description"];
            var thumbnail = article["thumbnail"];
            var url = article["url"];
            var post_date = article["post_date"];
            var img_height = article["height"];
            var img_width = article["width"];
            var measure_width = item_width / img_width * img_height;

            let content = '<article class="grid-item entry format-video">' +
                '<div class="entry-thumb video-image">' +
                '<a href="' + url + '" data-lity>' +
                '<img src="' + thumbnail + '" style="alt="' + title + '">' +
                '</a>' +
                '<div class="ssk-group" data-url="' + url + '">'+
                    '<a href="" class="ssk ssk-facebook"></a>' +
                    '<a href="" class="ssk ssk-twitter"></a>' +
                    '<a href="" class="ssk ssk-google-plus"></a>' +
                    '<a href="" class="ssk ssk-pinterest"></a>' +
                    '<a href="" class="ssk ssk-tumblr"></a>' +
                    '<a href="" class="ssk ssk-email"></a>' +
                '</div>' +
                '</div>' +
                '<div class="entry-text">' +
                '<div class="entry-header">' +
                '<h1 class="entry-title"><a href="' + url + '" target="_blank">' + title + '</a></h1>' +
                '</div>' +
                '<div class="entry-excerpt">' +
                description +
                '</div>' +
                '</div>' +
                '<div class="entry-info youtube">' +
                '<img class="article-icon" src="images/ic-youtube.png" /> <span style="text-decoration:underline;">Posted</span> <b>' + timeago.format(post_date) + '</b>' +
                '</div>' +
                '</article>';

            $('.bricks-wrapper').append(content).masonry('layout');
            $('.bricks-wrapper').masonry("reloadItems").masonry("layout");

            SocialShareKit.init({ reinitialize: true });
        })

    });
    $('.bricks-wrapper').imagesLoaded().progress(function () {
        $('.bricks-wrapper').masonry('layout');
    });
}

function tumblrResponse() {
    var item_width = $('.bricks-wrapper').width() * 0.23;
    getThumblrPost().then(articles => {
        articles.map(article => {
            var url = article["url"];
            var thumbnail = article["thumbnail"];
            var description = article["description"];
            var post_date = article["post_date"] * 1000;
            var type = article['type'];
            var img_height = article["img_height"];
            var img_width = article["img_width"];
            var measure_width = item_width / img_width * img_height;

            let content = '<article class="grid-item entry format-standard">' +
                '<div class="entry-thumb">';
                if(thumbnail) {
                    content += '<a href="' + url + '" class="thumb-link" target="_blank">' +
                    '<img src="' + thumbnail + '" alt="' + description + '">' +
                    '</a>';
                }
                content += '<div class="ssk-group" data-url="' + url + '">'+
                                '<a href="" class="ssk ssk-facebook"></a>' +
                                '<a href="" class="ssk ssk-twitter"></a>' +
                                '<a href="" class="ssk ssk-google-plus"></a>' +
                                '<a href="" class="ssk ssk-pinterest"></a>' +
                                '<a href="" class="ssk ssk-tumblr"></a>' +
                                '<a href="" class="ssk ssk-email"></a>' +
                            '</div>' +
                '</div>' +
                '<div class="entry-text">' +
                '<div class="entry-header">' +
                //'<h1 class="entry-title"><a href="' + url + '" target="_blank">' + title + '</a></h1>' +
                '</div>' +
                '<div class="entry-excerpt">' +
                description +
                '</div>' +
                '</div>' +
                '<div class="entry-info tumblr">' +
                '<img class="article-icon" src="images/ic-tumblr.png" /> <span style="text-decoration:underline;">Posted</span> <b>' + timeago.format(post_date) + '</b>' +
                '</div>' +
                '</article>';

            $('.bricks-wrapper').append(content).masonry('layout');
            $('.bricks-wrapper').masonry("reloadItems").masonry("layout");

            SocialShareKit.init({ reinitialize: true });
        });
    });
    $('.bricks-wrapper').imagesLoaded().progress(function () {
        $('.bricks-wrapper').masonry('layout');
    });

}

function apiGetAll() {
    loadScript('js/facebook-api.js', facebookResponse);
    loadScript('js/flickr-api.js', flickrResponse);
    loadScript('js/youtube-api.js', youtubeResponse);
    loadScript('js/tumblr-api.js', tumblrResponse);
}
