import Image from "next/image";
import LoadingImage from '../../../../public/loading.gif'

export default function Loading() {
    return <div className="w-full h-screen flex justify-center items-center">
        <Image width={200} height={200} src={LoadingImage} alt="loading-gif" />
    </div> 
}