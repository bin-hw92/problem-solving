/*
신고 결과 받기

문제 설명
신입사원 무지는 게시판 불량 이용자를 신고하고 처리 결과를 메일로 발송하는 시스템을 개발하려 합니다. 무지가 개발하려는 시스템은 다음과 같습니다.

각 유저는 한 번에 한 명의 유저를 신고할 수 있습니다.
신고 횟수에 제한은 없습니다. 서로 다른 유저를 계속해서 신고할 수 있습니다.
한 유저를 여러 번 신고할 수도 있지만, 동일한 유저에 대한 신고 횟수는 1회로 처리됩니다.
k번 이상 신고된 유저는 게시판 이용이 정지되며, 해당 유저를 신고한 모든 유저에게 정지 사실을 메일로 발송합니다.
유저가 신고한 모든 내용을 취합하여 마지막에 한꺼번에 게시판 이용 정지를 시키면서 정지 메일을 발송합니다.
다음은 전체 유저 목록이 ["muzi", "frodo", "apeach", "neo"]이고, k = 2(즉, 2번 이상 신고당하면 이용 정지)인 경우의 예시입니다.

유저 ID	유저가 신고한 ID	설명
"muzi"	"frodo"	"muzi"가 "frodo"를 신고했습니다.
"apeach"	"frodo"	"apeach"가 "frodo"를 신고했습니다.
"frodo"	"neo"	"frodo"가 "neo"를 신고했습니다.
"muzi"	"neo"	"muzi"가 "neo"를 신고했습니다.
"apeach"	"muzi"	"apeach"가 "muzi"를 신고했습니다.
각 유저별로 신고당한 횟수는 다음과 같습니다.

유저 ID	신고당한 횟수
"muzi"	1
"frodo"	2
"apeach"	0
"neo"	2
위 예시에서는 2번 이상 신고당한 "frodo"와 "neo"의 게시판 이용이 정지됩니다. 이때, 각 유저별로 신고한 아이디와 정지된 아이디를 정리하면 다음과 같습니다.

유저 ID	유저가 신고한 ID	정지된 ID
"muzi"	["frodo", "neo"]	["frodo", "neo"]
"frodo"	["neo"]	["neo"]
"apeach"	["muzi", "frodo"]	["frodo"]
"neo"	없음	없음
따라서 "muzi"는 처리 결과 메일을 2회, "frodo"와 "apeach"는 각각 처리 결과 메일을 1회 받게 됩니다.

이용자의 ID가 담긴 문자열 배열 id_list, 각 이용자가 신고한 이용자의 ID 정보가 담긴 문자열 배열 report, 정지 기준이 되는 신고 횟수 k가 매개변수로 주어질 때, 각 유저별로 처리 결과 메일을 받은 횟수를 배열에 담아 return 하도록 solution 함수를 완성해주세요.

제한사항
2 ≤ id_list의 길이 ≤ 1,000
1 ≤ id_list의 원소 길이 ≤ 10
id_list의 원소는 이용자의 id를 나타내는 문자열이며 알파벳 소문자로만 이루어져 있습니다.
id_list에는 같은 아이디가 중복해서 들어있지 않습니다.
1 ≤ report의 길이 ≤ 200,000
3 ≤ report의 원소 길이 ≤ 21
report의 원소는 "이용자id 신고한id"형태의 문자열입니다.
예를 들어 "muzi frodo"의 경우 "muzi"가 "frodo"를 신고했다는 의미입니다.
id는 알파벳 소문자로만 이루어져 있습니다.
이용자id와 신고한id는 공백(스페이스)하나로 구분되어 있습니다.
자기 자신을 신고하는 경우는 없습니다.
1 ≤ k ≤ 200, k는 자연수입니다.
return 하는 배열은 id_list에 담긴 id 순서대로 각 유저가 받은 결과 메일 수를 담으면 됩니다.
*/

function solution(id_list, report, k) {
    const userInfo = new Map(); //신고 목록용
    const userAnswer = new Map(); //메일 발송용
    id_list.map(id => {
        userInfo.set(id, [0,[]]);
        userAnswer.set(id, 0);
    });
    
    for(const i of report){
        let tmp = i.split(" ");
        if(userInfo.has(tmp[1])){
            if(!userInfo.get(tmp[1])[1].includes(tmp[0])){
                let num = userInfo.get(tmp[1])[0];
                let name = userInfo.get(tmp[1])[1];
                userInfo.set(tmp[1], [num+1, [...name, tmp[0]]]);
            }
        }
    }

    [...userInfo].forEach(([user, item], idx) => {
       if(item[0] >= k){
           item[1].forEach(send => {
               userAnswer.set(send, Number(userAnswer.get(send))+1);
           });
       }
    });
    return [...userAnswer].flatMap(x => x[1]);
}

//출처 : 프로그래머스 연습문제 2022 KAKAO BLIND RECRUITMENT 신고결과 받기, https://programmers.co.kr/learn/courses/30/lessons/92334?language=javascript
----------------------------------------------------------------------------------------------------------------------------------------------------
해당 문제는 각각 유저별 누가 신고했는지 목록에 저장하고, 중복 신고가 안되기 때문에 중복 신고 시 저장을 안 시켰을 때,
신고 횟수가 K 값 이상이면  신고를 한 사람들한테 메일을 발송 해당 발송 건수를 반환하는 문제입니다.

솔직히 처음에 그냥 보면 조금 어려울 수 있는 문제라서...  저도 배열을 이용하고 객체를 이용하고 삽질 좀 하다가,
그냥 Map을 이용해서 해결을 했습니다..



