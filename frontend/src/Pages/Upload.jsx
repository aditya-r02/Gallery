import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Loading from "./Loading";

export default function Upload(){
    const [photo, setPhoto] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const ref = useRef();
    const [loading, setLoading] = useState(false);
    const clickHandler = () =>{
        ref.current.click();
    }

    const changeHandler = (event) =>{
        if (event.target.name==="title") setTitle(event.target.value)
        if (event.target.name==="description") setDescription(event.target.value)
        if (event.target.name==="photo") setPhoto(event.target.files[0]);
        // console.log(event.target.files[0])
    }

    const submitHandler =async () =>{
        if (photo===null || title==="" || description===''){
            toast.error("Enter complete details");
            return;
        }
        setLoading(true);
        const url = "http://localhost:4000/api/v1/putPhoto"
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("title", title);
        formData.append("description", description)
        let result;
        try{
            result = await axios.post(url,formData);
            //result = result.json();
            toast.success("Photo uploaded successfully");
            setTitle(""); setDescription(""); setPhoto(null);
        }catch(error){
            //let err = result.data.message;
            console.log(error);
            toast.error("Some Error Ocurred");
        }
        setLoading(false);

        //console.log(result.data);
    }


    return (
        <div className="w-full flex items-center justify-center">
            {
                loading?
                (<Loading/>):
                (
                    <div className="w-full flex flex-col gap-3 items-center text-white my-3 px-4
        laptop:max-w-[30rem] laptop:gap-5 tablet:max-w-[25rem] tablet:gap-4">
            <NavLink to={-1} className="self-start text-3xl px-2  bg-purple text-white rounded-lg">
                <IoIosArrowRoundBack/>
            </NavLink>

            {/*Image upload div*/}
            <div className="flex flex-col gap-1 items-center border border-purple px-5 py-5 rounded-md 
            text-purple cursor-pointer"
            onClick={clickHandler}>
                <IoCloudUploadOutline className="text-2xl font-medium"/>
                <span className="text-xl">
                    Upload a photo
                </span>
            </div>

            <input type="file" ref={ref} className="hidden" name="photo"
            accept="image/png, image/jpeg" 
                onChange={changeHandler}
            />

            {
                photo!==null &&
                <div>
                    Photo uploaded!
                </div>
            }
            
            <input type="text" name="title" value={title} placeholder="Title"
                className="bg-gray w-full text-lg py-1 rounded-sm px-1 text-center outline-none"
                onChange={changeHandler}
            />
            
            <textarea name="description" value={description} placeholder="Description"
                className="bg-gray w-full text-lg py-1 rounded-sm px-1 text-center outline-none"
                onChange={changeHandler}
            />

            <button onClick={submitHandler}
            className="text-white border border-white rounded-md px-2 py-1">
                Submit
            </button>

        </div>
                )
            }
        </div>
    )
}