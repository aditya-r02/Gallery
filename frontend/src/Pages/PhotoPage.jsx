import axios from "axios";
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import Loading from "./Loading";

export default function PhotoPage() {
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    let { id } = useParams();
    //console.log(id);
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            let result;
            try {

                result = await axios({
                    method: 'post',
                    url: "https://gallery-r9jz.onrender.com/api/v1/singlePhoto",
                    headers: {},
                    data: {
                        id: id, // This is the body part
                    }
                });
            }
            catch (error) {
                console.log(error);
            }

            setPhoto(result.data.result);
            setLoading(false);
            //console.log(result.data.result);
        }
        fetchData();
    }, [])
    //console.log(id)

    return (
       <div className="w-full flex justify-center items-center">
        {
            loading?
            (<Loading/>):
            (
                <div className="laptop:max-w-[90rem] my-3 px-3">
            {photo !== null &&
                <div className="w-full px-3 text-white flex flex-col gap-4
                ">
                    <NavLink to={-1} className="bg-purple w-fit py-1 px-2 rounded-md">Back</NavLink>
                    <div className="laptop:grid laptop:grid-cols-2 laptop:gap-3 flex flex-col gap-4">
                        <img src={photo.url} loading="lazy" className="w-full h-auto" 
                            alt="gallery"
                        />
                        
                        <div className="laptop:w-full flex flex-col gap-4">
                            <h5 className="text-white text-2xl font-medium laptop:text-center
                            tablet:text-center ">
                                {photo.title}
                            </h5>

                            <p className="text-white text-lg laptop:text-justify tablet:text-justify">
                                {photo.description}
                            </p>
                        </div>
                    </div>

                </div>}
                </div>
            )
        }
       </div>
    )
}