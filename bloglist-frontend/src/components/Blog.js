import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailVisible, setDetailVisible] = useState(false)

  const showWhenDetailVisible = { display: detailVisible ? '' : 'none' }
  const buttonText = detailVisible ? 'hide' : 'view'

  const toggleDetailVisible = () => {
    setDetailVisible(!detailVisible)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleDetailVisible}>{buttonText}</button>
      <div style={showWhenDetailVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={() => handleLike(blog)}>like</button></div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog