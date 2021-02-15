import './tableView.scss';


const tableView = props => {
  return (
    <div className="table-view">
      <table>
          <thead className="heading">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              props.data.map((item, id) => {
                let {urlToImage, url, title, description} = item
                return (
                  <tr key={id} className="heading">
                    <td><img className="image" src={urlToImage} loading="lazy" alt={title}/></td>
                    <td>{title}</td>
                    <td>{description}.<a target="blank" href={url}> Read more</a></td>
                  </tr>
                )
              })
            }
          </tbody>
      </table>
    </div>
  )
}

export default tableView;
