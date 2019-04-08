function getRedditPost() {
    var keyword = "food";
    var url = new URL(location.href);
    var s = url.searchParams.get("s");
    if (s) {
        keyword = s;
    }
    return fetch("https://www.reddit.com/search.json?q=" + keyword + "&sort=new&limit=5", {
        mode: 'cors'
    }).then(function(resp) {
        return resp.json();
    }).then(function(data) {
        var articles = data.data.children;
        console.log('Reddit posts: %o', articles);
        return articles.map(function(a) {
            var article = a.data;
            var result = {
                url: "https://www.reddit.com" + article['permalink'],
                post_date: article['created_utc'],
                description: article['selftext'],
                title: article['title']
            };

            if (article['domain'] == "youtube" || article['domain'] == "youtu.be" || article['domain'] == "youtube.com") {
                result['videoUrl'] = article['url'];
            }

            if (article['thumbnail'] && article['thumbnail'] != 'self') {
                console.log(article['thumbnail']);
                if (article['preview']) {
                    var resolutions = article['preview']['images'][0]['resolutions'];
                    if (resolutions.length > 1) {
                        result['thumbnail'] = resolutions[parseInt(resolutions.length / 2) - 1]['url'];
                    } else {
                        result['thumbnail'] = resolutions[0]['url'];
                    }
                } else {
                    if (article['thumbnail'].includes(".jpg") || article['thumbnail'].includes(".jpeg") || article['thumbnail'].includes(".png")) {
                        result['thumbnail'] = article['thumbnail'];
                    }
                }

            }

            return result;
        });

    });
}
