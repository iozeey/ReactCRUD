var SearchForm = createReactClass({
    handleSearch: function() {
      // var query = document.getElementById("query").value;
      var query = ReactDOM.findDOMNode(this.refs.query).value;
      //var query = this.refs.query;
      //query.getValue();
      var self = this;
      $.ajax({
        url: '/api/events/search',
        data: { query: query },
        success: function(data) {
          self.props.handleSearch(data);
        },
        error: function(xhr, status, error) {
          alert('Search error: ', status, xhr, error);
        }
      });
    },
    render: function() {
      return(
        <input onChange={this.handleSearch}
           type="text"
           className="form-control"
           placeholder="Type search phrase here..."
           ref="query" />
      )
    }
});