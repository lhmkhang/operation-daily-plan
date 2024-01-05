'use client'

import "@fontsource/dancing-script";
import "@fontsource/lemonada";
import { useEffect, useState, useContext, useRef, useMemo } from 'react';
import './spin.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import withAuth from "../../components/helpers/WithAuthen";
import axios from '../../components/helpers/axiosHelper';
// import { AuthContext } from "@/components/helpers/AuthenContext";
import { useSelector } from "react-redux";
// import WithPageAccessControl from '../../components/helpers/WithPageAccessControl';
import io from 'socket.io-client';
import NotAllow from '@/components/base/NotAllow';

const Main = () => {

    const { username, accessToken } = useSelector(state => state.auth.userInfo)
    const [accessStatus, setAccessStatus] = useState(false);

    useEffect(() => {
        // Khởi tạo kết nối tới socket server

        console.log(process.env.NEXT_PUBLIC_ALLOW_CORS_SOCKET);

        const socket = io(process.env.NEXT_PUBLIC_ALLOW_CORS_SOCKET);

        // Gửi sự kiện kết nối tới server
        socket.emit('joinLuckyMoney', username);

        // Lắng nghe phản hồi từ server
        socket.on('accessDenied', () => {
            setAccessStatus(true);
            // Xử lý thêm như đóng trang, chuyển hướng, v.v.
        });

        // Xử lý khi component unmount
        return () => {
            // Gửi sự kiện người dùng rời khỏi trang lucky money
            socket.emit('leaveLuckyMoney', username);
            socket.disconnect();
        };
    }, []);

    // const [username, setUsername] = useState("username");
    const [availableUsers, setAvailableUsers] = useState([]);
    const [teamList, setTeamList] = useState(["Chọn nhóm"]);
    const [selectedOption, setSelectedOption] = useState(teamList[0]);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    // const [seletedUser, setSeletedUser] = useState("");
    // const [timer, setTimer] = useState(null)
    const [displayIndex, setDisplayIndex] = useState(-1);
    const [toggleLever, setToggleLever] = useState(false);
    const [showCongrationPopup, setCongrationPopup] = useState(false);
    const [showHistoryPopup, setHistoryPopup] = useState(false);
    const [showUnpickPopup, setUnpickPopup] = useState(false);
    const [winnerUsername, setWinnerUsername] = useState("");
    const [selectPrize, setPrizeButton] = useState(0);
    const [spinStatus, setSpinStatus] = useState(false);
    // var wList = winnerList.Data;
    const [displayedHistory, setDisplayedHistory] = useState([]);

    // const { user } = useContext(AuthContext);
    const [prize, setData] = useState({});

    const displayUser = (userName) => {
        setDisplayedUsers(previousUsers => [{ name: userName, key: Math.random(), top: 0 }, ...previousUsers]);
    };

    // console.log(data);

    useEffect(() => {
        fetchTeamData();
    }, []);

    let fetchTeamData = async () => {
        try {
            'use server'
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/get-team`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const teamListRes = response.data.data;
            for (let index = 0; index < teamListRes.length; index++) {
                setTeamList(teamList => [...teamList, teamListRes[index]])
            }
        } catch (error) {
            console.log(error);
        }
    }

    let fetchData = async (selected) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/get-reward-v2`,
                {
                    teamName: selected,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    }
                }

            );
            setData(response.data.data.prize)
            setAvailableUsers(response.data.data.userList);
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        if (event.target.value !== 'Chọn nhóm') {
            fetchData(event.target.value);
        } else {
            setData([]);
            setAvailableUsers([]);
            setPrizeButton(0);
        }
    };

    const timerRef = useRef(null);

    const updateSpinStatus = (status) => {
        setSpinStatus(status);
    };

    useEffect(() => {
        if (spinStatus) {
            startRotation();
            activeLever();
        }
    }, [spinStatus])

    const startRotation = () => {
        setDisplayIndex(-1);
        setDisplayedUsers([]);
        let elapsedTime = 0;
        const rotationTime = 5000;
        let updateTime = 130;

        const animate = () => {
            elapsedTime += updateTime;

            if (availableUsers.length === 0) {
                console.log("All users have been selected.");
                setIsButtonDisabled(false);
                return;
            }

            let randomIndex = Math.floor(Math.random() * availableUsers.length);
            displayUser(availableUsers[randomIndex]);

            if (elapsedTime >= rotationTime) {
                setIsButtonDisabled(false);
                let selectedUser = availableUsers.splice(randomIndex, 1)[0];
                setWinnerUsername(selectedUser);
                setAvailableUsers([...availableUsers]);
                setDisplayIndex(0);
                // console.log("availableUsers: ", availableUsers);
                // console.log("Selected user: " + selectedUser);
                return;
            }

            updateTime = updateTime + (rotationTime - elapsedTime) / rotationTime;
            timerRef.current = setTimeout(animate, updateTime);
            // setTimer(newTimer);
        };

        timerRef.current = setTimeout(animate, updateTime);
        // setTimer(newTimer);
    };

    /* useEffect(() => {
        const interval = setInterval(() => {
            console.log("displayedUsers: ", displayedUsers);
            setDisplayedUsers((prevUsers) => [...prevUsers]);
        }, 5000);
 
 
        return () => {
            clearInterval(interval);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []); */

    const activeLever = () => {
        setToggleLever(!toggleLever);

        setTimeout(() => {
            setToggleLever(false);
        }, 5000);
    };

    const handleAnimationEnd = () => {
        setCongrationPopup(true);
    };

    const toggleClassLever = toggleLever ? 'leverSpin' : '';

    const handleHistoryOpen = () => {
        if (spinStatus !== true) {
            setHistoryPopup(true);
        }
    }

    const handleBtnPrizeClick = (button_id) => {
        setPrizeButton(button_id)
    }

    const handleBtnCongrationClick = () => {
        setCongrationPopup(false);
        handleRewardStore();
        updateSpinStatus(false);
    }

    const handleUnpickShow = () => {
        setUnpickPopup(true);
    }

    const getDataPrize = (_prize) => {
        let pList = prize;
        for (let index = 0; index < pList.length; index++) {
            if (pList[index].prize === _prize) {
                return pList[index];
            }
        }
    }

    // eslint-disable-next-line react/display-name
    const setDataButtonPrize = useMemo(() => {
        // eslint-disable-next-line react/display-name
        return (button_id) => {

            let prizeItem = button_id === 1 ? getDataPrize(`500.000 vnđ`) : button_id === 2 ? getDataPrize(`300.000 vnđ`) : button_id === 3 ? getDataPrize(`200.000 vnđ`) : getDataPrize(`100.000 vnđ`);

            if (selectPrize === button_id) {
                prizeItem.quantity > 0 ? null : setPrizeButton(0);
            }

            if (!prizeItem) return null;

            let isDisable = prizeItem.quantity > 0 ? 1 : 0;
            return (
                <button className={getButtonClass(button_id, isDisable)} onClick={isDisable === 0 ? null : () => { handleBtnPrizeClick(button_id) }}>
                    <h1>{prizeItem.prize}</h1>
                    <p>{isDisable === 0 ? " Đã hết lần quay " : "Còn lại " + `${prizeItem.quantity}` + " lần"}</p>
                </button>
            );
        }
    }, [selectPrize, prize]);

    const getButtonClass = (button_id, normal_class) => {
        if (selectPrize === button_id) {
            if (button_id === 2 || button_id === 4) {
                return 'btn-prize-selected btnCfg-margin'
            } else {
                return 'btn-prize-selected'
            }
        } else {
            if (normal_class === 1) {
                if (button_id === 2 || button_id === 4) {
                    return 'btn-prize btnCfg-margin'
                } else {
                    return 'btn-prize'
                }
            } else if (normal_class === 0) {
                if (button_id === 2 || button_id === 4) {
                    return 'btn-prize-disable btnCfg-margin'
                } else {
                    return 'btn-prize-disable'
                }
            }
        }
    }

    const loadDataTable = () => {
        if (displayedHistory.length < 1) {
            return (
                <div>
                    <h1></h1>
                </div>
            )
        } else {
            return displayedHistory.map((value, index) => {
                return (
                    <tr key={index}>
                        <td scope="row">{index < 9 ? "0" + (index + 1) : (index + 1)}</td>
                        <td>{value.username}</td>
                        <td>{value.name}</td>
                        <td>{value.manager}</td>
                        <td>{value.prize.name + " " + value.prize.prize}</td>
                    </tr>
                )
            })
        }
    }

    const handleRewardStore = async () => {
        const fetchDataReward = async () => {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/check-reward-v2`,
                {
                    user: username,
                    winnerUsername: winnerUsername,
                    selectPrize: selectPrize,
                    teamName: selectedOption
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        }
        fetchDataReward();
        fetchTeamData();
        fetchData(selectedOption);
    }

    // console.log("winnerUsername:", winnerUsername);
    // console.log("selectPrize:", selectPrize);

    const handleRewardInfo = async () => {
        const fetchRewardInfo = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reward-info`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setDisplayedHistory(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRewardInfo();
    }

    if (accessStatus) {
        return (
            <>
                <NotAllow />
            </>
        )
    }

    return (
        <main className='bgCfg'>
            <div className='flex full-control'>
                {spinStatus && (
                    <div className="popup-disable">
                    </div>
                )}
                {showCongrationPopup && (
                    <div className="popup-congra">
                        <div className="congrats-div">
                            <h2>Chúc mừng người may mắn{'\u00a0'}</h2><br />
                            <h1>{winnerUsername.split("-")[0].trim()}</h1>
                            <h1>{winnerUsername.split("-")[1].trim()}</h1><br />
                            <button onClick={() => { handleBtnCongrationClick() }} className='btn-congra'>Xác nhận</button>
                        </div>
                        <div className="congrats-firework"></div>
                    </div>
                )}
                {showHistoryPopup && (
                    <div className="popup-board">
                        <div className="popup-history" >
                            <div className='div-history'>
                                <div className="popup-history-header">
                                </div>
                                <div className='div-table-history'>
                                    <table className="table table-hover table-responsive table-history">
                                        <thead>
                                            <tr className="table-warning">
                                                <th scope="col">STT</th>
                                                <th scope="col">Username</th>
                                                <th scope="col">Họ tên</th>
                                                <th scope="col">Quản lý</th>
                                                <th scope="col">Giải thưởng</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-info">
                                            {loadDataTable()}
                                        </tbody >
                                    </table >
                                </div>
                                <div className="div-btn-history">
                                    <button onClick={() => { setHistoryPopup(false); }} className='btnClose btn-history'>Xác nhận</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showUnpickPopup && (
                    <div className="popup-board" onClick={() => { setUnpickPopup(false); }}>
                        <div className="popup-unpick">
                            <div className="div-unpick">
                                {/* <p className="btnCloseUnpick">Click để đóng</p> */}
                            </div>
                        </div>
                    </div>
                )}

                <div className='left-control'>
                    <div className='infoCfg'>
                    </div>
                    <div className="div-button-left">
                        {setDataButtonPrize(1)}
                        {setDataButtonPrize(2)}
                    </div>
                </div>
                <div className='center-control'>
                    <div id='slot-machine'>
                        <div id='slot-body'>
                            <div id='slot-block'></div>
                            <div id='slot-frame'>
                                <div style={{ animationName: `${displayIndex == 0 ? "spinresult" : ""} `, }} className='spin-div' onAnimationEnd={handleAnimationEnd}>
                                    {displayedUsers.map((user, index) => {
                                        return (
                                            <div
                                                key={user.key}
                                                className='spin-element'
                                                style={{
                                                    top: index * 8 + 'vh',
                                                    transform: `translateY(${index * 10}%)`,
                                                }}>
                                                <div className='spin-object'>{user.name}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div id='slot-glaze-bottom'></div>
                            <div id='slot-trigger' onClick={selectPrize === 0 ? () => { handleUnpickShow(); } : () => { setSpinStatus(true) }}>
                                <div className={`arm ${toggleClassLever}`}>
                                    <div className={`knob`}></div>
                                </div>
                                <div className='ring1'>
                                    <div className='shadow'></div>
                                </div>
                                <div className='ring2'>
                                    <div className='shadow'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-div-footer">
                        <div className="combo-box-div">
                            <select className={`cbx-picker ${selectedOption === 'Chọn nhóm' ? '' : 'cbx-selected'}`} value={selectedOption} onChange={handleSelectChange}>
                                {teamList.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div id='div-history'>
                            <button className='history-button' onClick={() => { handleHistoryOpen(); handleRewardInfo(); }}>XEM KẾT QUẢ</button>
                        </div>
                    </div>
                </div>
                <div className='right-control'>
                    <div className='infoCfg'>
                    </div>
                    <div className="div-button-right">
                        {setDataButtonPrize(3)}
                        {setDataButtonPrize(4)}
                    </div>
                </div>

            </div>
        </main>
    );

}

export default Main;