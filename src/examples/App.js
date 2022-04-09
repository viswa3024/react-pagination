import React, { useState, useMemo } from 'react';
import Pagination from '../Pagination';
import data from './data/mock-data.json';
import './style.scss';

//let PageSize = 10;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [PageSize, setPageChange] = useState(10);
  const [pageCount, setPageCount] = useState(10);

  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   return data.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage]);

  const pageChange = ({target: {value}}) => {
    if(value === ""){
      setPageCount(value);
      setPageChange(10);
      setCurrentPage(1);
    }else{
    if(isNaN(value)){
      if(value.toUpperCase() === "ALL" || value.toUpperCase() === "TOTAL"){
        let val = data.length;
        setPageChange(val);
        setPageCount(value);
        setCurrentPage(1);
      }else{
        setPageCount(value);
      }
    }else{
      let val = +value;
      if(val > data.length) {
        setPageChange(data.length);
        setPageCount(val);
        setCurrentPage(1);
      }else{
        setPageChange(val);
        setPageCount(val);
        setCurrentPage(1);
      }
    }
  }
  };


  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;

  return (<>
    <div>
      <input type="text" name='PageSize' value={pageCount || ""} onChange={pageChange} />
      <label>{PageSize} out of {data.length}</label>
    </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(firstPageIndex, lastPageIndex).map(item => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}
