const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    const reducer = (sumLikes, blog) => {
        return sumLikes + blog.likes
    }
    return blogs.reduce(reducer, 0)
}


const favoriteBlog = (blogs) => {
    let maxLikes = -1
    let mostLikedPost = ''
    blogs.forEach((blog) => {
        if (blog.likes > maxLikes) {
            mostLikedPost = blog
            maxLikes = blog.likes
        }

    })
    if (maxLikes == -1) {
        return null
    }
    else {
        const temp_blog = {
            'title': mostLikedPost.title,
            'author': mostLikedPost.author,
            'likes': mostLikedPost.likes
        }
        return temp_blog
    }


}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}