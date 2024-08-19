import { useEffect, useState } from "react"
import axios from "axios";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import Loading from "./Loading";


export default function Home(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function fetchData(){
            setLoading(true);
            //console.log("hi");
            let result;
            try{
                result = (await axios.get("https://gallery-1iwt.vercel.app/api/v1/getPhoto")).data.result;
                
            }catch(error){
                console.log(error);
            }
            setData(result);
            setLoading(false);
            //console.log("hello");
            //console.log(result);
        }
        fetchData();
        
    },[])

    return (
        <div className="w-full flex justify-center items-center">
            {
                loading?
                (<Loading/>):
                (
                    <div className="w-full px-3 flex flex-col gap-4 laptop:grid laptop:grid-cols-3
        laptop:max-w-[90rem] tablet:grid tablet:grid-cols-2">
            <NavLink to="/addPhoto">
                <div className="h-16 full border border-purple rounded-lg flex justify-center items-center
                gap-3 bg-gray laptop:h-full laptop:flex-col tablet:h-full tablet:flex-col">
                    <span className="text-purple text-xl tablet:text-2xl laptop:text-3xl">
                        <IoCloudUploadOutline/>
                    </span>

                    <span className="text-white">
                        Click here to add photos
                    </span>
    
                </div>
            </NavLink>

            {
                data!==null &&
                data.map((photo, index)=>{
                    return (
                        <Link to={`/photo/${photo._id}`}
                        key={index} className=" relative before:w-full before:absolute before:left-0 before:h-full
                        hover:before:bg-background/80 before:bg-background/20 before:transition-all before:duration-300
                        group w-full h-60">
                            <img src={photo.url} loading="lazy"
                             className="w-full h-full object-cover" 
                            alt="gallery"
                            />
                            <p className="absolute text-opacity-0 text-white group-hover:text-opacity-100 top-3 left-3  
                             text-4xl gap-2 flex flex-col">
                                <p>
                                    {photo.title}
                                </p>
                                {/* <p className="text-base hidden laptop:block">
                                    {photo.description}
                                </p> */}
                            </p>
                            
                        </Link>
                    )
                })
            }
                    </div>
                )
            }
        </div>
    )
}