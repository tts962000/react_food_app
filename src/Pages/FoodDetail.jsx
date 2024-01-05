
import { useParams } from 'react-router-dom'

import FoodImg from '../assets/KFC_1.webp'
import useTheme from '../Hooks/useTheme';
import useFirestore from '../Hooks/useFirestore';
import ReviewForm from '../Components/ReviewForm';
import ReviewList from '../Components/ReviewList';
export default function FoodDetail() {
    let {id}=useParams();
    // let{data:food,error,loading}=useFetch('http://localhost:3001/foods/'+params.id)
    // let [error,setError]=useState('');
    // let [loading,setLoading]=useState(false);
    // let [food,setFood]=useState(null);
    let {isDark}=useTheme();
    let {getDocument}=useFirestore();
    let {error,loading,data:food}=getDocument(id);
    // useEffect(()=>{
    //   setLoading(true);
    //   let ref=doc(db,'foods',id);
    //   getDoc(ref).then(doc=>{
    //     // console.log(doc.exists());
    //     if(doc.exists()){
    //       let food={id:doc.id,...doc.data()}
    //       setFood(food);
    //       setLoading(false);
    //       setError('');
    //     }else{
    //       setError('No Data Found!');
    //       setLoading(false);
    //     }
    //     // console.log(doc.id);
    //     // console.log(doc.data());
        
    //   });
    // },[id])
    return (
    <div>
      {error && <p>{error}</p>}
      {loading && <p>Loading Foods</p>}
        {!!food && (
           <>
             <div className='grid grid-cols-2 mt-4 h-screen'>
                <div className=''>
                  <img className='w-[80%]' src={food.cover}></img>
                </div>
                <div className='space-y-5'>
                  <h1 className={`text-3xl text-bold ${isDark? 'text-white':''}`}>
                    {food.title}
                  </h1>
                  <div>
                  <button className='bg-yellow-400 px-2 py-1 rounded-sm'>{food.price} Kyats</button>
                </div>
                  <div className='-ml-2'>
                    {food.categories.map(c=>(
                      <span key={c} className='bg-red-500 cursor-pointer px-2 text-white py-1 rounded-full mx-2 text-md'>{c}</span>
                    ))}
                  </div>
                  <p className={`text-3xl text-bold ${isDark? 'text-white':''}`}>{food.description}</p>
                </div>
            </div>
            <div className="">
              <h3 className='text-center font-bold text-xl  text-blue'>
                {/* review box */}
                <ReviewForm/>
                {/* review list */}
                <ReviewList/>
              </h3>
            </div>
           </>
        )}
    </div>
  )
}
