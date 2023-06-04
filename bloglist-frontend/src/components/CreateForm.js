import PropTypes from 'prop-types'

const CreateForm = ({
  handleSubmit,
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  url,
  handleUrlChange
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>title:<input
          type='text'
          value={title}
          name='title'
          onChange={handleTitleChange}
        /></div>
        <div>author:<input
          type='text'
          value={author}
          name='author'
          onChange={handleAuthorChange}
        /></div>
        <div>url:<input
          type='text'
          value={url}
          name='url'
          onChange={handleUrlChange}
        /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  handleUrlChange: PropTypes.func.isRequired
}

export default CreateForm