import React, { PropTypes } from 'react';
import _ from 'lodash'
 

 
class Pagination extends React.Component {
    constructor(props) {
        super(props);
        // this.sortFunc=this.sortFunc.bind(this);
        this.state = { pager: {} };
    }
 
    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }
 
    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }
    
    sortFunc = (data) => {
    return data.sort((a, b)=>{
        if (a.Name ===undefined || a.Name===null) {
            return 0;
        }
        if (b.Name ===undefined || b.Name===null) {
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
    }
) 
}
    setPage(page) {
        let items = this.sortFunc(this.props.items).map((item,index)=>{const newItem={...item};newItem.no= ++index; return newItem});
        let pager = this.state.pager;
 
        if (page < 1 || page > pager.totalPages) {
            return;
        }
 
        // get new pager object for specified pppage
        pager = this.getPager(items.length, page);
 
        // get new page of items from items array
        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
 
        // update state
        this.setState({ pager: pager });
 
        // call change page function in parent component
        this.props.onChangePage(pageOfItems,pager);
    }
 
    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
 
        // default page size is 10
        pageSize = pageSize || 10;
 
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
 
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
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
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

        const {pager} = this.state;
 
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page 
            return null;
        }
 
        return (
            <ul className="pagination  pull-right">
                <li className={pager.currentPage === 1 ? 'disabled page-item hidden-xs ' : 'hidden-xs page-item'}>
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
                <li className={pager.currentPage === pager.totalPages ? 'disabled page-item hidden-xs' : 'hidden-xs page-item'}>
                    <a onClick={() => this.setPage(pager.totalPages)} className="page-link">Last</a>
                </li>
            </ul>
        );
    }
}
 

export default Pagination;
