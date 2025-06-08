const BookmarkRow = ({ bookmark, onDeleteClick, isEditing, onEditClick, onCancelClick, onUpdateClick, onTitleChange, editTitle }) => {
    const { id, title, url } = bookmark;

    return (
        <tr>
            {!isEditing ? <td>{title}</td> :
                (<td>
                    <input type="text" className="form-control" placeholder="title" onChange={e => onTitleChange(id, e.target.value)} value={editTitle.title} />
                </td>)}
            <td>
                <a href={url} target="_blank">{url}</a>
            </td>
            <td>
                {!isEditing && <button className="btn btn-success" onClick={() => onEditClick(id)}>Edit Title</button>}
                {isEditing && (
                    <>
                        <button className="btn btn-warning" onClick={() => onUpdateClick(id)}>Update</button>
                        <button className="btn btn-info" onClick={() => onCancelClick(id)}>Cancel</button>
                    </>)}
                <button className="btn btn-danger" onClick={() => onDeleteClick(id)} style={{ marginLeft: 10 }}>Delete</button>
            </td>
        </tr>
    )
}

export default BookmarkRow;