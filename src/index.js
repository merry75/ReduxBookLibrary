import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const api = 'AIzaSyCFiak4uDmbpCICUGwvDKUPy0GRVvR1sSY';


class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
			 };

			 this.videoSearch('top prank 2017');
	}

	videoSearch(term) {
		YTSearch({key: api, term: term}, (data) => {
			this.setState({ 
				videos: data,
				selectedVideo: data[0]
			});
		});		
	}


	render() {

	const videoSearchL =  _.debounce((term) => { this.videoSearch(term) }, 800);

	return (
	<div>
		<SearchBar onSearchTermChange={ videoSearchL }/>
		<VideoDetail video={this.state.selectedVideo} />
		<VideoList 
		onVideoSelect={(video) => this.setState({selectedVideo: video})}
		videos={this.state.videos} />
	</div>
	);
 }
}

ReactDOM.render(<App />, document.querySelector('.container'));