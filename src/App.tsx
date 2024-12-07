// src/App.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { setCurrentPage } from './slices/paginationSlice';
import Pagination from './features/pagination/Pagination';
import JellyBeanList from './components/JellyBeanList';
import { setJellyBeanData } from "./slices/jellyBeanMainDataSlice";
import axios from "axios";


const App: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage, totalItems } = useSelector(
    (state: RootState) => state.pagination
  );
  const { myData } = useSelector(
    (state: RootState) => state.jellyBeanData
  );

  const totalPages = Math.ceil(myData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = myData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/data");
        const { items } = response.data;        
        dispatch(setJellyBeanData(items));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);


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
