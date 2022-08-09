import React from 'react'


const BlogForm = ({ blogTitle,
    setBlogTitle,
    blogAuthor,
    setBlogAuthor,
    blogUrl,
    setBlogUrl,
    handleCreateBlog,
    handleCancelBlog }) => {



    return (

        <form onSubmit={handleCreateBlog}>

            <div>
                Title: <input type="text"
                    value={blogTitle}
                    name="blogTitle"
                    placeholder='input blog title here'
                    onChange={({ target }) => { setBlogTitle(target.value) }} />
            </div>
            <div>
                Author: <input type='text'
                    value={blogAuthor}
                    name='blogAuthor'
                    placeholder='input blog author here'
                    onChange={({ target }) => { setBlogAuthor(target.value) }} />
            </div>

            <div>
                URL: <input type='text'
                    value={blogUrl}
                    name='blogUrl'
                    placeholder='input blog url here'
                    onChange={({ target }) => { setBlogUrl(target.value) }} />
            </div>

            <button type='submit'>Create</button>
            <button type='button' onClick={handleCancelBlog}>Cancel</button>
        </form>
    )


}




export default BlogForm