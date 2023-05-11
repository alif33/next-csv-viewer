import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { timeConverter } from '@/helpers/Formatter';
import HashLoader from 'react-spinners/HashLoader';
import VideoModal from '@/components/VideoModal';
import AnimatedTitle from '@/components/AnimatedTitle';
import { useRouter } from 'next/router';
import Axios from '@/helpers/Axios';


const override = {
    display: "block",
    margin: "0 auto",
    marginTop: "50px"
};

const Video = ({ query }) => {
    const [ loading, setLoading ] = useState(true);
    const [ empty, setEmpty ] = useState(false);
    const [videos, setVideos] = useState(null);
    const router = useRouter();
    // const params = useParams();
    // const navigate = useNavigate();

    useEffect(() => {

        Axios("get", `/videos?uid=${query.uid}`)
        .then(res=>{
            setLoading(false)
            if(res?.data.length>0){
                setVideos(res.data);
                setLoading
            }else{
                setEmpty(true);
            }
        })
        .catch(err=>{
            console.log(err);
        })

        // db.collection("users").doc(params.uid).collection("analyses").get().then((sp) => {
        //     let videoList = [];
        //     sp.forEach(dc => {
        //         videoList.push({ aid: dc.id, ...dc.data() });
        //     });
        //     setLoading(false);
        //     if (videoList.length > 0) {
        //         setVideos(videoList);
        //     }else{
        //         setEmpty(true);
        //     }
        // });

    }, [])


    return (
        <Layout>
            <div className="header">
                <div className="container">
                    <div className="gird-header">
                        <div className="header-text">
                            <AnimatedTitle/>
                            <button className="back-btn" onClick={() => router.back()}> <img src="/img/chevron-left.png" alt="" /> Back</button>
                        </div>
                    </div>
                </div>
            </div>

            {
                loading && <HashLoader 
                    color="#36D7B7" 
                    loading={loading} 
                    cssOverride={override} 
                    size={150} 
                />
            }

            {
                empty && <h1 className="text-center mt-5 display-1"> Videos Not found!</h1>
            }

            {
                !loading && !empty && <div className="container mb-5">
                    <div className="file-table">
                        <table className="mb-5">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Upload Time</th>
                                    <th>Status</th>
                                    <th>activityType</th>
                                    <th>activityDate</th>
                                    <th>activitySide</th>
                                    <th>Watch</th>
                                    <th>Download</th>
                                    <th>Show Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    videos && videos.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index}</td>

                                                <td>{ timeConverter(item.uploadTime._seconds) }</td>

                                                <td className={`capitalize ${item.status === 'done' ? 'text-success' : 'text-warning'}`}>{item.status}</td>
                                                {
                                                    item.activityType ? <td>
                                                        { item.activityType }
                                                    </td>: <td></td>
                                                }
                                                <td>{ timeConverter(item.activityTime._seconds) }</td>
                                                {
                                                    item.side ? <td>
                                                        { item.side }
                                                    </td>: <td></td>
                                                }
                                                {
                                                    item.videoUrl ? <td>
                                                        <div className="play-download-btn">
                                                                <VideoModal videoUrl={ item.videoUrl } /> 
                                                        </div>
                                                    </td>: <td></td>
                                                }
                                                {
                                                    item.videoUrl ? <td>
                                                        <div className="play-download-btn">
                                                            <a href={ item.videoUrl } target="_blank" download={ true }><img src="/img/download.png" alt="" /></a> 
                                                        </div>
                                                    </td> : <td></td>
                                                }
                                                {
                                                    item.status === 'done' && <td><Link className="download-btn" href={`/analyses/${router.query.uid}/${item.aid}`}>Go</Link></td>
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }

        </Layout>
    );
};

Video.getInitialProps = async ({ query }) => {
    return { query };
};

export default Video;