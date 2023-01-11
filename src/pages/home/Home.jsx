import { useEffect, useState, useCallback } from 'react';
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widgets";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import UserService from "../../services/UserService";
import {useNavigate} from "react-router-dom";
import DownloadIcon from '@mui/icons-material/Download';
import moment from 'moment/moment';
import useRedirect from '../../effects/useRedirect';
function Home(){

    document.title = "Dashboard | OneID";

    const [range, setRange] = useState(2);
    const [dateRange, setDateRange] = useState({
        start: moment().subtract(6, 'month').startOf('month').format('YYYY-MM-DD'),
        end: moment().startOf('month').format('YYYY-MM-DD')
    });

    const [trendDiseases, setTrendDiseases] = useState([]);
    const [queueHistory, setQueueHistory] = useState([]);

    // useRedirect();

    useEffect(() => {
        const fetchData = async () => {
            const {start, end} = dateRange;
            await UserService.getTrendDiseases(start, end).then((res) => {
                setTrendDiseases(res.data);
            });
        }
        fetchData();

    }, [dateRange]);

    useEffect(() => {
        const fetchData = async () => {
            const {start, end} = dateRange;
            await UserService.getQueueHistoryAnalysis(start, end).then((res) => {
                setQueueHistory(res.content);
            });
        }
        fetchData();
    }, [dateRange]);

    const getPercentage = (count) => {
        if (count === 0) {
            return 0;
        }
        const total = trendDiseases.reduce((acc, curr) => acc + curr[1], 0);
        return Math.round((count/total)*100);
    }
    
    const downloadPatientsData = async () => {
         await UserService.downloadPatients();
    }

    const downloadDatabase = async () => {
         await UserService.downloadAll();
    }

    const handleRangeChange = async (e) => {
        setRange(e.target.value);
        const {start, end} = determineRange[e.target.value];
        setDateRange({start, end});
        await UserService.getTrendDiseases(start, end).then((res) => {
            setTrendDiseases(res.data);
        });
    }

    return(
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <div className="top">
                <div className="stats-range">
                    <select onChange={handleRangeChange} defaultValue={range}>
                        <option value="1">Last Month ({
                            moment.utc(new Date(determineRange[1].start)).format("MMM DD, YYYY") + " - "+moment.utc(new Date(determineRange[1].end)).format("MMM DD, YYYY")
                        })</option>
                        <option value="2">Last 6 Months ({
                            moment.utc(new Date(determineRange[2].start)).format("MMM DD, YYYY") + " - "+moment.utc(new Date(determineRange[2].end)).format("MMM DD, YYYY")
                        })</option>
                        <option value="3">Last 1 year ({
                            moment.utc(new Date(determineRange[3].start)).format("MMM DD, YYYY") + " - "+moment.utc(new Date(determineRange[3].end)).format("MMM DD, YYYY")
                        })</option>
                        <option value="4">Last 3 years ({
                            moment.utc(new Date(determineRange[4].start)).format("MMM DD, YYYY") + " - "+moment.utc(new Date(determineRange[4].end)).format("MMM DD, YYYY")
                        })</option>
                    </select>
                </div>
                <div className="backup-buttons">
                    <button className="backup-button" onClick={downloadDatabase}>Download Database <DownloadIcon /></button>
                    <button className="backup-button" onClick={downloadPatientsData}>Download Patients Data <DownloadIcon /></button>
                </div>
                </div>
                <div className="widgets">
                    {
                        trendDiseases.length > 0 ? 
                        trendDiseases.map((disease, index) => {
                            if(index === 0) return <></>;
                            if(index < 5) return <Widget key={index} type={disease[0]} counter={disease[1]}/>;
                            return <></>;
                    }) : (
                            <>
                            </>
                        )
                    }
                </div>
                <div className="charts">
                    {
                        trendDiseases.length > 0 ? (
                            <>
                            <Featured 
                                type={trendDiseases[0][0]} 
                                counter={trendDiseases[0][1]} 
                                percentage={getPercentage} 
                                range={dateRange} />
                            </>
                        ) : <Featured type="" counter={0} percentage={getPercentage} range={dateRange}/>
                    }
                    <Chart aspect={5/4} title="Clusters among patient wait times and age" data={queueHistory}/>
                </div>
            </div>
        </div>
        
    );
}

const determineRange = {
    1: {
        start: moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
        end: moment().startOf('month').format('YYYY-MM-DD')
    },
    2: {
        start: moment().subtract(6, 'month').startOf('month').format('YYYY-MM-DD'),
        end: moment().startOf('month').format('YYYY-MM-DD')
    },
    3: {
        start: moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
        end: moment().startOf('year').format('YYYY-MM-DD')
    },
    4: {
        start: moment().subtract(3, 'year').startOf('year').format('YYYY-MM-DD'),
        end: moment().startOf('year').format('YYYY-MM-DD')
    }
}
export default Home