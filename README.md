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

# GUI 모드
python gui.py
python gui.py --storage /tmp/my_todos.json

## 그림 퀴즈 웹사이트

`picture_quiz/` 폴더에 있는 정적 페이지를 통해 그림 맞히기 퀴즈를 즐길 수 있습니다.

```bash
# 개발 서버 실행
python -m http.server 8000 --directory picture_quiz

# 브라우저에서 접속
open http://localhost:8000  # macOS
xdg-open http://localhost:8000  # Linux
```

문제는 `picture_quiz/questions.json` 파일에 정의되어 있으며, 이미지와 선택지도 함께 수정할 수 있습니다.
```
