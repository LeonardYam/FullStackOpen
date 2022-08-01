const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return {}

    return blogs.reduce((mostLikes, nextBlog) => {
        return mostLikes.likes > nextBlog.likes
            ? mostLikes
            : nextBlog
    }, blogs[0])
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return {}

    const authors = lodash.countBy(blogs, (blog) => blog.author)
    const mostBlogsPair = lodash.maxBy(lodash.toPairs(authors), pair => pair[1])

    return {
        author: mostBlogsPair[0],
        blogs: mostBlogsPair[1]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return {}

    const authors = lodash.groupBy(blogs, (blog) => blog.author)
    const authorsTotalLikes = lodash.mapValues(authors, (arrOfBlogs) => arrOfBlogs.reduce((sum, blog) => sum + blog.likes, 0)) 
    const mostLikesAuthor = lodash.maxBy(lodash.toPairs(authorsTotalLikes), pair => pair[1])

    return {
        author: mostLikesAuthor[0],
        likes: mostLikesAuthor[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}