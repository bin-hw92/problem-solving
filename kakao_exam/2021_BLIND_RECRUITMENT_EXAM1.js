/*
메뉴 리뉴얼
문제 설명
레스토랑을 운영하던 스카피는 코로나19로 인한 불경기를 극복하고자 메뉴를 새로 구성하려고 고민하고 있습니다.
기존에는 단품으로만 제공하던 메뉴를 조합해서 코스요리 형태로 재구성해서 새로운 메뉴를 제공하기로 결정했습니다. 어떤 단품메뉴들을 조합해서 코스요리 메뉴로 구성하면 좋을 지 고민하던 "스카피"는 이전에 각 손님들이 주문할 때 가장 많이 함께 주문한 단품메뉴들을 코스요리 메뉴로 구성하기로 했습니다.
단, 코스요리 메뉴는 최소 2가지 이상의 단품메뉴로 구성하려고 합니다. 또한, 최소 2명 이상의 손님으로부터 주문된 단품메뉴 조합에 대해서만 코스요리 메뉴 후보에 포함하기로 했습니다.

예를 들어, 손님 6명이 주문한 단품메뉴들의 조합이 다음과 같다면,
(각 손님은 단품메뉴를 2개 이상 주문해야 하며, 각 단품메뉴는 A ~ Z의 알파벳 대문자로 표기합니다.)

손님 번호	주문한 단품메뉴 조합
1번 손님	A, B, C, F, G
2번 손님	A, C
3번 손님	C, D, E
4번 손님	A, C, D, E
5번 손님	B, C, F, G
6번 손님	A, C, D, E, H
가장 많이 함께 주문된 단품메뉴 조합에 따라 "스카피"가 만들게 될 코스요리 메뉴 구성 후보는 다음과 같습니다.

코스 종류	메뉴 구성	설명
요리 2개 코스	A, C	1번, 2번, 4번, 6번 손님으로부터 총 4번 주문됐습니다.
요리 3개 코스	C, D, E	3번, 4번, 6번 손님으로부터 총 3번 주문됐습니다.
요리 4개 코스	B, C, F, G	1번, 5번 손님으로부터 총 2번 주문됐습니다.
요리 4개 코스	A, C, D, E	4번, 6번 손님으로부터 총 2번 주문됐습니다.
[문제]
각 손님들이 주문한 단품메뉴들이 문자열 형식으로 담긴 배열 orders, "스카피"가 추가하고 싶어하는 코스요리를 구성하는 단품메뉴들의 갯수가 담긴 배열 course가 매개변수로 주어질 때, "스카피"가 새로 추가하게 될 코스요리의 메뉴 구성을 문자열 형태로 배열에 담아 return 하도록 solution 함수를 완성해 주세요.

[제한사항]
orders 배열의 크기는 2 이상 20 이하입니다.
orders 배열의 각 원소는 크기가 2 이상 10 이하인 문자열입니다.
각 문자열은 알파벳 대문자로만 이루어져 있습니다.
각 문자열에는 같은 알파벳이 중복해서 들어있지 않습니다.
course 배열의 크기는 1 이상 10 이하입니다.
course 배열의 각 원소는 2 이상 10 이하인 자연수가 오름차순으로 정렬되어 있습니다.
course 배열에는 같은 값이 중복해서 들어있지 않습니다.
정답은 각 코스요리 메뉴의 구성을 문자열 형식으로 배열에 담아 사전 순으로 오름차순 정렬해서 return 해주세요.
배열의 각 원소에 저장된 문자열 또한 알파벳 오름차순으로 정렬되어야 합니다.
만약 가장 많이 함께 주문된 메뉴 구성이 여러 개라면, 모두 배열에 담아 return 하면 됩니다.
orders와 course 매개변수는 return 하는 배열의 길이가 1 이상이 되도록 주어집니다.

[입출력 예]
orders	course	result
["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"]	[2,3,4]	["AC", "ACDE", "BCFG", "CDE"]
["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"]	[2,3,5]	["ACD", "AD", "ADE", "CD", "XYZ"]
["XYZ", "XWY", "WXA"]	[2,3,4]	["WX", "XY"]

*/

function solution(orders, course) {
    //최소 2가지 이상의 단품, 최소 2명 이상의 손님이 주문한 메뉴
    const answer = new Map();
    const result = [];
    for(let i=0; i < course.length; i++){
        let max = 2; //무조건 2번 이상 이여야 함
        for(let j=0; j < orders.length; j++){
            if(course[i] <= orders[j].length){
                let txt = orders[j].split('');
                combination(txt, course[i]).forEach(x => {
                    if(!answer.has(x)) answer.set(x, 1);
                    else answer.set(x, answer.get(x)+1);
                    
                    if(max < answer.get(x)) max = answer.get(x);
                });
            }
        }
        [...answer].map(([name, cnt]) => {
            if(cnt === max) result.push(name);
        });
        answer.clear();
    }
    return result.sort();
}
function combination(arr, num) {
  let result = [];
  if(num == 1) return arr.map(e => [e]);
  arr.sort();
  arr.forEach((e,i,array) => {
    let rest = array.slice(i+1);
    let combinations = combination(rest,num-1);
    let combiArr = combinations.map(x => [e, ...x].join().replace(/,/g,''))
    result.push(...combiArr);
  }) 
  return result;
}

//출처 : 프로그래머스 연습문제 카카오 메뉴 리뉴얼, https://programmers.co.kr/learn/courses/30/lessons/72411?language=javascript
---------------------------------------------------------------------------------------------------------------------------
해당 문제는 단품 메뉴를 세트 메뉴로 팔기 위한 것으로, 세트 메뉴는 무조건 2개 이상의 단품 조합이며, 2번이상 구매한 이력이 있어야 합니다.

그렇기 때문에 완전탐색을 이용해 각각 단품을 조합하고, 제일 많이 구매한 메뉴를 세트로 반환하면 됩니다.

이때 주문을 한 사람이 메뉴를 A~Z까지 순서대로 진행하지 않았을 경우가 있기 때문에 한번 정렬을 해야하며,  반환할때 역시 A 순으로 정렬을 해주면 됩니다.



