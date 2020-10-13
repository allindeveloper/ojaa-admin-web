import React from 'react';
import _ from 'lodash'
import { Paper } from '@material-ui/core';

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
 

 
class PaginationX extends React.Component {
    constructor(props) {
        super(props);
        this.sortFunc=this.sortFunc.bind(this);
        this.state = { pager: {},totalPages:this.props.totalPages,totalItems:this.props.totalItems,pageSize:10,searching:false,searchData:{}};
    }
 
    componentWillMount() {
        // set page if items array isn't empty
        if ( this.props.searchData !== '') {
            this.setPage(1);
        }
    }
 
    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (! _.isEqual(this.props.searchData,this.state.searchData)) {
            this.setPage(1);
        }
    }
    
    sortFunc(data){
    return data.sort((a, b)=>{
        if (a.Name ===undefined) {
            return 0;
        }
        var nameA = a.Name.toUpperCase();
        var nameB = b.Name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
          return 0;
    }) 
    }
    setPage(page) {

       if (this.state.searching === true) {
        return;
       }

       if (page > 1  && this.state.pager.currentPage === page) {
                return;
       }

       this.props.onNewPageRequest();
       var searchDataNew={...this.props.searchData};
       var searchData={...this.props.searchData};
       this.setState({searchData:searchDataNew});
       searchData.page=page;
       var data;
       this.setState({searching:true});
      // data=call api with search data
      this.props.service(this.props.controller,this.props.action,page).then(res=>{
           // console.log('back from search')
            var pager = this.state.pager;
            if (!Array.isArray(res.data)) {

                 //if (res.headers['x-pagination']) {
                // const serverPagination=JSON.parse(res.headers['x-pagination']);
                //             this.setState({totalItems:serverPagination.totalCount,totalPages:serverPagination.totalPages});
                // }
                this.setState({totalPages:res.data.pages})
 
                    if (page < 1 || (pager.totalPages !==0 && page > pager.totalPages) ) {
                        return;
                    }
                        // get new pager object for specified pppage
                pager = this.getPager(this.state.totalPages, page);
                // update state
                this.setState({ pager: pager });
         
                // call change page function in parent component
                setTimeout(()=>{
                    this.setState({searching:false})
                    this.props.onChangePage([],pager);
                },1000)
            }
            if (page > 2) {
                data=res.data.orders.map((item,index)=>{item.no= (1+index) +((page-1) * this.state.pageSize); return item});
            }
            else if(page ===2){
                data=res.data.orders.map((item,index)=>{item.no= 1+index + this.state.pageSize; return item});
                
            }
            else{
                data=res.data.orders.map((item,index)=>{item.no= ++index ; return item});
            }
             
            // if (res.headers['x-pagination']) {
            //     const serverPagination=JSON.parse(res.headers['x-pagination']);
            //                 this.setState({totalItems:serverPagination.totalCount,totalPages:serverPagination.totalPages});
            //             }
            this.setState({totalPages:res.data.pages})
        if (page < 1 || (pager.totalPages !==0 && page > pager.totalPages) ) {
            return;
        }
        
        // get new pager object for specified pppage
        pager = this.getPager(this.state.totalPages, page);
        
        
 
        // update state
        this.setState({ pager: pager });
 
        // call change page function in parent component
        setTimeout(()=>{
            this.setState({searching:false})
            this.props.onChangePage(data,pager);
        },1000)
        
      }).catch(err=>{});
      

    
    }
 
    getPager(totalPages, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
 
        // default page size is 10
        pageSize = pageSize || this.state.pageSize;
 
        // calculate total pages
        //var totalPages = this.props.totalPages;
 
        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, this.state.totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);
 
        // return object with all pager properties required by the view
        return {
            totalItems: this.state.totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
 
    render() {
        var pager = this.state.pager;
 
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page 
            return null;
        }
 
        return (
            
            <ul className="pagination  pull-right m-b-0"  style={{cursor:"pointer",boxShadow:"0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)"}}>
                <li className={pager.currentPage === 1 ? 'page-item disabled hidden-xs' : 'page-item hidden-xs'}>
                    <a onClick={() => this.setPage(1)} className="page-link">First</a>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled page-item' : 'page-item'}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)} className="page-link">Previous</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'active hidden-xs page-item' : 'hidden-xs page-item'}>
                        <a onClick={() => this.setPage(page)} className="page-link">{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled page-item' : 'page-item'}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)} className="page-link">Next</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled hidden-xs page-item' : 'hidden-xs page-item'}>
                    <a onClick={() => this.setPage(pager.totalPages)} className="page-link">Last</a>
                </li>
            </ul>
           
        );
    }
}

export default PaginationX;
