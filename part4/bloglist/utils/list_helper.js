const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    if (!blogs) {
        return 0;
    }
    else {
        return blogs.reduce((prev, cur) => {
            // console.log(`prev: ${prev}, cur: ${cur}`);
            return prev + cur.likes;
        }, 0);
    }
};

const favoriteBlog = (blogs) => {
    if (!blogs) return undefined;
    let result;
    let maxLike = -1;
    blogs.forEach((each) => {
        if (each.likes > maxLike) {
            result = {title: each.title, author: each.author, likes: each.likes};
            maxLike = each.likes;
        }
    });
    return result;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}