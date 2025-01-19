import Card,{withStatus} from './Card'
import {useState, useEffect, useContext} from 'react'
import Shimmer from './Shimmer'
import useOnlineStatus from './useOnlineStatus'
import {Link} from 'react-router-dom'
import UserContext from '../Utils/UserContext'

const Body = () => {
  const [list,setList] = useState([]);
  const [filteredList,setFilteredList] = useState([]);
  const [searchText,setSearchText] = useState("");
  const WithStatusCard = withStatus(Card);
  const {loggedInUser, setUserName} = useContext(UserContext);


  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    const data = await fetch("https://food-matrix-backend.onrender.com/api/restaurant");
    const json = await data.json();
    setList(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredList(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  }

  const onlineStatus = useOnlineStatus();
  if(onlineStatus == false) {
    return <h1>Looks like you're offline!! Please check your online connection.</h1>
  }

  
  return list.length === 0 ? <Shimmer/> : (
    <div className="body">
      <div className = "filter flex items-center">
        
        <div className = "search m-4 p-4">
          <input type = "text" className = "search border border-solid m-4" value = {searchText} onChange = {(e) => {
            setSearchText(e.target.value);
          }}></input>
          
          <button className = "searchBtn px-2 py-1 bg-slate-200 rounded-md" onClick = {() => {
              const filteredList = list.filter((res) => 
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredList(filteredList);
            }}>Search
          </button>
        </div>
        
        <button 
        className ="bg-slate-200 h-[33px] rounded-md px-2"
          id = "filterBtn"
          onClick = {() => {
            const filteredList = list.filter(
              (card) => card.info.avgRating > 4.3
            );
            setFilteredList(filteredList);
          }}>Top Rated Restaurants
        </button>

        <div className = "search m-4 p-4">
          <label>User : </label>
          <input value = {loggedInUser} type = "text" className = "search border border-solid m-4" onChange = {(e) => setUserName(e.target.value)}></input>
        </div>
        
      </div>
      
      <div className = "cardContainer flex flex-wrap">
        {
          filteredList.map((card) => (
            <Link key = {card.info.id} to={"/restaurant/"+card.info.id}>
              {card.info.isOpen === true ? <WithStatusCard cardInfo = {card}/> : <Card cardInfo = {card}/>}
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default Body;
