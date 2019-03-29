function getFacebookPosts(callback) {
    FB.api(
        "/313446569319818/feed?date_format=U", "get", {
            fields: 'created_time, permalink_url',
            access_token: 'EAAQZBPcC4KB8BAOZAPeDDpo5GQPbkBTYDBsNEz7RKx1QmvkvTQdZBB0fsMI5lSu48hGBl09qCoaTqNrhnvr0ZBWls2DkZAa1A5qrU4ZAN0Wj8uKJ5HLxlcDbywb21ss0F8HvgRhzW6YWC9hyF3MvBs15GZBYN7v2JixiGtZBJJncsp2ljGEZAF1gp4lgG8o4FNlQZD'
        },
        function (response) {
            if (response && !response.error) {
                console.log('@@ %o', response);
                var data = response.data;
                var posts = data.map(post => {
                    return {
                        url: post.permalink_url,
                        post_date: (post.created_time * 1000),
                        id: post.id
                    }
                });
                callback(posts);
            } else {
                console.log(response.error);
            }
        }
    );
}
