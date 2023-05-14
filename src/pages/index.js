import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AnimatedTitle from '@/components/AnimatedTitle';
import HashLoader from 'react-spinners/HashLoader';
import { requireAuth } from '@/lib/guards';
import Layout from '@/components/Layout';
import Axios from '@/helpers/Axios';
import _ from 'lodash';

const override = {
    display: "block",
    margin: "0 auto",
    marginTop: "50px"
};

const Home = () => {
    const [ loading, setLoading ] = useState(true);
    const [ type, setType ] = useState();
    const [ mode, setMode ] = useState('-down');
    const [ serial, setSerial ] = useState('desc');
    const [ users, setUsers ] = useState();

    useEffect( ()=>{
      Axios("get", "/users")
        .then(res=>{
            setLoading(false);
            setUsers(res.data);
          console.log(res);
        })
        .catch(err=>{
          console.log(err);
        })
    //     db.collection("users")
    //         .get()
    //         .then((snap)=>{
    //             let lists = [];

    //             snap.forEach(doc => {
    //                 lists.push(doc.data());
    //                 console.log(doc.data());
    //             });

    //             setLoading(false);
    //             setUsers(lists);
    //     })

    }, [])

    const sortingHandler = t =>{
        setType(t);
        if (mode === '-down') {
            setMode('-up');
            setSerial('asc');
        }else{
            setMode('-down');
            setSerial('desc');
        }

       const sortedList = _.orderBy(users, type, serial);
        setUsers(sortedList);
    }

    return (
        <Layout>
            <div className="header">
                <div className="container">
                    <div className="gird-header">
                        <div className="header-text">
                            <AnimatedTitle/>
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
                !loading && <div className="container py-3">
                <div className="file-table">
                    <table>
                        <thead>
                            <tr className="sorted">
                                <th>SL</th>
                                <th>Name <i onClick={ ()=> sortingHandler('name') } className={`fa-solid fa-sort${ type==='name' ? mode: '' }`}></i></th>
                                <th>Email <i onClick={ ()=> sortingHandler('email') } className={`fa-solid fa-sort${ type==='email' ? mode: '' }`}></i></th>
                                <th>Phone <i onClick={ ()=> sortingHandler('phone') } className={`fa-solid fa-sort${ type==='phone' ? mode: '' }`}></i></th>
                                <th>Height <i onClick={ ()=> sortingHandler('height_ft') } className={`fa-solid fa-sort${ type==='height_ft' ? mode: '' }`}></i></th>
                                <th>Weight <i onClick={ ()=> sortingHandler('weight_lbs') } className={`fa-solid fa-sort${ type==='weight_lbs' ? mode: '' }`}></i></th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users && users.map((item, index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{ item.name }</td>
                                            <td>{ item.email }</td>
                                            <td>{ item.phone }</td>
                                            <td>{ item.height_ft && `${ item.height_ft }\'` } { item.height_in && `${ item.height_in }\"` }</td>
                                            <td>{ item.weight_lbs }</td>
                                            {
                                                item.uid && <td><Link className="download-btn" href={`/videos/${ item.uid }`}>Go</Link></td>
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

export default Home;

export const getServerSideProps = requireAuth(async (context) =>{
    return  {props: {}}
})