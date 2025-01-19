import { useEffect,useState } from "react";
import {MENU_API} from '../Utils/constants';

const useRestaurantMenu = (resId) => {

  const [resInfo,setResInfo] = useState(null);
  
   useEffect(()=>{
     fetchMenu();
   },[]);

  const fetchMenu = async () => {
    const data = await fetch(`https://food-matrix-backend.onrender.com/api/menu/${resId}`);
    const json = await data.json();
    console.log(resInfo);
    setResInfo(json);
  }
  return resInfo;
}

export default useRestaurantMenu;
