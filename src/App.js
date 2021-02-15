import React from 'react'
import './App.scss'
import TableView from './components/tableView'
const API_KEY = '7d92cb6c68b84e74b8e4f769f01544d4'
const url = `http://newsapi.org/v2/everything?apiKey=${API_KEY}&`
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: [],
      q: '',
      invalidSearch: true,
      sortBy: 'publishedAt',
      fetchStatus: '',
    }
  }
  getData = () => {
    this.setState({ isLoading: false, fetchStatus: 'fetch'})
    let {sortBy, q} = this.state
    return new Promise (resolve => {
      let appendUrl = sortBy === 'none' ? `q=${q}` : `q=${q}&sortBy=${sortBy}`
      fetch (url + appendUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({tableData: data.articles, isLoading: true, fetchStatus: 'over'})
        resolve(data.data)        
      })
    })
  }

  change = (event) => {
    this.setState({q: event.target.value})
    if(event.target.value !== '') {
      this.setState({invalidSearch: false})
    } else {
      this.setState({invalidSearch: true})      
    }
  }
  reset = () => {
    if (this.state.q !== '') {
      this.getData()
    }
  }
  sort = (e) => {
    this.setState({sortBy: e.target.name}, () => {this.getData()})
  }
  render () {
    let {tableData, fetchStatus, invalidSearch, q} = this.state
    let btnStyle = {marginRight: '10px'}
    return (
      <div className="App">
        <div className='inline'>
          <div className="labelInput">
            Search News
          </div>
          <div className='inputDiv'>
            <input className="input" type="text" name="search" value={q} onChange={this.change} />
          </div>
          <div style={btnStyle}>
            <button 
              name="search"
              disabled={invalidSearch} onClick={this.reset} className="btn">Search</button>
          </div>
          <div style={btnStyle}>
            <button 
              name="publishedAt"
              disabled={invalidSearch} onClick={this.sort} className="btn">Sort by date</button>
          </div>
          <div style={btnStyle}>
            <button 
              name="relevancy"
              disabled={invalidSearch} onClick={this.sort} className="btn">Sort by relevance</button>
          </div>
          <div style={btnStyle}>
            <button 
              name="popularity"
              disabled={invalidSearch} onClick={this.sort} className="btn">Sort by popularity</button>
          </div>
          <div style={btnStyle}>
            <button 
              name="none"
              disabled={invalidSearch} 
              onClick={this.sort} className="btn">Sort by None</button>
          </div>
        </div> 
        {fetchStatus === 'over' ? TableView({data: tableData}) : fetchStatus === 'fetch' ? <div className="inline" style={{fontSize: '20px'}}>Searching the news...</div>: null}
      </div>
    )
  }
}

export default App
