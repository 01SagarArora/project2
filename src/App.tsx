// src/App.tsx
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { setCurrentPage } from './slices/paginationSlice';
import Pagination from './features/pagination/Pagination';
import JellyBeanList from './components/JellyBeanList';
import { fetchJellyBeanRequest } from './services/jellyBeanListRequest';
import { initStore } from "./app/store";

const App: React.FC = () => {


  // const store = useMemo(() => {
  //   return initStore();
  // }, []);

  const dispatch = useDispatch();
  const { currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.pagination
  );


  const { myData = [] } = useSelector(
    (state: RootState) => state.jellyBeanData
  );

  // useEffect(() => {
  //   const fetchData = () => {
  //     try {
  //       fetchJellyBeanRequest(dispatch, store);
  //     } catch (err: any) {
  //       console.log('error')
  //     }
  //   };
  //   fetchData();
  // }, [dispatch, store]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const totalPages = Math.ceil(myData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = myData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="App">
      <h1>Jelly Bean List</h1>
      <JellyBeanList items={currentItems} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;