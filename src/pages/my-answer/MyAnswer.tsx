import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "../../assets/icon/back_arrow_icon.svg";
import * as Interface from "../../interface";
import * as Component from "./components";
import * as VM from "./MyAnswerViewModel";

const MyAnswerView: React.FC = () => {
    const { aid } = useParams();
    const navigate = useNavigate();
    const [resultList, setResultList] = useState<Interface.UserAnswer[]>([]);
    const [situationAndQuestion, setSituationAndQuestion] = useState<VM.SituationAndQuestion[]>();

    useEffect(() => {
        const fetchUserResult = async () => {
            try {
                const users = await VM.getUserResult(aid!);
                setResultList(users);
            } catch (error) {
                console.error("Error fetching matched users:", error);
            }
        };

        fetchUserResult();

        const fetchSituationAndQuestion = async (categoryId: string) => {
            try {
                const data = await VM.getSituationAndQuestion(categoryId);

                setSituationAndQuestion(data);
            } catch (error) {
                console.error("Error fetching matched users:", error);
            }
        };
        fetchSituationAndQuestion("1");
    }, []);

    const clickBack = () => {
        navigate(`/match-list`);
    };

    return (
        <MyAnswerLayout>
            <MyAnswerLayoutWrap>
                <Header>
                    <IconWrap onClick={clickBack}>
                        <BackArrow />
                    </IconWrap>
                </Header>
                <InnnerMyAnswerViewLayout>
                    {resultList.map((result, index) => {
                        return <Component.AnswerItem result={result} index={index} />;
                    })}
                </InnnerMyAnswerViewLayout>
            </MyAnswerLayoutWrap>
        </MyAnswerLayout>
    );
};

export default MyAnswerView;

const MyAnswerLayout = styled.div`
    width: 100%;
    height: 100vh;
    overflow: scroll;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(#010614, #171a5f);
`;

const MyAnswerLayoutWrap = styled.div`
    width: 740px;
    height: 100%;
    padding-bottom: 100px;
`;

const Header = styled.div`
    width: 100%;
    height: 58px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: #fff;
    margin-bottom: 62px;
`;

const InnnerMyAnswerViewLayout = styled.div`
    width: 100%;
    padding: 0 20px 80px;
`;

const ScoreLayout = styled.div`
    width: 100%;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 3px solid #bbcbcb;
`;

const ScoreTitle = styled.div`
    font-size: 16px;
    margin-bottom: 6px;
    color: #fff;
`;

const Score = styled.div<{ score: number }>`
    font-family: Galmuri_Bold;
    font-size: 24px;
    color: ${(props) => (props.score <= 39 ? "#E5505D" : props.score > 39 && props.score < 80 ? "#F2AA18" : "#1eb82d")};
`;

const IconWrap = styled.div``;

const DividerContent = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 3px;
    margin-top: 40px;
`;

const Divider = styled.div`
    width: 40%;
    height: 1px;
    border: dashed 1px #fff;
`;

const ContentTitle = styled.div`
    color: #fff;
    margin: 0 10px;
`;