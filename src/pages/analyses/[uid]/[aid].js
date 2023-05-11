import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import ProgressBar from 'react-bootstrap/ProgressBar';
import AnimatedTitle from '@/components/AnimatedTitle';
import _ from 'lodash';
import Axios from '@/helpers/Axios';

const Analyses = ({ query }) => {

    const [ analyses, setAnalyses ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const router = useRouter()

    useEffect(() => {
        Axios("get", `/analyses?uid=${query.uid}&aid=${query.aid}`)
        .then(res=>{
            setLoading(false);
            setAnalyses(res.data);
            const sortedList = _.orderBy(res.data, ['frame'], ['asc']);
            setAnalyses(sortedList);
        })
        .catch(err=>{
            console.log(err);
        })

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

            <div className="container my-4">
                <div className="row">
                    <div className="col-md-12">
                        { analyses.length === 0 && <ProgressBar className="mt-5" animated now={100} /> }
                        { analyses.length > 0 && <>
                            <div className="d-flex w-100 mt-3 csv-download">
                                <h4>Download your CSV</h4> <button className="download-btn"> <img src="/img/download-icon.png" alt="" /><CSVLink data={analyses}>Download</CSVLink></button>
                            </div>
                        </> }
                    </div>
                </div>
            </div>

            {
                !loading && analyses.length >0 && <div className="container">
                    <div className="file-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Frame #</th>
                                    <th>X</th>
                                    <th>Y</th>
                                    <th>Z</th>
                                    <th>BeTypeString</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    analyses?.map((item, index) =>{
                                        return(
                                            <tr key={index}>
                                                <td>{ item.frame }</td>
                                                <td>{ item.x }</td>
                                                <td>{ item.y }</td>
                                                <td>{ item.z }</td>
                                                <td>{ item.beTypeString.split('.')[1] }</td>
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

Analyses.getInitialProps = async ({ query }) => {
    return { query };
};

export default Analyses;