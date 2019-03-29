function getFacebookPosts(callback) {
    FB.api(
        "/313446569319818/feed?date_format=U", "get", {
            fields: 'created_time, permalink_url',
            access_token: 'EAAQZBPcC4KB8BAA4sFh6zbHDgsQcY5wx05X98MsTJrsDRbZCdSiWpZCUfkVzJybuF3eRDvabZAGgwRgrJtct7dcibQu8qq3OoxGbUiiD0RlNdyZA0gANoSkhlR4cDZB2Q8WMurXhdXK5ZCAWvbJOKDRgmyTPYlZAYL5AHYXyoVZBOj320k6tpodbFQp03cGI2h3pIyAX0KjZAKSfrX61JdUpTg'
        },
        function (response) {
            if (response && !response.error) {
                console.log('@@ %o', response);
                var data = response.data;
                var posts = data.map(post => {
                    return {
                        url: post.permalink_url,
                        post_date: (post.created_time * 1000 + 60 * 60 * 8000),
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
