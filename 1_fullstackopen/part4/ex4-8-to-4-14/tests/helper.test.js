const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const multiple_blogs = [{
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
},
{
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
},
{
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
},
{
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
},

{
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0

},

{
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0

}
]



describe('total likes', () => {

    test('when list has multiple blogs, equals the likes of that', () => {
        const result = listHelper.totalLikes(multiple_blogs)
        expect(result).toBe(36)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
    test('when list has no blog, equals the likes of that', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

})

describe('top liked blog', () => {

    test('when list has multiple blogs, return the blog with most likes', () => {
        const result = listHelper.favoriteBlog(multiple_blogs)
        const expected_top_liked_blog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        }
        expect(result).toEqual(expected_top_liked_blog)
    })


})

describe('most blog by author', () => {

    test('when list has multiple blogs, return the author with the most blogs written and its count', () => {
        const result = listHelper.mostBlogs(multiple_blogs)

        const expected_top_author = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        expect(result).toEqual(expected_top_author)
    })


})


describe('most likes received by author', () => {

    test('when list has multiple blogs, return the author with the likes received by author and its total likes', () => {
        const result = listHelper.mostLikes(multiple_blogs)

        const expected_top_author_with_most_likes = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        expect(result).toEqual(expected_top_author_with_most_likes)
    })


})