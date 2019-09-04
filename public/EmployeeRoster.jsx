 
var EmployeesAll = React.createClass({ 

  getInitialState: function () {
    return { name: '' ,address: '',email:'',phone:'',id:'',job:'',salary:'',Buttontxt:'Save', data1: [] };
  },
   handleChange: function(e) {
        this.setState({[e.target.name]: e.target.value});
    },

  componentDidMount() {
 
    $.ajax({
       url: "api/getdata",
       type: "GET",
       dataType: 'json',
       ContentType: 'application/json',
       success: function(data) {         
         this.setState({data1: data}); 
         console.log("success"); 
         
       }.bind(this),
       error: function(jqXHR) {
         console.log(jqXHR);
           
       }.bind(this)
    });
  },
  
DeleteData(id){
  var employeeDelete = {
        'id': id
    };      
    $.ajax({
      url: "/api/Removedata/",
      dataType: 'json',
      type: 'POST',
      data: employeeDelete,
      success: function(data) {
        alert(data.data);
         this.componentDidMount();

      }.bind(this),
      error: function(xhr, status, err) {
         alert(err); 
           
          
      }.bind(this),
      });
    },
 


    EditData(item){         
      this.setState({name: item.name,address:item.address,phone:item.phone,email:item.email,job:item.job,salary:item.salary,id:item.rowid,Buttontxt:'Update'});
     },

   handleClick: function() {
 
   var Url="";
   if(this.state.Buttontxt=="Save"){
      Url="/api/savedata";
       }
      else{
      Url="/api/Updatedata";
      }
      
      var employeeData = {
        'name': this.state.name,
        'address':this.state.address,
        'email':this.state.email,
        'phone':this.state.phone,
        'job':this.state.job,
        'salary':this.state.salary,
        'id':this.state.id,
      }

    $.ajax({
      url: Url,
      dataType: 'json',
      type: 'POST',
      data: employeeData,
      success: function(data) {       
          alert(data.data);       
          this.setState(this.getInitialState());
          this.componentDidMount();
         
      }.bind(this),
      error: function(xhr, status, err) {
         alert(err);     
      }.bind(this)
    });
  },

  typeSearch: function() {

   let word = document.getElementById("keyword").value;
   var Url="/api/Searchdata";
      
   var searchData = {
      'keyword': word,
    }

    $.ajax({
      url: Url,
      dataType: 'json',
      type: 'POST',
      data: searchData,
      success: function(data) {    
          this.setState({data1: data});         
      }.bind(this),
      error: function(xhr, status, err) {
         alert(err);     
      }.bind(this)
    });
  },

  render: function() {
    return ( 
      <div>
       <p><b> Employee Roster </b></p>
  <form>
    <div> 
  <table>
     <tbody>
    <tr>
      <td><b>Name</b></td>
      <td>
         <input type="text" value={this.state.name}    name="name" onChange={ this.handleChange } />
          <input type="hidden" value={this.state.rowid}    name="id"  />
      </td>
    </tr>

    <tr>
      <td><b>Address</b></td>
      <td>
      <input type="text" value={this.state.address}  name="address" onChange={ this.handleChange } />
      </td>
    </tr>

    <tr>
      <td><b>Email</b></td>
      <td>
        <input type="text"  value={this.state.email}  name="email" onChange={ this.handleChange } />
      </td>
    </tr>


    <tr>
      <td><b>Phone</b></td>
      <td>
        <input type="text" value={this.state.phone}  name="phone" onChange={ this.handleChange } />
      </td>
    </tr>

    <tr>
      <td><b>Job</b></td>
      <td>
        <input type="text" value={this.state.job}  name="job" onChange={ this.handleChange } />
      </td>
    </tr>

    <tr>
      <td><b>Salary</b></td>
      <td>
        <input type="text" value={this.state.salary}  name="salary" onChange={ this.handleChange } />
      </td>
    </tr>

    <tr>
      <td></td>
      <td>
        <input type="button" value={this.state.Buttontxt} onClick={this.handleClick} />
      </td>
    </tr>

 </tbody>
    </table>
</div>
 
<br/>
<input type="text" id="keyword" placeholder="free search" onChange={this.typeSearch} />
<br/>
<span className="sorttext">(click on headers to sort)</span>
<br/>

<div>
 
 <table className="sortable" id="rosterTbl">
  <tbody>
     <tr>
      <th><b>NAME</b></th>
      <th><b>ADDRESS</b></th>
      <th><b>EMAIL</b></th>
      <th><b>PHONE</b></th>
      <th><b>JOB</b></th>
      <th><b>SALARY</b></th>
      <th className="sorttable_nosort"><b>Edit</b></th>
      <th className="sorttable_nosort"><b>Delete</b></th>
    </tr>

    {this.state.data1.map((item, index) => (
        <tr key={index}>
            <td>{item.name}</td>                      
            <td>{item.address}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.job}</td>
            <td>{item.salary}</td>
            <td> 
              <button type="button" onClick={(e) => {this.EditData(item)}}>Edit</button>    
            </td> 
            <td> 
               <button type="button" onClick={(e) => {this.DeleteData(item.rowid)}}>Delete</button>
            </td> 
        </tr>
    ))}
    </tbody>
    </table>
     </div>
</form>        
      </div>
    );
  }
});

ReactDOM.render(<EmployeesAll  />, document.getElementById('root'))