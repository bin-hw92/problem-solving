/*
징검다리

문제 설명
출발지점부터 distance만큼 떨어진 곳에 도착지점이 있습니다. 그리고 그사이에는 바위들이 놓여있습니다. 바위 중 몇 개를 제거하려고 합니다.
예를 들어, 도착지점이 25만큼 떨어져 있고, 바위가 [2, 14, 11, 21, 17] 지점에 놓여있을 때 바위 2개를 제거하면 출발지점, 도착지점, 바위 간의 거리가 아래와 같습니다.

제거한 바위의 위치	각 바위 사이의 거리	거리의 최솟값
[21, 17]	[2, 9, 3, 11]	2
[2, 21]	[11, 3, 3, 8]	3
[2, 11]	[14, 3, 4, 4]	3
[11, 21]	[2, 12, 3, 8]	2
[2, 14]	[11, 6, 4, 4]	4
위에서 구한 거리의 최솟값 중에 가장 큰 값은 4입니다.

출발지점부터 도착지점까지의 거리 distance, 바위들이 있는 위치를 담은 배열 rocks, 제거할 바위의 수 n이 매개변수로 주어질 때, 바위를 n개 제거한 뒤 각 지점 사이의 거리의 최솟값 중에 가장 큰 값을 return 하도록 solution 함수를 작성해주세요.

제한사항
도착지점까지의 거리 distance는 1 이상 1,000,000,000 이하입니다.
바위는 1개 이상 50,000개 이하가 있습니다.
n 은 1 이상 바위의 개수 이하입니다.
*/


function solution(distance, rocks, n) {
    rocks.sort((a,b) => a-b);
    let left = 1;
    let right = distance;
    let answer = 0;
    while(left < right){
        let mid = Math.floor((left + right)/2);
        let prev = 0;
        let remove = 0;
        for(const rock of rocks){
            let next = rock - prev;
            if(next < mid){
                remove++;
            }else{
                prev = rock;
            }
        }
        if(distance - prev < mid) remove++;
        
        if(remove <= n){
            left = mid + 1;
            if(answer < mid) answer = mid;
        }else{
            right = mid -1;
        }
    }
    return answer;
}

//출처 : 프로그래머스 연습문제 징검다리, https://programmers.co.kr/learn/courses/30/lessons/43236
-----------------------------------------------------------------------------------------------------
이진탐색을 이용한 문제2
징검다리 건너는 문제입니다.

이진탐색을 통해 먼저 첫번째 바위부터 mid 이상 거리가 벌어질 경우의 바위가 있으면 해당 바위로 prev(이전상태)를 변경
mid보다 작을 경우 remove에 수를 추가 합니다.
그렇게 mid 보다 거리가 적은 바위 수 만큼 넣었을 때 값이  파괴해야하는 n개 보다 많을 경우에는 right(최대값)을 줄여서 다시 반복
그렇게 거리들을 판단할때 remove값이 n 보다 작을 경우에는 left(최소값)을 늘리고,  left가 늘어날때 해당 최소값 들 중 제일 큰 수를 반환하면 됩니다.

** 솔직히 1번 문제보다 2번 문제가 이해하기 어려운 것 같습니다...
** 몇번 정도 더 탐색문제를 풀어보면 이해가 될 것 같지만... 문제 이해 후 코딩을 짜는게 제일 어려운 문제인 것 같습니다ㅎㅎㅎ
