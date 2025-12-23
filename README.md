# Study: 투두 메모장

간단한 CLI 기반 투두 메모장입니다. JSON 파일로 로컬에 할 일을 저장하며 추가, 목록 조회, 완료/해제, 삭제, 전체 삭제를 지원합니다.

## 준비

Python 3.10 이상이 필요합니다. 추가 패키지는 필요하지 않습니다.

## 사용법

기본 저장소 파일은 저장소 루트의 `todos.json` 입니다. 다른 위치를 쓰고 싶다면 `--storage` 인자를 지정하세요.

```bash
# 할 일 추가
python todo.py add "우유 사기"

# 할 일 목록
python todo.py list
python todo.py list --pending   # 미완료만
python todo.py list --done      # 완료만

# 완료/해제
python todo.py done 1
python todo.py undone 1

# 항목 삭제
python todo.py remove 1

# 전체 삭제
python todo.py clear

# 저장 위치 지정
python todo.py --storage /tmp/my_todos.json add "책 읽기"
```
