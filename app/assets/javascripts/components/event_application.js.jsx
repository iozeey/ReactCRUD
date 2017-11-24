var EventApplication = createReactClass({
	getInitialState: function() {
	    return{ 
	    	events: [],
	    	page: 1,
            pages: 0
	    };
 	},
	componentDidMount: function(){
		//this.getDataFromApi();
		this.getDataFromApi(this.state.page);
	},
	getDataFromApi: function(page){
		var self = this;
		$.ajax({
			url: '/api/events',
			data: { page: page },
			success: function(data){
				self.setState({ events: data.events, pages: parseInt(data.pages), page: parseInt(data.page) });
				// self.setState({events: data });
			},
			error: function(xhr, status, error){
				alert('Cannot Get data form API: ', error);
			}
		});
	},
	handleSearch: function(events) {
    	this.setState({ events: events });
  	},
  	handleAdd: function(event) {
	    var events = this.state.events;
	    events.push(event);
	    this.setState({ events: events });
  	},
  	handleDeleteRecord: function(event) {
	    var events = this.state.events.slice();
	    var index = events.indexOf(event);
	    events.splice(index, 1);
	    this.setState({ events: events });
  	},
  	handleUpdateRecord: function(old_event, event) {
	    var events = this.state.events.slice();
	    var index = events.indexOf(old_event);
	    events.splice(index, 1, event);
	    this.setState({ events: events });
  	},
  	handleChangePage: function(page) {
    	this.getDataFromApi(page);
  	},	
	render: function() {
    return(
      	<div className="container">
	        <div className="jumbotron">
	          <h1>ReactJS CRUD in Rails</h1>
	          <h2>by Zeeshan Ahmad</h2>
	        </div>
	        <div className="row">
		        <div className="col-md-4">
		         	<SearchForm handleSearch={this.handleSearch}/>
		        </div>
		        <div className="col-md-8">
	          		<NewForm handleAdd={this.handleAdd} />
	        	</div>
	      	</div>
	        <div className="row">
	        	<div className="col-md-12">
					<EventTable events={this.state.events}
							    handleDeleteRecord={this.handleDeleteRecord}
							    handleUpdateRecord={this.handleUpdateRecord} />
					</div>
	        </div>
	        <div className="col-md-12">
	        	<Pagination page={this.state.page}
	                    	pages={this.state.pages}
	                    	handleChangePage={this.handleChangePage} />
	      	</div>
      	</div>
    )
  }
});