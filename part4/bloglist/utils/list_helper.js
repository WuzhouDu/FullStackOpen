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
}

module.exports = {
    dummy,
    totalLikes,
}