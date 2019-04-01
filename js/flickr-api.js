async function getRecentPosts(){
	return await fetch("https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=food&accuracy=1&sort=date-posted-desc&safe_search=3&api_key=68a8deb4aba077832d5670bc7f2f361f&per_page=5&format=json&nojsoncallback=1", {
		mode: 'cors'
	}).then(function(resp){
		return resp.json();
	}).then(async function (data) {
        var photos = data.photos.photo;
        console.log('Flickr getRecentPosts: %o', photos);


            return await Promise.all(photos.map(async function(photo) {
            var article = {title: photo.title, platform: "flickr"};

            var photo_id = photo.id;
            await getPhotoInfo(photo_id).then(function(photo_info) {
                console.log(photo_id + "photoinfo");
                article["post_date"] = photo_info.dateuploaded;
                article["url"] = photo_info.urls.url[0]._content;
								article["description"] = photo_info.description._content;
            });

            await getPhotoSize(photo_id, 'Medium').then(function(photo_size) {
								if(photo_size){
									if(photo_size.source){
										article["thumbnail"] = photo_size.source;
									}else{
										article["thumbnail"] = 'images/no-image.png';
									}
									article["img_width"] = photo_size.width;
									article["img_height"] = photo_size.height;
								}else{
									article["thumbnail"] = 'images/no-image.png';
								}
            });

            return article;
        }));
    });
}

async function getPhotoInfo(photo_id){
	return await fetch("https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=68a8deb4aba077832d5670bc7f2f361f&per_page=10&format=json&nojsoncallback=1&photo_id=" + photo_id, {
		mode: 'cors'
	}).then(function(resp){
		return resp.json();
	}).then(function(data){
		var photo = data.photo
		//console.log('getPhotoInfo: %o', data.photo);
		return photo
	});
}

async function getPhotoSize(photo_id, size) {
	return await fetch("https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=68a8deb4aba077832d5670bc7f2f361f&per_page=10&format=json&nojsoncallback=1&photo_id=" + photo_id, {
		mode: 'cors'
	}).then(function(resp){
		return resp.json();
	}).then(function(data){
		var photo_sizes = data.sizes.size
		console.log('getPhotoSize: %o', photo_sizes);
		var result = photo_sizes.find(function(item, index, array){return item.label == size;});
		if(!result) {
			result = photo_sizes.find(function(item, index, array){return item.label == "Original";});
		}
		return result;
	});
}
